import { FirebaseApp, initializeApp } from "firebase/app";
import dotenv from "dotenv";
import { getFirestore, Firestore } from "firebase/firestore";
import logger from "../../logger";
dotenv.config();
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: MEASUREMENT_ID,
};

let app: FirebaseApp;
let fireStoreDb: Firestore;

export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    fireStoreDb = getFirestore(app);
    logger.info("Firebase app initialized successfully");
  } catch (error) {
    logger.error("Error initializing Firebase:", error);
  }
};

export { fireStoreDb };
