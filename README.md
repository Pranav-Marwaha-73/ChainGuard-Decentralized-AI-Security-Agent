# `Screenshots of ChainGuard-Decentralized-AI-Security-Agent
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


📘 Project Description:
ChainGuard is a real-time AI-powered security dashboard built to protect DApps running on the Internet Computer (ICP). It leverages a machine learning model to analyze blockchain transaction data, predict potential threats, and automatically respond to malicious activity—ensuring trust, security, and transparency.

⚙️ How It Works:
Transaction Prediction:
Users submit transaction data (action, value) through the dashboard. The app sends this data to an AI-based prediction API, which classifies the transaction as either Safe or Malicious.

Threat Detection & Countermeasures:

If the transaction is malicious:

A threat alert is triggered

A security notification sound is played

The transaction is blocked/reverted

Admins are alerted in real time

Logging and Visualization:

All transactions are logged in a decentralized backend (ICP canister)

The dashboard displays real-time analytics using pie charts, statistics cards, and a detailed activity log

User Authentication:

Uses Internet Identity (NNS DApp Wallet) for decentralized user authentication

🤖 Machine Learning Model:
The AI model is built using Random Forest Classifier

Trained on labeled blockchain transaction data

Achieved a high accuracy of 92.3%

Deployed as an external API which the ICP backend calls using secure HTTP requests

🧱 Tech Stack Used:
🔵 Frontend (Web Dashboard):
React.js + Vite (Modern, fast UI)

Tailwind CSS for styling

Recharts for visualization

Lucide Icons

Streamlit (optional) for prototyping UI

Axios for API calls

🟠 Backend (Smart Contract):
Rust on Internet Computer (ICP)

ic-cdk, candid, serde, serde_json

Features:

Transaction analysis and logging

HTTP calls to external AI service

Threat countermeasures logic

Secure persistent state via stable memory

🧠 AI/ML:
Random Forest Classifier

92.3% accuracy

Deployed as a RESTful API (via Flask or FastAPI)

Used for binary classification (Safe / Malicious)

🔐 Authentication:
Internet Identity (NNS DApp Wallet)

