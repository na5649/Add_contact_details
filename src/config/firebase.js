// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAx-VLTvphOfgsJY1QzKRQbS1dcROAdR5c",

  authDomain: "vite-contact-ac7fc.firebaseapp.com",

  projectId: "vite-contact-ac7fc",

  storageBucket: "vite-contact-ac7fc.appspot.com",

  messagingSenderId: "372974470014",

  appId: "1:372974470014:web:79211ea81d41c7d4bd292f",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);