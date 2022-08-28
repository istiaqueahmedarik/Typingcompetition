// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: "typingmaster-b19f6.firebaseapp.com",
    projectId: "typingmaster-b19f6",
    storageBucket: "typingmaster-b19f6.appspot.com",
    messagingSenderId: "403579163488",
    appId: "1:403579163488:web:af12d542879cb230bac405"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;