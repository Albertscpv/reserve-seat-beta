// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC94d_3d83kGfGIJuui6-li3BhxQr-0k1Y",
  authDomain: "reserveit-754b2.firebaseapp.com",
  projectId: "reserveit-754b2",
  storageBucket: "reserveit-754b2.appspot.com",
  messagingSenderId: "654867883625",
  appId: "1:654867883625:web:5ab05903dcf6b31f3424f8",
  measurementId: "G-JECTK7STG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };