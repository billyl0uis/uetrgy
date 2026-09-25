import requests
import json
import time

# This is a simulation of a scraper that pushes data to your Firebase REST API
# In a real scenario, you'd use the 'firebase-admin' Python SDK.

# NOTE: For Realtime Database, use the URL below. 
# For Firestore, you'd typically use the Firebase Admin SDK in Python.
FIREBASE_URL = "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com/events.json"

def inject_mock_data():
    mock_event = {
        "title": "Unexplained Toast Smell",
        "description": "Area is smelling strongly of burnt sourdough for no reason.",
        "lat": 40.7128,
        "lng": -74.0060,
        "category": "Atmospheric Weirdness",
        "severity": 2,
        "timestamp": int(time.time() * 1000) # Firebase timestamp in ms
    }
    
    print(f"Injecting: {mock_event['title']}...")
    # We use POST to add to the list in the Realtime Database
    response = requests.post(FIREBASE_URL, json=mock_event)
    
    if response.status_code == 200:
        print("Successfully injected chaos!")
    else:
        print(f"Failed: {response.status_code}")

if __name__ == "__main__":
    inject_mock_data()
