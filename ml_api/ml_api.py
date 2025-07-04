from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
import joblib
import uvicorn

from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
import pandas as pd

app = FastAPI()

# ✅ CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Rate Limiting Middleware
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)
app.add_exception_handler(RateLimitExceeded, lambda req, exc: JSONResponse(
    status_code=429, content={"message": "Too many requests"}))

# ✅ Input schema
class PredictionInput(BaseModel):
    action: str = Field(..., example="transfer")
    value: float = Field(..., ge=0, example=100)

# ✅ Load only the pipeline model
try:
    model = joblib.load("chainguard_rf_model.pkl")
except Exception as e:
    raise RuntimeError(f"Model loading failed: {e}")

@app.get("/")
def root():
    return {"message": "ChainGuard AI Model API is running."}

@app.post("/predict/")
@limiter.limit("100/minute")
async def predict(data: PredictionInput, request: Request):
    try:
        # ✅ Create a DataFrame with matching column names
        input_df = pd.DataFrame([{
            "action": data.action,
            "value": data.value
        }])

        # ✅ Pass it to the model
        prediction = model.predict(input_df)[0]

        return {"prediction": "Malicious" if prediction == 1 else "Safe"}
    except Exception as e:
        print("🔥 Prediction error:", str(e))
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
