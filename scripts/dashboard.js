import { auth, onAuthStateChanged, signOut } from './firebase.js';
const btn = document.getElementById('logout');
const dropdownLogout = document.getElementById('dropdown-logout');
const dropdownEmail = document.getElementById('dropdown-email')
const logoutLoading = document.getElementById('logout-loading')
const email = document.getElementById('email');
const lastLogin = document.getElementById('lastLogin');
const creationTime = document.getElementById('creationTime');

const userCheck = async (user) => {
    try {
        if (user) {
            const userInfo = await user;
            const userEmail = user.email
            const lastLoginAt = user.metadata.lastSignInTime
            const accountCreate = user.metadata.creationTime
            dropdownEmail.innerText = userEmail;
            email.innerText = userEmail
            lastLogin.innerText = lastLoginAt
            creationTime.innerText = accountCreate
        } else {
            console.log("User sign out");
            window.location = '../pages/login.html'
        }
    } catch (error) {
        console.log(error);
    }
}
onAuthStateChanged(auth, userCheck)

const handleLogout = async () => {
    console.log(this);
    try {
        await signOut(auth)
        console.log("User Signed out");
    } catch (error) {
        console.log(error);
    }
}

btn.addEventListener('click', () => {
    btn.classList.add('hidden')
    logoutLoading.classList.remove('hidden')
    handleLogout()
})
dropdownLogout.addEventListener('click', () => {
    dropdownLogout.setAttribute('aria-disabled', true)
    handleLogout()
})