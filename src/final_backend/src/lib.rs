use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse,
};
use ic_cdk_macros::update;
use candid::{CandidType, Deserialize};
use serde::Serialize;

#[derive(CandidType, Serialize, Deserialize)]
struct PredictionInput {
    action: String,
    value: f32,
}

#[update]
async fn predict_transaction(action: String, value: f32) -> String {
    let input = PredictionInput { action, value };

    let body = match serde_json::to_vec(&input) {
        Ok(b) => b,
        Err(_) => return "❌ Failed to serialize input".into(),
    };

    let request = CanisterHttpRequestArgument {
        url: "https://1f62-49-43-91-234.ngrok-free.app/predict/".to_string(),
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

    match http_request(request, cycles).await {
        Ok((resp,)) => String::from_utf8(resp.body).unwrap_or("❌ Invalid UTF-8 response".to_string()),
        Err(e) => format!("❌ API call failed: {:?}", e),
    }
}
