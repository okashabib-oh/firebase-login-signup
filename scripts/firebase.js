import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
    apiKey: "",
    authDomain: "smit-login-signup-fff5e.firebaseapp.com",
    projectId: "smit-login-signup-fff5e",
    storageBucket: "smit-login-signup-fff5e.appspot.com",
    messagingSenderId: "27511200305",
    appId: "1:27511200305:web:6a8ef671375e14c2ce9310",
    measurementId: "G-XBET8B79EY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
