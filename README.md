# 🚑 eZResQ
 
### Real-Time Ambulance-to-Hospital Coordination System
 
[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Google Maps](https://img.shields.io/badge/Maps-Google%20Maps-4285F4?logo=googlemaps&logoColor=white)](https://developers.google.com/maps)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#-license)
 
eZResQ is a web-based emergency coordination system designed to improve communication and coordination between **ambulances** and **hospitals** during emergency situations.
 
The system helps ambulance drivers/helpers find a suitable hospital based on the patient's emergency type, required facilities, doctor availability, bed availability, distance, and estimated time of arrival (ETA).
 
---
 
## 📖 Table of Contents
 
- [Ambulance Dashboard](#-ambulance-dashboard)
- [Hospital Dashboard](#-hospital-dashboard)
- [Inter-Hospital Patient Transfer](#-inter-hospital-patient-transfer)
- [Hospital Recommendation Logic](#️-hospital-recommendation-logic)
- [GPS & Google Maps Navigation](#-gps-and-google-maps-navigation)
- [Ambulance Availability Cycle](#-ambulance-availability-cycle)
- [Technologies](#️-technologies)
- [Project Structure](#-project-structure)
- [Basic Workflow](#-basic-workflow)
- [Firebase](#-firebase)
- [Getting Started](#-getting-started)
- [Security](#-security)
- [Future Enhancements](#-future-enhancements)
- [Disclaimer](#️-disclaimer)
- [Project Information](#-project-information)
- [License](#-license)
---
 
## 🚑 Ambulance Dashboard
 
The ambulance dashboard is designed for the ambulance driver/helper.
 
The driver/helper does **not** need to diagnose the patient. Instead, they select the emergency type based on the observed condition using simple color-coded options.
 
### Emergency Types
 
| Color | Emergency Type |
|:---:|---|
| 🔴 Red | Heart Attack |
| 🟠 Orange | Respiratory Problem |
| 🟡 Yellow | Stroke |
| 🔵 Blue | Accident / Trauma |
| 🟣 Purple | Neurological Emergency |
| 🟢 Green | Other |
 
After selecting the emergency type, eZResQ searches for suitable hospitals by considering:
 
- Required medical facilities
- Doctor and specialist availability
- ICU bed availability
- Emergency bed availability
- General bed availability
- Ventilator availability
- Distance from the ambulance
- Estimated Time of Arrival (ETA)
The recommended hospital can then be opened in **Google Maps** for navigation.
 
---
 
## 🏥 Hospital Dashboard
 
The hospital dashboard allows hospitals to maintain and update their current resources and availability.
 
Hospitals can manage:
 
- ICU beds
- Emergency beds
- General beds
- Doctors
- Medical specialists
- Trauma unit
- CT Scan
- MRI
- Surgery facilities
- Ventilators
The hospital dashboard can also display incoming ambulance requests and allow hospital staff to manage patient-related information and treatment records.
 
---
 
## 🔄 Inter-Hospital Patient Transfer
 
eZResQ also supports transferring patients from one hospital to another when advanced treatment or facilities are required.
 
### Transfer Process
 
1. A patient arrives at the source hospital.
2. The doctor identifies the need for advanced treatment.
3. The hospital enters the required facilities and patient condition.
4. eZResQ searches for suitable destination hospitals.
5. The system checks:
   - Required facilities
   - Doctor availability
   - Bed availability
   - Distance
   - ETA
6. An available ambulance is notified of the transfer request.
7. The ambulance navigates to the source hospital.
8. The patient is transported to the recommended destination hospital.
---
 
## 🗺️ Hospital Recommendation Logic
 
The system evaluates hospitals based on the patient's requirements and current hospital availability.
 
```text
Emergency Type
      ↓
Required Facilities
      ↓
Hospital Availability
      ↓
Beds + Doctors + Facilities
      ↓
Distance + ETA
      ↓
Suitable Hospital
```
 
The recommendation is intended to help the ambulance reach a suitable hospital efficiently.
 
---
 
## 📍 GPS and Google Maps Navigation
 
eZResQ uses the ambulance's location to determine the distance to available hospitals. The selected hospital can then be opened in Google Maps for navigation.
 
```text
Ambulance GPS Location
        ↓
Find Suitable Hospital
        ↓
Calculate Distance + ETA
        ↓
Hospital Recommendation
        ↓
Google Maps Navigation
```
 
---
 
## 🚑 Ambulance Availability Cycle
 
After the patient is delivered to the hospital, the ambulance status is updated so that it can be assigned to another emergency or patient transfer.
 
```text
Ambulance Assigned
      ↓
En Route
      ↓
Hospital Arrived
      ↓
Patient Delivered
      ↓
Ambulance Available
      ↓
Ready for Next Emergency
```
 
---
 
## 🛠️ Technologies
 
**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- React Router
**Backend and Database**
- Firebase
- Firebase Authentication
- Cloud Firestore
**Maps and Location**
- Google Maps
- Browser GPS / Geolocation
---
 
## 📁 Project Structure
 
```text
eZResQ/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── ambulance/
│   │   └── hospital/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── utils/
│   │
│   ├── constants/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── firebase.json
├── firestore.rules
├── package.json
├── README.md
└── index.html
```
 
---
 
## 🔄 Basic Workflow
 
```text
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
Recommend Suitable Hospital
      ↓
Google Maps Navigation
      ↓
Patient Delivered
      ↓
Ambulance Available
      ↓
Ready for Next Emergency
```
 
---
 
## 🔥 Firebase
 
Firebase is used for storing and synchronizing application data. The system can manage data related to:
 
- Ambulances
- Hospitals
- Doctors
- Facilities
- Beds
- Emergency requests
- Patients
- Transfers
- Users
Firebase configuration is stored using environment variables. Example:
 
```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
 
> ⚠️ The actual `.env` file should **not** be committed to the repository.
 
---
 
## 🚀 Getting Started
 
### 1. Clone the Repository
 
```bash
git clone <repository-url>
```
 
### 2. Navigate to the Project
 
```bash
cd eZResQ
```
 
### 3. Install Dependencies
 
```bash
npm install
```
 
### 4. Configure Environment Variables
 
Create a `.env` file in the project root and add the required Firebase configuration values. Use `.env.example` as a reference.
 
### 5. Start the Development Server
 
```bash
npm run dev
```
 
Open the local URL provided by Vite in your browser.
 
---
 
## 🔐 Security
 
- Firebase security rules are used to control access to application data.
- Sensitive configuration files such as `.env` should not be committed to the repository.
---
 
## 📌 Future Enhancements
 
- [ ] Real-time ambulance tracking
- [ ] Real-time hospital availability updates
- [ ] Push notifications
- [ ] Traffic-aware ETA
- [ ] Advanced hospital matching
- [ ] Emergency priority scoring
- [ ] Ambulance fleet management
- [ ] Improved inter-hospital transfer coordination
- [ ] Emergency history and reports
- [ ] Hospital analytics dashboard
---
 
## ⚠️ Disclaimer
 
eZResQ is a software/academic project intended to demonstrate ambulance-to-hospital coordination. The system's emergency categorization and hospital recommendations are intended as **coordination assistance** and should **not** replace decisions made by qualified medical professionals or emergency services.
 
---
 
## 👨‍💻 Project Information
 
| | |
|---|---|
| **Project Name** | eZResQ |
| **Project Type** | Real-Time Ambulance-to-Hospital Coordination System |
| **Frontend** | React.js + Vite |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Authentication |
| **Navigation** | Google Maps |
 
---
 
## 📄 License
 
This project is licensed under the MIT License — feel free to update this section to match your actual licensing terms.
 
