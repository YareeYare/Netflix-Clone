import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCX79yPW5epmrMdHhlgSgrEwa40o7tDj7A",
  authDomain: "react-netflix-clone-1d58c.firebaseapp.com",
  projectId: "react-netflix-clone-1d58c",
  storageBucket: "react-netflix-clone-1d58c.appspot.com",
  messagingSenderId: "165882538458",
  appId: "1:165882538458:web:4cb7a7babbada336c478e3",
  measurementId: "G-HVG5GKF5HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)