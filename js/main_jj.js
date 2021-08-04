//user sign up


function addUserAccount() {

    let username = document.getElementById('userName').value;
    let accountEmail = document.getElementById('userEmail').value;
    let accountMobileNo = document.getElementById('userPhone').value;
    let accoundAddress = document.getElementById('userAddress').value;
    let password = document.getElementById('userPassword').value;
    let cPassword = document.getElementById('userPasswordConfirm').value;

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);

    } else {
        firebase.app(); // if already initialized, use that one
    }


    if (password === cPassword) {


        firebase.auth().createUserWithEmailAndPassword(accountEmail, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log(username)
                let CloudDB = firebase.firestore();
                CloudDB.collection('userProfile').doc().set({
                    user_name: username,
                    user_email: accountEmail,
                    user_phone: accountMobileNo,
                    user_address: accoundAddress,
                });
                window.alert("User Registration Successful");
                localStorage.setItem("userAccountEmail", user.email);
                window.location.href = "./index.html";
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorCode + ": " + errorMessage);
            });


    } else {
        window.alert("Passwords are not the same with the confirmation password.");
    }
}

//user Login 

function loginUser() {

    var logInEmail = document.getElementById('userLoginName').value;
    var password = document.getElementById('userLoginPassword').value;

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);

    } else {
        firebase.app(); // if already initialized, use that one
    }
    firebase.auth().signInWithEmailAndPassword(logInEmail, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            localStorage.setItem("userAccountEmail", user.email);
            window.location.href = "./main.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorCode + ': ' + errorMessage);
        });

}

//Box Border-Color

function borderColor() {
    document.getElementById("petServicePetBoading2").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading3").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading1").style.border = "#fa5c00 2px solid";
}

function borderColor2() {
    document.getElementById("petServicePetBoading1").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading3").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading2").style.border = "#fa5c00 2px solid";
}

function borderColor3() {
    document.getElementById("petServicePetBoading1").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading2").style.border = 'rgba(75, 75, 74, 0.6) solid 1px';
    document.getElementById("petServicePetBoading3").style.border = "#fa5c00 2px solid";
}