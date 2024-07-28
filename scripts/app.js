import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location = 'pages/dashboard.html'
    } else {
        window.location = 'pages/login.html';
    }
})
