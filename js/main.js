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
/********************************************************************************************************/