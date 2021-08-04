

let docId = localStorage.getItem("emailId");
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

ps4next.addEventListener('click', async (e)=> {
    e.preventDefault();
    let moreServices = [];
    let moreS = document.getElementsByName('pet-sitter-service');
    
    for (let more of moreS) {
        if (more.checked)
        moreServices.push(more.id);
    }

    await db.collection('dbUserProfile').doc(docId).update({
        upMoreServices: moreServices
    })

    .then(function() {
        console.log("Document updated");
        window.location.href = "login.html";
    })
    .catch(function(error){
        console.log("Document writing failed", error);
    })
    

})






back.addEventListener("click", ()=>{
    window.location.href = "pet-sitter3.html";
});