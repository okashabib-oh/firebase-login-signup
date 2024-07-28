const form = document.getElementById('signup-form');
const successToast = document.getElementById('toast-success')
const successText = document.getElementById('succesText')
const errorToast = document.getElementById('toast-error');
const errorText = document.getElementById('errorText');
const submitSignup = document.getElementById('submitSignup')
const signupLoading = document.getElementById('signup-loading')
import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitSignup.classList.add('hidden')
    signupLoading.classList.remove('hidden')

    try {
        e.target.elements[2].disabled = true
        const email = e.target.elements[0].value
        const password = e.target.elements[1].value

        const res = await createUserWithEmailAndPassword(auth, email, password)
        successText.innerText = "Sign Up Successfully";
        successToast.classList.remove('hidden')
        if (!errorToast.classList.contains('hidden')) {
            errorToast.classList.add('hidden');
        }

        setTimeout(() => {
            window.location = '../pages/login.html'
        }, 2000)
        form.reset()
    } catch (err) {
        console.log(err);
        if (!successToast.classList.contains('hidden')) {
            successToast.classList.add('hidden');
        }
        errorText.innerText = err.toString().split("base: ")[1]
        errorToast.classList.remove('hidden')
    } finally {
        e.target.elements[2].disabled = false
        submitSignup.classList.remove('hidden')
        signupLoading.classList.add('hidden')
    }
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
        window.location = "./dashboard.html";
    }
})
