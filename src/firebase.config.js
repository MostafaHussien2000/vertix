// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFkmc8OTW3c3YQv9vPINDs8lsp4clZjPQ",
  authDomain: "vertix-movies.firebaseapp.com",
  projectId: "vertix-movies",
  storageBucket: "vertix-movies.appspot.com",
  messagingSenderId: "40276372911",
  appId: "1:40276372911:web:dc0c85799950be2f1ed35a",
  measurementId: "G-BLVZMGFRVW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
