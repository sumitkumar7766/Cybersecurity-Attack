import React, { useState } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, Terminal } from 'lucide-react';
import axios from 'axios';

export default function NetworkAnalyzer() {
  const [formData, setFormData] = useState({
    ip_src: '192.168.2.5',
    ip_dst: '192.168.2.1',
    prt_src: '46279',
    prt_dst: '53',
    proto: '17',
    fwd_num_pkts: '2',
    bwd_num_pkts: '2',
    fwd_mean_iat: '0.000008',
    bwd_mean_iat: '0.000016',
    fwd_std_iat: '0.0',
    bwd_std_iat: '0.0',
    fwd_min_iat: '0.000008',
    bwd_min_iat: '0.000016',
    fwd_max_iat: '0.000008',
    bwd_max_iat: '0.000016',
    fwd_mean_pkt_len: '83.0',
    bwd_mean_pkt_len: '83.0',
    fwd_std_pkt_len: '0.0',
    bwd_std_pkt_len: '0.0',
    fwd_min_pkt_len: '83.0',
    bwd_min_pkt_len: '83.0',
    fwd_max_pkt_len: '83.0',
    bwd_max_pkt_len: '83.0',
    fwd_num_bytes: '166',
    bwd_num_bytes: '166',
    fwd_num_psh_flags: '0',
    bwd_num_psh_flags: '0',
    fwd_num_rst_flags: '0',
    bwd_num_rst_flags: '0',
    fwd_num_urg_flags: '0',
    bwd_num_urg_flags: '0'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueResult, setValueResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async() => {
    setLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockResult = {
        status: valueResult === 0 ? 'safe' : 'threat',
        threat_level: valueResult === 0 ? 'No' : 'Yes',
        analysis: valueResult === 0 ? {
          packet_analysis: 'Normal traffic pattern detected',
          flag_analysis: 'No suspicious flags detected',
          timing_analysis: 'Inter-arrival times within normal range',
          classforcolor: 'text-success',
          borderColor: 'border-success'
        } : {
          packet_analysis: 'Anomalous packet patterns detected',
          flag_analysis: 'Suspicious flags observed',
          timing_analysis: 'Inter-arrival times outside normal range',
          classforcolor: 'text-danger',
          borderColor: 'border-danger'
        }
      };
      setResult(mockResult);
      setLoading(false);
    }, 2000);

    // Call the backend API
    try {
      const res = await axios.post('http://localhost:4000/api/predict', formData);
      setValueResult(res.data.predictions);
      console.log("Prediction result:", valueResult);
    } catch (error) {
      console.error("Error predicting house price:", error);
    }
  };

  const renderInput = (label, name, type = "text", step = null) => (
    <div className="mb-3">
      <label className="form-label text-success small">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        step={step}
        className="form-control bg-dark text-success border-success"
        style={{ fontSize: '0.875rem' }}
        required
      />
    </div>
  );

  return (
    <>
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      <style>{`
        body {
          background-color: #000;
          color: #00ff00;
          font-family: 'Courier New', monospace;
        }
        .hacker-border {
          border: 2px solid #00ff00;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }
        .hacker-input:focus {
          box-shadow: 0 0 0 0.25rem rgba(0, 255, 0, 0.25);
          border-color: #00ff00;
        }
        .pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="min-vh-100 bg-dark text-success p-4">
        <div className="container-fluid" style={{ maxWidth: '1400px' }}>
          {/* Header */}
          <div className="text-center mb-5 pt-4">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <Shield size={64} className="text-success pulse" />
            </div>
            <h1 className="display-4 fw-bold mb-2" style={{ letterSpacing: '0.1em' }}>
              <span className="text-danger">[</span>
              NETWORK TRAFFIC ANALYZER
              <span className="text-danger">]</span>
            </h1>
            <p className="text-warning small">
              {'>'} DEEP PACKET INSPECTION SYSTEM v2.0 {'<'}
            </p>
          </div>

          {/* Main Content */}
          <div className="row g-4">
            {/* Input Form */}
            <div className="col-lg-8">
              <div className="hacker-border bg-dark p-4">
                <h2 className="h4 fw-bold mb-4 d-flex align-items-center">
                  <Terminal size={20} className="me-2" />
                  {'>'} INPUT PARAMETERS
                </h2>
                
                {/* Network Info */}
                <div className="mb-4">
                  <h3 className="h6 text-warning mb-3">// NETWORK INFORMATION</h3>
                  <div className="row">
                    <div className="col-md-6">{renderInput("SOURCE IP", "ip_src")}</div>
                    <div className="col-md-6">{renderInput("DESTINATION IP", "ip_dst")}</div>
                    <div className="col-md-4">{renderInput("SOURCE PORT", "prt_src", "number")}</div>
                    <div className="col-md-4">{renderInput("DESTINATION PORT", "prt_dst", "number")}</div>
                    <div className="col-md-4">{renderInput("PROTOCOL", "proto", "number")}</div>
                  </div>
                </div>

                {/* Packet Statistics */}
                <div className="mb-4">
                  <h3 className="h6 text-warning mb-3">// PACKET STATISTICS</h3>
                  <div className="row">
                    <div className="col-md-3">{renderInput("FWD PKTS", "fwd_num_pkts", "number")}</div>
                    <div className="col-md-3">{renderInput("BWD PKTS", "bwd_num_pkts", "number")}</div>
                    <div className="col-md-3">{renderInput("FWD BYTES", "fwd_num_bytes", "number")}</div>
                    <div className="col-md-3">{renderInput("BWD BYTES", "bwd_num_bytes", "number")}</div>
                  </div>
                </div>

                {/* IAT Statistics */}
                <div className="mb-4">
                  <h3 className="h6 text-warning mb-3">// INTER-ARRIVAL TIME (IAT)</h3>
                  <div className="row">
                    <div className="col-md-3">{renderInput("FWD MEAN", "fwd_mean_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MEAN", "bwd_mean_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD STD", "fwd_std_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD STD", "bwd_std_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD MIN", "fwd_min_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MIN", "bwd_min_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD MAX", "fwd_max_iat", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MAX", "bwd_max_iat", "number", "0.01")}</div>
                  </div>
                </div>

                {/* Packet Length */}
                <div className="mb-4">
                  <h3 className="h6 text-warning mb-3">// PACKET LENGTH</h3>
                  <div className="row">
                    <div className="col-md-3">{renderInput("FWD MEAN", "fwd_mean_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MEAN", "bwd_mean_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD STD", "fwd_std_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD STD", "bwd_std_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD MIN", "fwd_min_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MIN", "bwd_min_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("FWD MAX", "fwd_max_pkt_len", "number", "0.01")}</div>
                    <div className="col-md-3">{renderInput("BWD MAX", "bwd_max_pkt_len", "number", "0.01")}</div>
                  </div>
                </div>

                {/* TCP Flags */}
                <div className="mb-4">
                  <h3 className="h6 text-warning mb-3">// TCP FLAGS</h3>
                  <div className="row">
                    <div className="col-md-4">{renderInput("FWD PSH", "fwd_num_psh_flags", "number")}</div>
                    <div className="col-md-4">{renderInput("BWD PSH", "bwd_num_psh_flags", "number")}</div>
                    <div className="col-md-4">{renderInput("FWD RST", "fwd_num_rst_flags", "number")}</div>
                    <div className="col-md-4">{renderInput("BWD RST", "bwd_num_rst_flags", "number")}</div>
                    <div className="col-md-4">{renderInput("FWD URG", "fwd_num_urg_flags", "number")}</div>
                    <div className="col-md-4">{renderInput("BWD URG", "bwd_num_urg_flags", "number")}</div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-success w-100 py-3 fw-bold"
                >
                  {loading ? '> ANALYZING...' : '> INITIATE DEEP SCAN'}
                </button>
              </div>
            </div>

            {/* Results Panel */}
            <div className="col-lg-4">
              <div className="hacker-border bg-dark p-4 sticky-top" style={{ top: '1rem' }}>
                <h2 className="h4 fw-bold mb-4 d-flex align-items-center">
                  <Activity size={20} className="me-2" />
                  {'>'} ANALYSIS RESULTS
                </h2>

                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner text-success mb-3" style={{ fontSize: '2rem' }}>⟳</div>
                    <p className="small mb-2">SCANNING NETWORK TRAFFIC...</p>
                    <p className="small text-warning">ANALYZING PACKET PATTERNS</p>
                  </div>
                )}

                {!loading && !result && (
                  <div className="text-center py-5 text-warning">
                    <Terminal size={48} className="mx-auto mb-3 opacity-50" />
                    <p className="small mb-2">AWAITING INPUT DATA</p>
                    <p className="small">Fill the form and initiate scan</p>
                  </div>
                )}

                {result && (
                  <div>
                    {/* Status Badge */}
                    <div className={`border p-4 text-center mb-3 ${
                      result.status === 'safe' 
                        ? 'border-success' 
                        : 'border-danger'
                    }`} style={{ 
                      backgroundColor: result.status === 'safe' ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)'
                    }}>
                      {result.status === 'safe' ? (
                        <CheckCircle size={48} className="text-success mb-2" />
                      ) : (
                        <AlertTriangle size={48} className="text-danger mb-2" />
                      )}
                      <div className={`h3 fw-bold mb-2 ${
                        result.status === 'safe' ? 'text-success' : 'text-danger'
                      }`}>
                        {result.status === 'safe' ? '[SECURE]' : '[THREAT DETECTED]'}
                      </div>
                    </div>

                    {/* Threat Level */}
                    <div className={`border p-3 mb-3 ${result.threat_level === 'Yes' ? 'border-danger' : 'border-warning'}`}>
                      <div className="small text-warning mb-1">IS ATTACK:</div>
                      <div className={`fw-bold ${
                        result.threat_level === 'Yes' ? 'text-danger' : 'text-warning'
                      }`}>
                        {result.threat_level.toUpperCase()}
                      </div>
                    </div>

                    {/* Analysis Details */}
                    <div className={`border p-3 mb-3 ${result.analysis.borderColor}`}>
                      <div className="small text-warning mb-2">DETAILED ANALYSIS:</div>
                      <div className="small">
                        <div className="mb-2">
                          <span className="text-warning">{'>'} Packets:</span>
                          <br />
                          <span className={`ms-3 ${result.analysis.classforcolor}`}>{result.analysis.packet_analysis}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-warning">{'>'} Flags:</span>
                          <br />
                          <span className={`ms-3 ${result.analysis.classforcolor}`}>{result.analysis.flag_analysis}</span>
                        </div>
                        <div>
                          <span className="text-warning">{'>'} Timing:</span>
                          <br />
                          <span className={`ms-3 ${result.analysis.classforcolor}`}>{result.analysis.timing_analysis}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connection Info */}
                    <div className="border border-success p-3 small">
                      <div className="text-warning mb-2">CONNECTION:</div>
                      <div>{formData.ip_src}:{formData.prt_src}</div>
                      <div className="text-warning">↓</div>
                      <div>{formData.ip_dst}:{formData.prt_dst}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-5 pb-4 small text-warning">
            <p className="mb-1">CLASSIFIED | NETWORK SECURITY DIVISION</p>
            <p>{'<'} UNAUTHORIZED ACCESS WILL BE PROSECUTED {'>'}</p>
          </div>
        </div>
      </div>
    </>
  );
}