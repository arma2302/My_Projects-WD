import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// npm i -g firebase-tools

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBByAhAaOJj95OsNEK3K9YUFsjtQFKY00M",
  authDomain: "fir-project-f324f.firebaseapp.com",
  projectId: "fir-project-f324f",
  storageBucket: "fir-project-f324f.appspot.com",
  messagingSenderId: "804251743842",
  appId: "1:804251743842:web:b039fe28911ed6fd99833b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const Storage = getStorage(app);
export { auth, db, Storage };
