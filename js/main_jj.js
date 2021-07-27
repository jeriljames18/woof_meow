function addUserAccount(e) {
    e.preventDefault();

    let accountFullname = getValue('fullname');
    let accountMobileNo = getValue('mobileNo');
    let accountEmail = getValue('email');
    let password = getValue('passwrd1');
    let cPassword = getValue('passwrd2');



    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }


    if (password === cPassword) {


        firebase.auth().createUserWithEmailAndPassword(accountEmail, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                saveAccountDetails(accountEmail, accountFullname, accountMobileNo);
                // ...
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