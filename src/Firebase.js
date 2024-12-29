// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH2IFFkptC-BXQ_9stwXZMuUqxmtNVWP8",
  authDomain: "kepp-app-28c6a.firebaseapp.com",
  projectId: "kepp-app-28c6a",
  storageBucket: "kepp-app-28c6a.firebasestorage.app",
  messagingSenderId: "633184463356",
  appId: "1:633184463356:web:1a198dc21dd9e870ef2a79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const google_keep = getFirestore(app);
export const Google_keep_auth = getAuth(app);
export const provider = new GoogleAuthProvider();