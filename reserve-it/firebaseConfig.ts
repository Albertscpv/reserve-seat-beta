// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//DATA API (IT NEEDS TO BE IN A .ENV FILE)
const firebaseConfig = {
  apiKey: "AIzaSyAE2Mwixqk3hSzYVChCmAD5rzHGSzHuxSc",
  authDomain: "sample-firebase-ai-app-9699f.firebaseapp.com",
  projectId: "sample-firebase-ai-app-9699f",
  storageBucket: "sample-firebase-ai-app-9699f.appspot.com",
  messagingSenderId: "561397823893",
  appId: "1:561397823893:web:c9409dad5cd1fcfe47de9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { auth, db };