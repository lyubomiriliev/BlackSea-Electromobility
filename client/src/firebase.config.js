import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLtDPnQdXfMwRAaU6WktRzGAufwZni47Y",
  authDomain: "blacksea-electromobility.firebaseapp.com",
  projectId: "blacksea-electromobility",
  storageBucket: "blacksea-electromobility.appspot.com",
  messagingSenderId: "353532575641",
  appId: "1:353532575641:web:151992d85867c4d4511d08",
  measurementId: "G-81B2MZNRZR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, storage, analytics };
