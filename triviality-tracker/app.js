import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const eventsCol = collection(db, "events");

// 2. Initialize Map (Leaflet)
const map = L.map('map-container').setView([40.7128, -74.0060], 13); // Default NYC
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = {}; // To track markers on the map

// 3. Real-time Data Listener (The "Brain")
// This function listens to Firestore. Whenever data changes, this runs automatically.
const q = query(eventsCol, orderBy("timestamp", "desc"));

onSnapshot(q, (snapshot) => {
    const feedElement = document.getElementById('event-feed');
    feedElement.innerHTML = ''; // Clear existing feed

    snapshot.forEach((doc) => {
        const event = doc.data();
        const id = doc.id;
        
        renderEventCard(event, id);
        renderMapMarker(event, id);
    });
});

// 4. Rendering Functions
function renderEventCard(event, id) {
    const feedElement = document.getElementById('event-feed');
    const card = document.createElement('div');
    card.className = 'event-card bg-slate-900 border-l-4 border-red-600 p-3 rounded shadow-lg';
    card.innerHTML = `
        <div class="flex justify-between items-start mb-1">
            <span class="text-[10px] font-bold text-red-500 uppercase">${event.category}</span>
            <span class="text-[10px] text-slate-500">${event.timestamp ? new Date(event.timestamp.toDate()).toLocaleTimeString() : 'Just now'}</span>
        </div>
        <h4 class="font-bold text-sm">${event.title}</h4>
        <p class="text-xs text-slate-400 mt-1">${event.description}</p>
    `;
    feedElement.appendChild(card);
}

function renderMapMarker(event, id) {
    if (markers[id]) return; // Don't duplicate

    const marker = L.circleMarker([event.lat, event.lng], {
        color: '#ef4444',
        radius: 8,
        fillOpacity: 0.6
    }).addTo(map);
    
    marker.bindPopup(`<b class="text-slate-900">${event.title}</b><br><span class="text-slate-700">${event.description}</span>`);
    markers[id] = marker;
}

// 5. CRUD: Create (Form Submission)
const reportForm = document.getElementById('report-form');
reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEvent = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        lat: parseFloat(document.getElementById('lat').value),
        lng: parseFloat(document.getElementById('lng').value),
        category: document.getElementById('category').value,
        severity: parseInt(document.getElementById('severity').value),
        timestamp: new Date() // Firebase will convert this to Timestamp
    };

    try {
        await addDoc(eventsCol, newEvent);
        reportForm.reset();
        document.getElementById('modal').classList.add('hidden');
    } catch (err) {
        console.error("Error adding document: ", err);
    }
});

// Modal UI Logic
document.getElementById('report-btn').onclick = () => document.getElementById('modal').classList.remove('hidden');
document.getElementById('close-modal').onclick = () => document.getElementById('modal').classList.add('hidden');
