# `ChainGuard-Decentralized-AI-Security-Agent
<br>
<h1>Logging Page</h1>
<img width="1919" height="881" alt="Screenshot 2025-07-12 100134" src="https://github.com/user-attachments/assets/9f78b6db-fe3f-406e-b9ea-11cd7b2675d6" />


<img width="1917" height="913" alt="Screenshot 2025-07-12 100145" src="https://github.com/user-attachments/assets/51d395ce-1014-4350-b7ed-c2adedb927cb" />

<h1>Dashboard</h1>
<img width="1919" height="881" alt="Screenshot 2025-07-12 095757" src="https://github.com/user-attachments/assets/e8ac1852-e5a1-4794-941d-156cdf537345" />

<h1>Dark them</h1>
<img width="1919" height="881" alt="Screenshot 2025-07-12 095807" src="https://github.com/user-attachments/assets/7555f200-648b-4bc1-aaa2-18580b4ded6e" />
<img width="1919" height="913" alt="Screenshot 2025-07-12 095817" src="https://github.com/user-attachments/assets/7a8cd91b-6457-4469-98c2-7c62b5dfd37d" />

<h1>Alert to admin with notification</h1>
<img width="1919" height="914" alt="Screenshot 2025-07-12 095833" src="https://github.com/user-attachments/assets/ff0685f8-c7f6-4e9a-9d33-4c9b9d525616" />

<h1>Backend candid showing: Auto-block triggered. Transaction reverted</h1>
<img width="1919" height="955" alt="Screenshot 2025-07-12 095959" src="https://github.com/user-attachments/assets/0a9daf80-0597-4ec3-a8e8-d455f733eefc" />

<h1>About Page</h1>
<img width="1919" height="913" alt="Screenshot 2025-07-12 100024" src="https://github.com/user-attachments/assets/7af41e15-f7a0-4bf6-af44-39b4c6ec06b0" />
<img width="1919" height="908" alt="Screenshot 2025-07-12 100034" src="https://github.com/user-attachments/assets/2d3b128f-a8bc-460f-a755-39692d0646bd" />
<img width="1919" height="912" alt="Screenshot 2025-07-12 100047" src="https://github.com/user-attachments/assets/f4773771-c5c1-4709-b3ac-aed62df90e3b" />
<img width="1919" height="915" alt="Screenshot 2025-07-12 100057" src="https://github.com/user-attachments/assets/0c729b73-a621-4086-836d-9a854480f28b" />
<img width="1918" height="911" alt="Screenshot 2025-07-12 100106" src="https://github.com/user-attachments/assets/c3f2a26f-6888-4c0f-8c0d-b203d0fc5f4c" />


# 🛡️ ChainGuard: Decentralized AI Security Agent

> **ChainGuard** is a real-time **AI-powered security dashboard** built to protect decentralized applications (DApps) running on the **Internet Computer (ICP)**. It leverages a machine learning model to analyze blockchain transaction data, predict potential threats, and automatically respond to malicious activity—ensuring **trust**, **security**, and **transparency** for your DApp ecosystem.

---

## 📘 Project Overview

ChainGuard acts as a decentralized AI security layer that:
- 🚨 Detects malicious transactions in real-time
- 🔄 Automatically triggers countermeasures
- 📊 Visualizes activity logs and analytics
- 🔐 Uses decentralized identity for authentication

---

## ⚙️ How It Works

### 🔍 Transaction Prediction
- Users (or DApps) submit **transaction data** (`action`, `value`) via the dashboard.
- This data is sent to an **AI-based prediction API**, which classifies it as `Safe` or `Malicious`.

### 🧠 Threat Detection & Countermeasures
If the transaction is detected as **Malicious**:
- 🚨 An alert is triggered
- 🔊 A notification sound plays
- 🚫 The transaction is blocked or reverted
- 👮 Admins are notified in real time

### 📈 Logging & Visualization
- All transaction records are **stored in a decentralized backend** (ICP canister)
- A user-friendly dashboard shows:
  - ✅ Status of each transaction
  - 📊 Pie charts & cards
  - 📜 A complete activity log

### 🔐 User Authentication
- Uses **Internet Identity** (NNS DApp Wallet) for decentralized, secure authentication

---

## 🤖 Machine Learning Model

| 🔬 Component     | Description                            |
|------------------|----------------------------------------|
| 📦 Model         | Random Forest Classifier               |
| 🏷️ Task         | Binary Classification (Safe / Malicious) |
| 📊 Accuracy      | 92.3%                                  |
| 📁 Deployment    |  FastAPI                               |
| 🔗 Integration   | Called via HTTP from ICP backend       |

---

## 🧱 Tech Stack

### 🔵 Frontend (Web Dashboard)
- `React.js` + `Vite` – Modern and fast UI
- `Tailwind CSS` – Utility-first styling
- `Recharts` – Transaction analytics & visualizations
- `Lucide Icons` – Crisp icons
- `Axios` – API interaction
- `Streamlit` (optional) – UI prototyping for ML visualization

### 🟠 Backend (Smart Contract - Canister)
- `Rust` on Internet Computer (ICP)
- `ic-cdk`, `candid`, `serde`, `serde_json`
- Functions:
  - Transaction classification
  - Logging to stable memory
  - HTTP calls to ML API
  - Triggering countermeasures

### 🤖 AI/ML
- `Python` (Scikit-learn, Pandas)
- `Random Forest Classifier`
- 92.3% validation accuracy
- RESTful API server (via Flask or FastAPI)

### 🔐 Authentication
- **Internet Identity**
  - Decentralized authentication via NNS Wallet
  - Ensures secure and tamper-proof login

---

## 🚀 Future Enhancements
- 🔄 Real-time integration with production DApps
- 🧪 Continuous learning on new blockchain threats
- 📱 Mobile-compatible UI
- 📤 Exportable threat reports

---

## 🧑‍💻 Developed By

### Pranav Marwaha
- Lead Developer & AI Specialist  
- 📧 [pranavmarwaha73@gmail.com](mailto:pranavmarwaha73@gmail.com)

### Chinkal Patel
- Co-Developer & Blockchain Engineer

--chinkal2003patel@gmail.com

## 📄 License
MIT License. See `LICENSE` file for details.

---

> **ChainGuard** – Defending DApps with decentralized AI.

