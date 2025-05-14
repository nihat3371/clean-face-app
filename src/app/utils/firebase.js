import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Buraya kendi Firebase config bilgilerinizi ekleyin
const firebaseConfig = {
  apiKey: "SENIN_API_KEY",
  authDomain: "SENIN_AUTH_DOMAIN",
  projectId: "SENIN_PROJECT_ID",
  storageBucket: "SENIN_STORAGE_BUCKET",
  messagingSenderId: "SENIN_MESSAGING_SENDER_ID",
  appId: "SENIN_APP_ID",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
