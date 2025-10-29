import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWagS9EpfpIBUY_A6qBdOmL7VszxlC8ks",
  authDomain: "movie-app-97b43.firebaseapp.com",
  projectId: "movie-app-97b43",
  storageBucket: "movie-app-97b43.firebasestorage.app",
  messagingSenderId: "333991194181",
  appId: "1:333991194181:web:47912062e91651f4223d2c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };
