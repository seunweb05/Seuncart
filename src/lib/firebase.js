import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBvMq4qNXQFcqNwjkUYOcGeOi5oC_q7FJA",
  authDomain: "seuncart1.firebaseapp.com",
  projectId: "seuncart1",
  storageBucket: "seuncart1.firebasestorage.app",
  messagingSenderId: "545017356430",
  appId: "1:545017356430:web:1644e9a9aa4c6dbfefa9df"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "default");
export const storage = getStorage(app);

export const analyticsPromise = isSupported().then(ok => ok ? getAnalytics(app) : null);

export default app;
