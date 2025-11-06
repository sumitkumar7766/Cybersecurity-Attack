from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import uvicorn

app = FastAPI()
model = joblib.load("all_trained_models.pkl")

class PredictionRequest(BaseModel):
    ip_src: str
    ip_dst: str
    prt_src: int
    prt_dst: int
    proto: int
    fwd_num_pkts: int
    bwd_num_pkts: int
    fwd_mean_iat: float
    bwd_mean_iat: float
    fwd_std_iat: float
    bwd_std_iat: float
    fwd_min_iat: float
    bwd_min_iat: float
    fwd_max_iat: float
    bwd_max_iat: float
    fwd_mean_pkt_len: float
    bwd_mean_pkt_len: float
    fwd_std_pkt_len: float
    bwd_std_pkt_len: float
    fwd_min_pkt_len: float
    bwd_min_pkt_len: float
    fwd_max_pkt_len: float
    bwd_max_pkt_len: float
    fwd_num_bytes: int
    bwd_num_bytes: int
    fwd_num_psh_flags: int
    bwd_num_psh_flags: int
    fwd_num_rst_flags: int
    bwd_num_rst_flags: int
    fwd_num_urg_flags: int
    bwd_num_urg_flags: int

@app.post("/predict")
def predict(request: PredictionRequest):
    import ipaddress
    import numpy as np

    def ip_to_int(ip_addr):
        try:
            return int(ipaddress.ip_address(ip_addr))
        except ValueError:
            return float('nan')

    input_data = np.array([[
        ip_to_int(request.ip_src),
        ip_to_int(request.ip_dst),
        request.prt_src,
        request.prt_dst,
        request.proto,
        request.fwd_num_pkts,
        request.bwd_num_pkts,
        request.fwd_mean_iat,
        request.bwd_mean_iat,
        request.fwd_std_iat,
        request.bwd_std_iat,
        request.fwd_min_iat,
        request.bwd_min_iat,
        request.fwd_max_iat,
        request.bwd_max_iat,
        request.fwd_mean_pkt_len,
        request.bwd_mean_pkt_len,
        request.fwd_std_pkt_len,
        request.bwd_std_pkt_len,
        request.fwd_min_pkt_len,
        request.bwd_min_pkt_len,
        request.fwd_max_pkt_len,
        request.bwd_max_pkt_len,
        request.fwd_num_bytes,
        request.bwd_num_bytes,
        request.fwd_num_psh_flags,
        request.bwd_num_psh_flags,
        request.fwd_num_rst_flags,
        request.bwd_num_rst_flags,
        request.fwd_num_urg_flags,
        request.bwd_num_urg_flags
    ]], dtype=np.float64)

    predictions = {}
    pred = model.predict(input_data)
    predictions = int(pred[0])
    print(pred[0])

    return {"predictions": predictions}

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)