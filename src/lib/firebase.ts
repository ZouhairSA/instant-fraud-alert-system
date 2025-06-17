
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK2UXjq_W0-oVM7fSafEfYGiSR6uCriPg",
  authDomain: "cheat-detector-801a2.firebaseapp.com",
  projectId: "cheat-detector-801a2",
  storageBucket: "cheat-detector-801a2.firebasestorage.app",
  messagingSenderId: "791500328374",
  appId: "1:791500328374:web:f4216c635882a0d1140517",
  measurementId: "G-2KEMSP324G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
