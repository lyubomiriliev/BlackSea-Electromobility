// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLtDPnQdXfMwRAaU6WktRzGAufwZni47Y",
  authDomain: "blacksea-electromobility.firebaseapp.com",
  projectId: "blacksea-electromobility",
  storageBucket: "blacksea-electromobility.appspot.com",
  messagingSenderId: "353532575641",
  appId: "1:353532575641:web:151992d85867c4d4511d08",
  measurementId: "G-81B2MZNRZR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
