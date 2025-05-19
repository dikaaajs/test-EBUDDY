import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = require("../user-app-4f051-firebase-adminsdk-fbsvc-2a909441b9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
