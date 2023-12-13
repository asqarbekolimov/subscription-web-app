import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_ipMKtkcVSBLgluried0gkfEJ7s57I8w",
  authDomain: "movie-app-f0db3.firebaseapp.com",
  projectId: "movie-app-f0db3",
  storageBucket: "movie-app-f0db3.appspot.com",
  messagingSenderId: "479128851882",
  appId: "1:479128851882:web:2e2529a2a0648f711987d3",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
