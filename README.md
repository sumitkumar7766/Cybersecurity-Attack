# Model Name - CYBERSECURITY_ATTACK_DETECTOR
## Overview
CYBERSECURITY_ATTACK_DETECTOR is a machine learning model designed to identify cybersecurity attacks in real-time. It leverages advanced algorithms to analyze network traffic and detect anomalies that may indicate potential threats.
## Features
- Real-time detection of cybersecurity attacks
- Detects whether the following attack is accurate or not.
- High accuracy and low false positive rate
- Scalable to handle large volumes of network traffic
- Easy integration with existing security systems

---

**Important:** This model is for educational purposes only. All rights reserved. Do not use for unethical work.

---

## Note: Direct Model Link Unavailable

Due to an internal server error, a direct link to the hosted model is not currently available. However, you can use this model in your local system by following the instructions below.

## How to Use This Model in Your Local System

### Requirements:

Ensure you have the following tools installed:

* **Python**: Latest version
* **Anaconda**: Latest version
* **Node.js**: (for backend and frontend)

### Installation Links:

Please ensure these tools are installed according to your system's requirements before proceeding.

* [Python Download](https://www.python.org/downloads)
* [Anaconda Download](https://www.anaconda.com/download)
* [Node.js Download](https://nodejs.org/en/download)

### Steps to Use the Model:

1.  **Clone the repository:**
    ```sh
    git clone "https://github.com/sumitkumar7766/Cybersecurity-Attack.git"
    ```

2.  **Install Python dependencies:**
    Open your terminal in the cloned repository's root directory and run:
    ```sh
    pip install -r requirements.txt
    ```
    * **Note:** If you encounter errors during dependency installation, ensure your Anaconda environment is activated first. To activate Anaconda, run:
        ```sh
        conda activate
        ```
        Then, retry `pip install -r requirements.txt`.

3.  **Install frontend dependencies:**
    Navigate into the `frontend` subdirectory, install its dependencies, and then return to the root directory:
    ```sh
    cd frontend
    npm install
    cd ..
    ```

4.  **Install backend dependencies:**
    Navigate into the `backend` subdirectory, install its dependencies, and then return to the root directory:
    ```sh
    cd backend
    npm install
    cd ..
    ```

5.  **Start the Python server:**
    In your first terminal, from the root directory, run:
    ```sh
    python3 model.py
    ```
    The Python server should now be running.

6.  **Start the backend server:**
    Open a *new* terminal, navigate to the `backend` directory, and run:
    ```sh
    cd backend
    npm start
    ```
    The backend server should now be running. **Ensure the first terminal with the Python server remains open.**

7.  **Start the frontend application:**
    Open a *third new* terminal, navigate to the `frontend` directory, and run:
    ```sh
    cd frontend
    npm start
    ```
    The application should now open in your web browser, typically at `http://localhost:3000`.

### Usage:
- Upload network traffic data through the web interface.
- The model will analyze the data and display detected cybersecurity attacks.
- Review the results and take appropriate action based on the findings.
### Troubleshooting:
- If you encounter issues during installation or execution, please check the error messages for guidance.
- Ensure all dependencies are correctly installed.
- Verify that the Python server is running before starting the backend server.
- For further assistance, consider reaching out to the community or checking online forums related to the tools used.

### Important Notes:

* All three terminals (Python server, backend server, frontend application) must remain open and their respective servers/applications running for the system to function correctly.
* This is a one-time setup process. After the initial setup, you can start the servers and application as needed without repeating the installation steps.

### You need to give data:
```sh
-   ip_src: str
-   ip_dst: str
-   prt_src: int
-   prt_dst: int
-   proto: int
-   fwd_num_pkts: int
-   bwd_num_pkts: int
-   fwd_mean_iat: float
-   bwd_mean_iat: float
-   fwd_std_iat: float
-   bwd_std_iat: float
-   fwd_min_iat: float
-   bwd_min_iat: float
-   fwd_max_iat: float
-   bwd_max_iat: float
-   fwd_mean_pkt_len: float
-   bwd_mean_pkt_len: float
-   fwd_std_pkt_len: float
-   bwd_std_pkt_len: float
-   fwd_min_pkt_len: float
-   bwd_min_pkt_len: float
-   fwd_max_pkt_len: float
-   bwd_max_pkt_len: float
-   fwd_num_bytes: int
-   bwd_num_bytes: int
-   fwd_num_psh_flags: int
-   bwd_num_psh_flags: int
-   fwd_num_rst_flags: int
-   bwd_num_rst_flags: int
-   fwd_num_urg_flags: int
-   bwd_num_urg_flags: int
```