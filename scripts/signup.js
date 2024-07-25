const form = document.getElementById('signup-form');
const successToast = document.getElementById('toast-success')
const successText = document.getElementById('succesText')
const errorToast = document.getElementById('toast-error');
const errorText = document.getElementById('errorText');
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try{
        e.target.elements[2].disabled = true
        const email = e.target.elements[0].value
        const password = e.target.elements[1].value
    
        const res = await createUserWithEmailAndPassword(auth, email, password)
        successText.innerText = "Sign Up Successfully";
        successToast.classList.remove('hidden')
        if(!errorToast.classList.contains('hidden')){
            errorToast.classList.add('hidden');
        }
        form.reset()
    }catch(err){
        console.log(err);
        if(!successToast.classList.contains('hidden')){
            successToast.classList.add('hidden');
        }
        errorText.innerText = err
        errorToast.classList.remove('hidden')
    }finally{
        e.target.elements[2].disabled = false
    }
})