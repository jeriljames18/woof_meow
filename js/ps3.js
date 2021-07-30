console.log(localStorage.getItem("emailId"));
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
// let docId = [];

// async function retrieve(){
//    await db.collection("dbUserProfile").get().then((querySnapshot) => {
//        querySnapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
          
//       docId.push(doc.id);
          
  
//       });
      
      
//   });
// }  



ps3next.addEventListener("click", async (e)=> {
    e.preventDefault();
   
//    await retrieve();
//     console.log(docId.length);
 

    let lastDoc = localStorage.getItem("emailId");
    console.log(lastDoc);
    
    
    let petPref = document.querySelector('input[name="pet-preference"]:checked');
    let servicesOffered = [];
    console.log(petPref.id);
    let services = document.getElementsByName('select-service');
    for (let service of services) {
        if(service.checked)
        servicesOffered.push(service.id);
    }
    
    await db.collection('dbUserProfile').doc(lastDoc).update({
            upPetPreference: petPref.id,
            upServicesOffered: servicesOffered
    })

    .then(function() {
        console.log("Dcoument written");
        window.location.href = "pet-sitter4.html";
    })
    .catch(function(error){
        console.log("add failed", error);


    })

    
    
});


back.addEventListener("click", ()=>{
    window.location.href = "pet-sitter2.html";
});