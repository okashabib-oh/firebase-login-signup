const form = document.getElementById('login-form');
const successToast = document.getElementById('toast-success');
const errorToast = document.getElementById('toast-error');
const succesText = document.getElementById('succesText');
const errorText = document.getElementById('errorText');
const loginSubmit = document.getElementById('loginSubmit')
const loginLoading = document.getElementById('login-loading')
import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, async (user) => {
    if (user) {
        window.location = "./dashboard.html"
    } else {
        console.log("User logged out");
    }
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    e.target.elements[2].disabled = true
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value
    loginSubmit.classList.add('hidden');
    loginLoading.classList.remove('hidden');

    try {

        const res = await signInWithEmailAndPassword(auth, email, password)
        succesText.innerText = "Login Successfully";
        successToast.classList.remove('hidden')
        if (!errorToast.classList.contains('hidden')) {
            errorToast.classList.add('hidden');
        }

        setTimeout(() => {
            window.location = '../pages/dashboard.html'
        }, 2000)

        form.reset()

    } catch (err) {
        console.log(err);
        if (!successToast.classList.contains('hidden')) {
            successToast.classList.add('hidden');
        }
        errorText.innerText = err.toString().split("base: ")[1]
        errorToast.classList.remove('hidden');

    } finally {
        e.target.elements[2].disabled = false
        loginLoading.classList.add('hidden');
        loginSubmit.classList.remove('hidden');
    }
})