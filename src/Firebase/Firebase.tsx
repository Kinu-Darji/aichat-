import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDEsMHnc3nYJGjtwjUqb-8uG9dnfOpsNqo",
    authDomain: "aichat-3a329.firebaseapp.com",
    projectId: "aichat-3a329",
    storageBucket: "aichat-3a329.firebasestorage.app",
    messagingSenderId: "71861944652",
    appId: "1:71861944652:web:3939e75f745759c7cccfe9",
    measurementId: "G-9MLS458J0E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

  