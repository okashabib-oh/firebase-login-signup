import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    doc,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpwX8sPVQjwZJUY6QiqoSw8nTFG2ER24k",
    authDomain: "smit-login-signup-fff5e.firebaseapp.com",
    projectId: "smit-login-signup-fff5e",
    storageBucket: "smit-login-signup-fff5e.appspot.com",
    messagingSenderId: "27511200305",
    appId: "1:27511200305:web:6a8ef671375e14c2ce9310",
    measurementId: "G-XBET8B79EY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app)

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    db,
    signOut,
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    doc,
    onSnapshot,
    storage,
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
}