import {
    db, collection, addDoc, serverTimestamp, onSnapshot,
    ref,
    storage,
    uploadBytes,
    getDownloadURL,
    auth,
    signOut,
    onAuthStateChanged
} from './firebase.js';

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location = '../pages/login.html'
    }
    dropdownEmail.innerText = await user.email
})

const modalElement = document.getElementById('crud-modal')
const dropdownEmail = document.getElementById("dropdown-email")
const modal = new Modal(modalElement)
const form = document.getElementById('newProductForm')
const productName = document.getElementById('name')
const producPrice = document.getElementById('price')
const productDescription = document.getElementById('description')
const image = document.getElementById('productImage')
const btn = document.getElementById('submitForm')
const products = document.getElementById('products')
const dropdownSignout = document.getElementById('dropdown-logout');
const productsLoading = document.getElementById('productsLoading')
const adding = document.getElementById('adding')

const collections = collection(db, 'products');

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    btn.classList.add('hidden')
    adding.classList.remove('hidden')
    btn.disabled = true

    const imageFile = image.files[0];
    const storageRef = ref(storage, imageFile.name)
    const uploadImage = await uploadBytes(storageRef, imageFile)
    const imageUrl = await getDownloadURL(storageRef)

    const createProduct = {
        productName: productName.value,
        productPrice: Number(producPrice.value),
        productDescription: productDescription.value,
        productImage: imageUrl,
        createdAt: serverTimestamp()
    };

    try {
        const doc = await addDoc(collections, createProduct)
        modal.hide();
        const backdrop = document.querySelector('.bg-gray-900\\/50, .dark\\:bg-gray-900\\/80');
        if (backdrop) {
            backdrop.remove();
        }
        form.reset()
        Toastify({
            text: "Product Added Successfully",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #171923, #143970)",
                borderRadius: "20px",
            },
        }).showToast();

    } catch (error) {
        console.log(error.message);
        Toastify({
            text: error.message,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(90deg, red, #93191C)",
                borderRadius: "20px",
            },
        }).showToast();
    } finally {
        btn.disabled = false
        btn.classList.remove('hidden')
        adding.classList.add('hidden')
    }
})

onSnapshot(collections, (doc) => {
    productsLoading.style.display = "none";
    products.innerHTML = ''
    doc.forEach((eachdocs) => {
        const dbData = eachdocs.data();

        products.innerHTML += `
        <div
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg scale-150 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="w-full h-48 md:h-64 lg:h-80 object-cover rounded-t-lg" src=${dbData.productImage ? dbData.productImage : './assets/noImage.jpg'}
                alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${dbData.productName}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${dbData.productDescription ? dbData.productDescription.slice(0, 99) + '...' : 'NO Description'}</p>
                <p class="mb-3 font-semibold text-gray-700 dark:text-gray-400">$${dbData.productPrice}</p>
                <p class="mb-3 font-semibold text-gray-400 dark:text-gray-400">${dbData.createdAt ? dateFns.formatDistance(dbData.createdAt?.toDate(), new Date(), { addSuffix: true, includeSeconds: true }) : ""}</p>
            </div>
            <div class="flex items-center justify-end mb-2">
                <button type="button" id=${eachdocs.id} class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                <button type="button" id=${eachdocs.id} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
            </div>
        </div>
    `
    })
})

const handleLogout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error);
    }
}

dropdownSignout.addEventListener('click', () => {
    dropdownSignout.setAttribute('aria-disabled', true)
    handleLogout()
})