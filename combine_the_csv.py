import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import os
import ipaddress
import joblib

# The Function who type cast the IP address to float64
def ip_to_int(ip_addr):
    """
    Converts an IP address string (IPv4 or IPv6) to its standard integer representation.
    Returns NaN for invalid IP strings.
    """
    try:
        return int(ipaddress.ip_address(ip_addr))
    except ValueError:
        return float('nan')

all_trained_models = {}

datas = os.listdir('./datas')

for data in datas:
    if data.endswith('.csv'):
        df = pd.read_csv(os.path.join('./datas', data))

        # Prepare a list to store all dataframes
        all_dfs = []

        # First iteration to read all CSVs
        for data in datas:
            if data.endswith('.csv'):
                current_df = pd.read_csv(os.path.join('./datas', data))
                all_dfs.append(current_df)

        # Concatenate all dataframes
        df = pd.concat(all_dfs, ignore_index=True)

        # Save the combined dataframe to a new CSV
        df.to_csv('combined_data.csv', index=False)