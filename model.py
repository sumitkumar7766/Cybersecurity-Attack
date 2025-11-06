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

df = pd.read_csv("combined_data.csv")

# Now Trypecast the IP addresses to float64
df['ip_src'] = df['ip_src'].apply(ip_to_int).astype('float64')
df['ip_dst'] = df['ip_dst'].apply(ip_to_int).astype('float64')

# Now train test split
X = df.drop('is_attack', axis=1)
y = df['is_attack']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save the trained model
all_trained_models = model

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")

# Dump all trained models
joblib.dump(all_trained_models, 'all_trained_models.pkl')