back.addEventListener("click", ()=>{
    window.location.href = "pet-registration1.html";
});

let lastDoc = localStorage.getItem("emailId");
    console.log(lastDoc);

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

let db= firebase.firestore();


pr2next.addEventListener('click', (e)=> {
    e.preventDefault();
    let childFriendly = document.querySelector('input[name="friendlych"]:checked').value;
    console.log(childFriendly);
    let dogFriendly = document.getElementById('input[name="friendlyd"]:checked').value;
    let catFriendly = document.querySelector('input[name="friendlyca"]:checked').value;
    let medicalC = document.getElementById('medicalc').value;
    let additonal = document.getElementById('misc').value;

})