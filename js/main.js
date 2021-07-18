// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


/*********************************** CONSTRUCTOR ***********************************/
class bookingInformation {
    constructor(fullName, emailAddr, password, mobileNumber, location) {
        this.fullName = fullName;
        this.emailAddr = emailAddr;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.location = location;
    }
}

class bookingInformation {
    constructor(fullName, emailAddr, password, mobileNumber, location) {
        this.fullName = fullName;
        this.emailAddr = emailAddr;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.location = location;
    }
}


/********************************* TRACKING FUNCTION *********************************/
let map;
var watchID;
var geoLoc;

function getLocationUpdate() {

    /**update every 15mins */
    if (navigator.geolocation) {
        var options = { timeout: 300000 }; //5minutes interval
        geoLoc = navigator.geolocation;
        /**save location of gps */
        watchID = geoLoc.watchPosition(showLocation, errorHandler, options);


    } else {
        alert("The device does not support geolocation!");
    }
}

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    initMap(latitude, longitude);
    //saveGeolocation(localStorage.getItem("userAccountEmail"), localStorage.getItem("userAccountName"), latitude, longitude)
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function initMap(lat, long) {

    getLocationUpdate();

    if (typeof lat == 'undefined' && typeof long == 'undefined') {
        lat = 0;
        long = 0;
    }

    let mapCoordinates = { lat: lat, lng: long };

    map = new google.maps.Map(document.getElementById("tracking_map"), {
        center: mapCoordinates,
        zoom: 15,
    });


    const image =
        "./icon/location.svg";


    new google.maps.Marker({
        position: mapCoordinates,
        map,
    });
}



function getMemberLocationByEmail(email) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    let objTracking;
    var db = firebase.firestore();


    var docRef = db.collection("dbServiceBooking").doc(email.replace(/\s/g, ''));

    docRef.get().then((doc) => {

        objTracking = doc.data();

        initMap(objTracking.trackLat, objTracking.trackLong);

    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

/********************************************************************************************************/

/********************************* SAVING FUNCTION *********************************/

function saveSchedule() {
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    // firebase.analytics();
    var db = firebase.firestore();

    db.collection("dbServiceBooking").doc().set({
        sbUserEmail: "userEmail@gmail.com",
        sbSitterEmail: "sitterEmail@yahoo.com",
        sbDateFrom: "17/7/2021",
        sbDateTo: "17/7/2021",
        sbTimeStart: "13:00",
        sbTimeEnd: "14:00",
        sbStatus: 0,
        sbRating: 4,
        trackLat: 104,
        trackLong: 222

    })

    .then(() => {
            console.log("SAVED SUCCESSFULLY!");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

/********************************************************************************************************/

let evntlstener;

evntlstener = document.getElementById('calendar_save');
if (evntlstener) {
    evntlstener.addEventListener('click', saveSchedule);
}