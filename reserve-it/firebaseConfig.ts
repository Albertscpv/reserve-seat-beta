// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export { db };