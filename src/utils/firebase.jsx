// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2OccYtqPiGyBWuaeLwoIuoMaT7U_CyEU",
    authDomain: "clone-youtub-787fe.firebaseapp.com",
    projectId: "clone-youtub-787fe",
    storageBucket: "clone-youtub-787fe.firebasestorage.app",
    messagingSenderId: "544137591766",
    appId: "1:544137591766:web:68538dab2cf12a3987c277",
    measurementId: "G-9N0BX4CP89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);