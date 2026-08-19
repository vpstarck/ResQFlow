# eZResQ
Real Time Ambulance-to-Hospital Coordination System
# 🚑 eZResQ

## Ambulance-to-Hospital Coordination System

eZResQ is a web-based emergency coordination system designed to improve communication between ambulances and hospitals during emergencies.

The system has two main dashboards:

### 🚑 Ambulance Dashboard

The ambulance driver/helper selects the emergency type using simple color-coded options:

- 🔴 Red – Heart Attack
- 🟠 Orange – Respiratory Problem
- 🟡 Yellow – Stroke
- 🔵 Blue – Accident / Trauma
- 🟣 Purple – Neurological Emergency
- 🟢 Green – Other

Based on the selected emergency, eZResQ searches for suitable hospitals by considering:

- Required medical facilities
- Doctor availability
- ICU and emergency bed availability
- Ventilator availability
- Distance
- Estimated Time of Arrival (ETA)

The recommended hospital can then be opened in Google Maps for navigation.

### 🏥 Hospital Dashboard

Hospitals can update their available resources, including:

- ICU beds
- Emergency beds
- General beds
- Doctors and specialists
- Trauma unit
- CT Scan
- MRI
- Surgery
- Ventilators

Hospitals can also receive incoming ambulance requests and manage patient treatment records.

### 🔄 Inter-Hospital Transfer

If a patient requires advanced treatment, the hospital can create a transfer request. eZResQ searches for a suitable destination hospital and available ambulance.

The ambulance can then navigate to the source hospital and transfer the patient to the recommended destination.

## 🛠️ Technologies

- React.js
- JavaScript
- HTML5
- CSS3
- Firebase Authentication
- Firebase Firestore
- Google Maps
- Vite

## 📁 Project Structure

```text
eZResQ/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── ambulance/
│   │   └── hospital/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── firebase.json
├── firestore.rules
├── package.json
├── README.md
└── index.html

                         Basic Workflow


 Ambulance Login
      ↓
Select Emergency
      ↓
Find Suitable Hospitals
      ↓
Check Beds + Doctors + Facilities
      ↓
Calculate Distance + ETA
      ↓
Recommend Hospital
      ↓
Google Maps Navigation
      ↓
Patient Delivered
      ↓
Ambulance Available
