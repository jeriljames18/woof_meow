//Connecting with firebase

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


//declaring html elements

const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#profile-picture');
const file = document.querySelector('#pet-sitter-img');
const uploadBtn = document.querySelector('#upload-btn');

//if user hover on img div 

imgDiv.addEventListener('mouseenter', function() {
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function() {
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a photo to upload

file.addEventListener('change', function() {
    //this refers to file
    const choosenFile = this.files[0];

    if (choosenFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function() {
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosenFile);
        saveImage(choosenFile)

    }
});

function saveImage(strFileLocation) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }


    var storageRef = firebase.storage().ref();

    let filename = strFileLocation.name;
    var photoRef = storageRef.child(filename);

    let emailId = localStorage.getItem('userEmailId');
    var photoImagesRef = storageRef.child(emailId);

    // While the file names are the same, the references point to different files
    photoRef.name === photoImagesRef.name; // true
    photoRef.fullPath === photoImagesRef.fullPath; // false 

    photoImagesRef.put(photoRef.name);
}

document.querySelector('.skip').addEventListener('click', () => {
    window.location.href = "pet-sitter3.html";
})


back.addEventListener("click", () => {
    window.location.href = "pet-sitter1.html";
});