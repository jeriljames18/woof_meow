const firebaseConfig = {
    apiKey: "AIzaSyB5ksPgFIbI9sijrkBW3NkFagTFzCPG0t4",
    authDomain: "woof-and-meow.firebaseapp.com",
    databaseURL: "https://woof-and-meow-default-rtdb.firebaseio.com",
    projectId: "woof-and-meow",
    storageBucket: "woof-and-meow.appspot.com",
    messagingSenderId: "805095052207",
    appId: "1:805095052207:web:278fa433b49afa9dcb155a",
    measurementId: "G-7Q9273VET8"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();



function getInputVal(id) {
    return document.getElementById(id).value;
}

ps1next.addEventListener('click', submitForm);


function submitForm(e) {
    // e.preventDefault();


    let name = getInputVal('username');
    let email = getInputVal('email');
    let phone = getInputVal('phone');
    let address = getInputVal('address');
    let password = getInputVal('password');
    let cpassword = getInputVal('password2');




    if (password === cpassword) {
        saveMessage(name, email, phone, address, password);
    } else {
        e.preventDefault();
        document.querySelector('.message-area').style.display = "block";
        document.getElementById('password2').focus();
    }
}

function saveMessage(name, email, phone, address, password) {
    db.collection('dbUserProfile').doc().set({
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password
    })



    .then((docRef) => {
            localStorage.setItem('userEmailId', email);
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });



}




// back.addEventListener("click", ()=>{
//     window.location.href = 
// })