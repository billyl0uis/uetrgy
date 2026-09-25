# Triviality Tracker

A satirical "low-stakes" emergency alert application designed to track trivial and humorous events in real-time.

## 🚀 Tech Stack
- **Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript
- **Maps:** Leaflet.js
- **Backend/Database:** Firebase (Firestore)
- **Deployment:** Vercel / GitHub Pages

## 🛠️ Getting Started

1. **Setup Firebase:**
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore Database**.
   - Create a collection named `events`.
   - Go to Project Settings to get your **Web App Configuration**.
   - Paste your config into `triviality-tracker/firebase-config.js`.

2. **Run Locally:**
   - Open `index.html` in your browser (Note: You might need a local server like Live Server in VS Code to handle JavaScript modules).

3. **Simulate Data:**
   - Run the mock scraper: `python scraper/mock_scraper.py` (requires `requests` library).

## 📁 Project Structure
- `index.html`: The main application interface.
- `style.css`: Custom high-alert styling.
- `app.js`: Core application logic and Firebase integration.
- `firebase-config.js`: Your Firebase credentials.
- `scraper/`: Python scripts for data simulation.
