// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2PBDhTSQTdSsp_IzdrDo0Ph0-vf5m4I0",
  authDomain: "user-app-4f051.firebaseapp.com",
  projectId: "user-app-4f051",
  storageBucket: "user-app-4f051.firebasestorage.app",
  messagingSenderId: "579183461224",
  appId: "1:579183461224:web:eec0c5fc26c837e2a54cdd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
