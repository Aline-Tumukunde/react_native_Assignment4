
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // method to connect authentication
const firebaseConfig = {
    apiKey: "AIzaSyAFaw-2NAs2QKEuVQa1qvQEb1v2aOXIWLk",
    authDomain: "authentication-414722.firebaseapp.com",
    projectId: "authentication-414722",
    storageBucket: "authentication-414722.appspot.com",
    messagingSenderId: "608291868022",
    appId: "1:608291868022:web:dc79d222379e52d9227e57",
    measurementId: "G-8893M8RJ66"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);// to initializen