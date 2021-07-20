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
    constructor(_userEmail, _sitterEmail, _dateFrom, _dateTo, _timeStart, _timeEnd, _status, _rating, _geolocation, _type) {

        this.userEmail = _userEmail;
        this.sitterEmail = _sitterEmail;
        this.dateFrom = _dateFrom;
        this.dateTo = _dateTo;
        this.timeStart = _timeStart;
        this.timeEnd = _timeEnd;
        this.status = _status;
        this.rating = _rating;
        this.geolocation = _geolocation;
        this.type = _type;

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
        title: "Sitter's name",
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


function getBookinglist() {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();

    db.collection("dbServiceBooking").where("sbUserEmail", "==", "userEmail@gmail.com").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            let newRow = " ";
            let arrBookingList = new bookingInformation;
            let petsittername = "SAMPLE NAME";
            arrBookingList = doc.data();
            console.log(doc.id);
            newRow = (
                "<div>" +
                "<p>" + arrBookingList.sbDateFrom + " to " + arrBookingList.sbDateTo + "</p>" +
                "<p>" + arrBookingList.sbTimeStart + " to " + arrBookingList.sbTimeEnd + "</p>" +
                "<p>" + petsittername + "</p>" +
                "<p>" + arrBookingList.sbServiceType + "</p>" +
                `<button class='booking-status' type='button' onclick='changeBookingStatus("${doc.id}")'> Pending </button>` +
                `<button class = 'start-track' type='button' onclick='startLiveTracking("${doc.id}")'> Start Live Tracking </button>` +
                "</div>"
            );


            console.log(newRow);

            $(".ongoing").append(newRow);

        });
    });
}

function changeBookingStatus(booking_id) {

    console.log("test");
}

function startLiveTracking(booking_id) {
    console.log("test");
}

/********************************* SAVING FUNCTION *********************************/

function saveImage() {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }


    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storageRef = firebase.storage().ref();


    var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name; // true
    mountainsRef.fullPath === mountainImagesRef.fullPath; // false 

    var metadata = {
        contentType: 'image/jpeg',
    };

    // Upload the file and metadata
    var uploadTask = storageRef.child('images/mountains.jpg').put(file, metadata);

}

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
        sbUserEmail: "userEmail443@gmail.com",
        sbSitterEmail: "sitterEmail543@yahoo.com",
        sbDateFrom: "24/7/2021",
        sbDateTo: "24/7/2021",
        sbTimeStart: "15:00",
        sbTimeEnd: "16:00",
        sbStatus: 0,
        sbRating: 0,
        trackLat: 104,
        trackLong: 222
            /* db.collection("dbUserProfile").doc("userEmailTest3@gmail.com").set({
                upUsername: "test_user3",
                upAddress: "123 sample address City, BC 123455",
                upMobile: 12345678,
                upPetboard: false,
                upHouseSit: true,
                upPetWalk: false,
                upPetboardRate: 24.55,
                upHouseSitRate: 0,
                upPetWalkRate: 0,
                upDescription: "lorem ipsum asdgskfdsdfklsdkfosd",
                upArraySkills: null,
                upGeolocation: "", */
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
    evntlstener.addEventListener('click', uploadHandleError);
}