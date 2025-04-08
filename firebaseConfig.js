// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 1. import the firestore service
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { signOut } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTVObnm3XV20XsefwrH0400IGhUALknQ4",
  authDomain: "project-13b2e.firebaseapp.com",
  projectId: "project-13b2e",
  storageBucket: "project-13b2e.firebasestorage.app",
  messagingSenderId: "22149193799",
  appId: "1:22149193799:web:af7eba53fdf72f38b85162"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. initialize Firestore service
const db = getFirestore(app)
const auth = getAuth()  

// 3. export the Firestore service from this js file so other parts of your app can use it
export { db, auth }
