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


pr1next.addEventListener('click', (e)=> {
    e.preventDefault();
    let petType = document.querySelector('input[name="pet-type"]:checked').value;
    console.log(petType);
    let petName = document.getElementById('petname').value;
    let petWeight = document.querySelector('input[name="pet-weight"]:checked').value;
    let petSex = document.querySelector('input[name="pet-sex"]:checked').value;
    let petFeeding = document.querySelector('input[name="feeding-schedule"]:checked').value;
    
    db.collection('PetInformation').doc(lastDoc).set({
        petType: petType,
        petName: petName,
        petWeight: petWeight,
        petSex: petSex,
        petFeeding: petFeeding

    })

    .then(function(){
        console.log('Document written');
        window.location.href="pet-registration2.html";
    })
    .catch(function(error){
        console.log('An error occured', error);
    })
        

  



});



