import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_-BXEQHmqJAOBykXMaamJ7CKwJ7bkdpo",
  authDomain: "faceapp-46925.firebaseapp.com",
  projectId: "faceapp-46925",
  storageBucket: "faceapp-46925.firebasestorage.app",
  messagingSenderId: "496450686527",
  appId: "1:496450686527:web:a1838d14bcce3a5e86b28a",
  measurementId: "G-ETC98SM7L9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
