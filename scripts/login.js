const form = document.getElementById('login-form');
const successToast = document.getElementById('toast-success');
const errorToast = document.getElementById('toast-error');
const succesText = document.getElementById('succesText');
const errorText = document.getElementById('errorText');
import { auth, signInWithEmailAndPassword } from "./firebase.js";


form.addEventListener("submit", async (e) => {
    e.preventDefault()

    e.target.elements[2].disabled = true
    const email = e.target.elements[0].value
    const password = e.target.elements[1].value

    try {

        const res = await signInWithEmailAndPassword(auth, email, password)
        succesText.innerText = "Login Successfully";
        successToast.classList.remove('hidden')
        if(!errorToast.classList.contains('hidden')){
            errorToast.classList.add('hidden');
        }
        form.reset()

    } catch (err) {
        console.log(err);
        if(!successToast.classList.contains('hidden')){
            successToast.classList.add('hidden');
        }
        errorText.innerText = err
        errorToast.classList.remove('hidden');

    } finally {
        e.target.elements[2].disabled = false
    }
})