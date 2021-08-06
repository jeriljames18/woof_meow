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
    let CloudDB = firebase.firestore();

    if (password === cPassword) {


        firebase.auth().createUserWithEmailAndPassword(accountEmail, password)
            .then((userCredential) => {
                let user = userCredential.user;


                localStorage.setItem("userAccountEmail", user.email);

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                window.alert(errorCode + ": " + errorMessage);
            });
        let CloudDB = firebase.firestore();
        CloudDB.collection('dbUserProfile').doc(accountEmail).set({
            upUsername: username,
            upPhone: accountMobileNo,
            upAddress: accoundAddress,
        });
        window.alert("User Registration Successful");
        window.location.href = "./index.html";

    } else {
        window.alert("Passwords are not the same with the confirmation password.");
    }
}

//user Login 



evntlstener = document.getElementById('loginclick');
if (evntlstener) {
    evntlstener.addEventListener('click', loginUser);
}

function loginUser() {

    var logInEmail = document.getElementById('userLoginName').value;
    var strpassword = document.getElementById('userLoginPassword').value;

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);

    } else {
        firebase.app(); // if already initialized, use that one
    }


    firebase.auth().signInWithEmailAndPassword(logInEmail, strpassword)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            localStorage.setItem("userAccountEmail", user.email);
            localStorage.setItem("user-email-Id", user.email);
            window.location.href = "./search.html";
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