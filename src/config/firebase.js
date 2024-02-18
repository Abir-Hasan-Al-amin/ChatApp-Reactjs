import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD1FJZn0MRi5D6Uyy3yiOskoaJpdokE4IY",
  authDomain: "chat-app-react-6cf02.firebaseapp.com",
  projectId: "chat-app-react-6cf02",
  storageBucket: "chat-app-react-6cf02.appspot.com",
  messagingSenderId: "455291268055",
  appId: "1:455291268055:web:dd58d1b0ae9d27940ef992",
  measurementId: "G-GTJJ2BGRLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db=getFirestore(app);