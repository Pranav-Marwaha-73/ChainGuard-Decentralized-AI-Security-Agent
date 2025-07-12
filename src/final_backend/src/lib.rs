use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};
use ic_cdk::{caller};
use ic_cdk_macros::{update, query};
use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use std::cell::RefCell;
use serde_json::Value;

fn get_timestamp() -> u64 {
    ic_cdk::api::time() / 1_000_000_000
}

#[derive(CandidType, Serialize, Clone, Debug)]
struct PredictionInput {
    action: String,
    value: f32,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct LogEntry {
    id: u64,
    action: String,
    value: f32,
    result: String,
    countermeasure: Option<String>,
    user: Principal,
    timestamp: u64,
}

thread_local! {
    static LOGS: RefCell<Vec<LogEntry>> = RefCell::new(Vec::new());
    static NEXT_ID: RefCell<u64> = RefCell::new(1);
}

#[update]
async fn predict_transaction(action: String, value: f32) -> String {
    let caller_principal = caller();

    let input = PredictionInput { action: action.clone(), value };

    let body = match serde_json::to_vec(&input) {
        Ok(b) => b,
        Err(_) => return "❌ Failed to serialize input".into(),
    };

    let request = CanisterHttpRequestArgument {
        url: "https://beade951d8b2.ngrok-free.app/predict/".to_string(),
        method: HttpMethod::POST,
        headers: vec![HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        }],
        body: Some(body),
        max_response_bytes: Some(2000),
        transform: None,
    };

    let cycles = 3_000_000_000;

    let raw_response = match http_request(request, cycles).await {
        Ok((resp,)) => String::from_utf8(resp.body).unwrap_or("❌ Invalid UTF-8".to_string()),
        Err(e) => format!("❌ API call failed: {:?}", e),
    };

    // Extract "prediction" field from response JSON
    let prediction = match serde_json::from_str::<Value>(&raw_response) {
        Ok(json) => json.get("prediction").and_then(|p| p.as_str()).unwrap_or("Unknown").to_string(),
        Err(_) => "Unknown".to_string(),
    };

    let mut countermeasure_msg: Option<String> = None;

    if prediction == "Malicious" {
        admin_alert(&caller_principal, &action, value);
        revert_or_block_transaction(&caller_principal, &action, value);
        countermeasure_msg = Some("🚨 Admin Alert triggered. 🚫 Transaction Reverted.".to_string());
    }

    let timestamp = get_timestamp();

    LOGS.with(|logs| {
        NEXT_ID.with(|id_cell| {
            let mut id_ref = id_cell.borrow_mut();
            let new_log = LogEntry {
                id: *id_ref,
                timestamp,
                user: caller_principal,
                action: action.clone(),
                value,
                result: prediction.clone(),
                countermeasure: countermeasure_msg.clone(),
            };
            *id_ref += 1;
            logs.borrow_mut().push(new_log);
        });
    });

    match countermeasure_msg {
        Some(msg) => format!("🛑 Prediction: {prediction}\n{msg}"),
        None => format!("✅ Prediction: {prediction}"),
    }
}

fn admin_alert(user: &Principal, action: &str, value: f32) {
    ic_cdk::println!(
        "⚠️ ADMIN ALERT: Suspicious action detected from user {:?}. Action: '{}', Value: {}",
        user, action, value
    );
}

fn revert_or_block_transaction(user: &Principal, action: &str, value: f32) {
    ic_cdk::println!(
        "🚫 Transaction BLOCKED for user {:?}. Action '{}' with value {} reverted or prevented.",
        user, action, value
    );
}

#[query]
fn get_logs() -> Vec<LogEntry> {
    LOGS.with(|logs| logs.borrow().clone())
}

#[update]
async fn add_log(action: String, value: f32, result: String, user: Principal) -> bool {
    let timestamp = get_timestamp();

    LOGS.with(|logs| {
        NEXT_ID.with(|id_cell| {
            let mut id_ref = id_cell.borrow_mut();
            let new_log = LogEntry {
                id: *id_ref,
                timestamp,
                user,
                action,
                value,
                result,
                countermeasure: None,
            };
            *id_ref += 1;
            logs.borrow_mut().push(new_log);
        });
    });

    true
}

#[update]
async fn trigger_countermeasure(log_id: u64) -> String {
    let mut msg = String::new();

    LOGS.with(|logs| {
        let mut logs_ref = logs.borrow_mut();
        if let Some(log) = logs_ref.iter_mut().find(|log| log.id == log_id) {
            log.countermeasure = Some("🛡️ Auto-block triggered. Transaction reverted.".to_string());
            msg = format!("🛡️ Countermeasure applied for log ID {log_id}");
        } else {
            msg = format!("⚠️ Log ID {log_id} not found.");
        }
    });

    msg
}
