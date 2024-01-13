import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBGBGD_YP8C7rSrra8iq-8JwKYZKf6w0Zo",
  authDomain: "auth-starter-75fa6.firebaseapp.com",
  projectId: "auth-starter-75fa6",
  storageBucket: "auth-starter-75fa6.appspot.com",
  messagingSenderId: "671984501247",
  appId: "1:671984501247:web:41688e020594d12e9027ca",
  measurementId: "G-B5MLMRGH1D",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
