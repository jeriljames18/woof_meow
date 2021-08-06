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


class PetSitterProfile {
    constructor(_username, _address, _mobile, _petboard, _housesit, _petwalk, _petboardrate, _housesitrate, _petwalkrate, _description, _arrayskills, _geolocation) {


        this.Username = _username;
        this.Address = _address;
        this.Mobile = _mobile;
        this.Petboard = _petboard;
        this.HouseSit = _housesit;
        this.PetWalk = _petwalk;
        this.PetboardRate = _petboardrate;
        this.HouseSitRate = _housesitrate;
        this.PetWalkRate = _petwalkrate;
        this.Description = _description;
        this.ArraySkills = _arrayskills;
        this.Geolocation = _geolocation;


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

var geocoder;

function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 15,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('tracking_map'), mapOptions);
}


function showSitterLocation(strAddress, strName) {


    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h2 id="firstHeading" class="firstHeading">' + strName + '</h2>' +
        '<div id="bodyContent">' +
        "<p><b>" + strAddress + "</b></p>" +
        "</div>" +
        "</div>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });


    initialize();

    var icon = {
        url: "./icon/location.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
    };

    geocoder.geocode({ 'address': strAddress }, function(results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                position: results[0].geometry.location,
                title: strName
            });

            marker.addListener("click", () => {
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    let isTracking = true;
    initMap(latitude, longitude, isTracking);
    //saveGeolocation(localStorage.getItem("userAccountEmail"), localStorage.getItem("userAccountName"), latitude, longitude)
}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function initMap(lat, long, isTracking) {

    if (isTracking) {
        getLocationUpdate();
    }

    if (typeof lat == 'undefined' && typeof long == 'undefined') {
        lat = 0;
        long = 0;
    }

    let mapCoordinates = { lat: lat, lng: long };

    map = new google.maps.Map(document.getElementById("tracking_map"), {
        center: mapCoordinates,
        zoom: 18,
    });


    //woofandmeow.surge.sh/images/dog.svg
    const image = {
        url: "http://woofandmeow.surge.sh/images/Dog.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
    };




    new google.maps.Marker({
        position: mapCoordinates,
        map,
        icon: image
    });
}




function memberTrack(email, fullname) {

    let currentEmailTrack = email;
    let currentFullNameTrack = fullname;

    /** Write function to get the geolocation of the family member on the database. 
     * Promise .then(update the map) */
    getMemberLocationByEmail(currentEmailTrack);

}



function getSitterLocationByBookingId(booking_id) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    let arrBookingList = new bookingInformation;
    var db = firebase.firestore();

    const coordinates = [];

    boolForSitter = true;

    if (boolForSitter) {
        navigator.geolocation.watchPosition(
            data => {
                console.log(data);
                // coordinates.push([data.coords.latitude, data.coords.longitude]);

                initMap(data.coords.latitude, data.coords.longitude, true);



            },
            error => console.log(error), {
                enableHighAccuracy: true
            }
        );
    }

    // var docRef = db.collection("dbServiceBooking").doc(booking_id.replace(/\s/g, ''));

    // docRef.get().then((doc) => {

    //     arrBookingList = doc.data();

    //     initMap(arrBookingList.trackLat, arrBookingList.trackLong, true);

    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
}

/********************************************************************************************************/
function loadProfilePage() {

    let sitterEmailId = localStorage.getItem("emailId");
    let profilepic = localStorage.getItem("profilepic");

    let profilepic2 = "<img class='pro_pic' src='" + profilepic + "' alt=''>";
    $(".sitter_profile_image").append(profilepic2);



    // if (!firebase.apps.length) {
    //     firebase.initializeApp(firebaseConfig);
    // } else {
    //     firebase.app(); // if already initialized, use that one
    // }

    // var db = firebase.firestore();

    // let docRef = db.collection("dbUserProfile").doc(sitterEmailId.replace(/\s/g, ''));
    // docRef.get().then((doc) => {
    //     let arrProfileList = new PetSitterProfile;
    //     arrProfileList = doc.data();
    // });

}

function callSitter(intMobileNumber) {
    window.location.href = 'tel:' + intMobileNumber;
}


function getSitterFullName(strEmailAddress) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();

    let docRef = db.collection("dbUserProfile").doc(strEmailAddress.replace(/\s/g, ''));
    docRef.get().then((doc) => {
        let arrProfileList = new PetSitterProfile;
        arrProfileList = doc.data();
        return arrProfileList.upUsername;
    });

}

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
            arrBookingList = doc.data();
            console.log(doc.id);

            newRow = (
                "<div id='booking-box'>" +
                "<h3>" + arrBookingList.sbServiceType + "</h3>" +
                `<p>Sitter's Name: <b>${arrBookingList.sbSitterName}</b></p>` +
                "<p>Date: " + arrBookingList.sbDateFrom + " to " + arrBookingList.sbDateTo + "</p>" +
                "<p>Time: " + arrBookingList.sbTimeStart + " to " + arrBookingList.sbTimeEnd + "</p>" +
                `<p  class='booking-status ${doc.id}' onclick='changeBookingStatus("${doc.id}")'>Status: ${getBookingStatus(arrBookingList.sbStatus)} </p>` +
                "<p>Start Location: " + arrBookingList.sbGeolocation + "</p>" +
                `<button class = 'call-sitter' type='button' onclick='callSitter("${arrBookingList.sbMobile}")'>  Call Sitter </button>` +
                // `<button class='booking-status-${doc.id}' type='button' onclick='changeBookingStatus("${doc.id}")'> ${getBookingStatus(arrBookingList.sbStatus)} </button>` +
                `<button class = 'start-track ${doc.id}' type='button' onclick='goToLiveTracking("${doc.id}","${arrBookingList.sbSitterName}")'>  Start Live Tracking </button>` +
                "</div>"
            );


            if (arrBookingList.sbStatus == 2) {
                $(".previous_list").append(newRow);

            } else {
                $(".ongoing").append(newRow);
            }

            if (arrBookingList.sbStatus == 0 || arrBookingList.sbStatus == 2) {
                $(`button.${doc.id}`).remove();
            }

            if (arrBookingList.sbStatus == 0) {
                $(`p.${doc.id}`).css("color", "#FA5C00");
                $(`p.${doc.id}`).css("font-weight", "bold");
            }


        });
    });
}

function getSearchServiceParameters(strServiceName) {

    switch (strServiceName) {
        case "Pet Boarding":
            return "upPetboard";
            break;

        case "Pet Walking":
            return "upPetWalk";
            break;
        default:
            return "upHouseSit";
    }
}

function searchPetSitter() {

    let strServiceName = localStorage.getItem("servicetype");
    let intCount = 0;

    let strServiceType = "upPetWalk"; //getSearchServiceParameters(strServiceName);

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();
    db.collection("dbUserProfile").where(strServiceType, "==", true).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            let newRow = " ";
            let arrProfileList = new PetSitterProfile;
            arrProfileList = doc.data();
            console.log(doc.id);



            let strImageLocation = "";
            let starIconShaded = "./icon/star.svg";
            let starIconUnShaded = "./icon/star_shaded.svg";
            let intNumberOfReturnedClient = "2";
            let intSitterRate = "20";


            switch (intCount) {
                case 0:
                    strImageLocation = "./images/martinjones.jpg"
                    break;
                case 1:
                    strImageLocation = "./images/barondavis.jpg"
                    break;
                default:
                    strImageLocation = "./icon/pexels-photo-8090146.jpeg"
            }

            newRow = (
                `<div id='search-wrapper' onclick='goToProfilePage("${doc.id}", "${strImageLocation}")'>` +

                "<div class='search'>" +
                "<img class='profile' src='" + strImageLocation + "' alt=''>" +
                "</div>" +
                "<div class='info'>" +
                "<h3 id='name'><b>" + arrProfileList.upUsername + "</b></h3>" +
                "<p id='description'>" + arrProfileList.upDescription + "</p>" +
                "<picture class='stars'>" +
                "<img src='" + starIconUnShaded + "' alt='star1'>" +
                "<img src='" + starIconUnShaded + "' alt='star2'>" +
                "<img src='" + starIconUnShaded + "' alt='star3'>" +
                "<img src='" + starIconUnShaded + "' alt='star4'>" +
                "<img src='" + starIconShaded + "' alt='star5'>" +
                "</picture>" +
                "<p id='clients'>" + intNumberOfReturnedClient + " repeat clients</p>" +
                "<p id='price'>$" + intSitterRate + " per service</p>" +
                "</div>" +
                "</div>"
            );

            intCount += 1;

            console.log(newRow);

            showSitterLocation(arrProfileList.upAddress, arrProfileList.upUsername);

            $(".profile-info").append(newRow);



        });

    }).catch((error) => {
        console.log("Error getting document:", error);
    });

}

function getBookingStatus(intStatus) {

    switch (intStatus) {
        case 0:
            return "Pending";
            break;
        case 1:
            return "Confirmed";
            break;
        default:
            return "Completed";

    }
}


function changeBookingStatus(booking_id) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();
    var docRef = db.collection("dbServiceBooking").doc(booking_id.replace(/\s/g, ''));

    docRef.update('sbStatus', 1);
    $(`.booking-status-${booking_id}`).html('Confirmed');
    $(`.start-track-${booking_id}`).show();



}

function goToProfilePage(email_id, strimageloc) {


    let userEmail = localStorage.getItem("user-email-Id");
    localStorage.setItem("profilepic", strimageloc);
    if (userEmail == undefined) {
        window.location.href = "./index.html";
    } else {
        localStorage.setItem("emailId", email_id);
        window.location.href = "./index_dhruv.html";
    }

}

function goToLiveTracking(booking_id, bookingName) {
    localStorage.setItem("bookingId", booking_id);
    localStorage.setItem("bookingName", bookingName);
    window.location.href = "./livetracking.html";
}


function goToLandingPage() {
    window.location.href = "./services.html";
}

function goToPetServices() {
    window.location.href = "./pet_services.html";
}

function gotoSearch() {
    localStorage.setItem("servicetype", $("#enquiryService").val());
    localStorage.setItem("zipcode", $("zipcode").val());
    window.location.href = "./search.html";
}

function gotoSearch2() {
    localStorage.setItem("zipcode", $("serviceLocationH4").val());
    window.location.href = "./search.html";
    // window.location.replace("./search.html");
}

function removefirsttimecounter() {
    localStorage.setItem('first-time', true);
}

function getLiveTrackingMessage(strServiceType) {

    switch (strServiceType) {
        case "Pet Boarding":
        case "House Sitting":
            return "Your sitter is currently taking care of your pet.";

        default:
            return "Your sitter is currently taking your pet out for a walk.";

    }
}

function checkMobileLayout() {


    let sample = localStorage.getItem('first-time');

    if (sample == null || sample == undefined) {


        if (screen.width <= 600) {
            window.location.href = "./loading.html";
        }

    }
}

function startLiveTracking() {

    let booking_id = localStorage.getItem("bookingId");
    let booking_name = localStorage.getItem("bookingName");

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    let arrBookingList = new bookingInformation;
    var db = firebase.firestore();


    var docRef = db.collection("dbServiceBooking").doc(booking_id.replace(/\s/g, ''));

    docRef.get().then((doc) => {

        arrBookingList = doc.data();

        let newRow = (
            "<div class='livebooking'>" +
            "<p>Booking is currently active with <b>" + booking_name + "</b></p>" +
            "<div class ='bookingtime'>" +
            `<p> ${getLiveTrackingMessage(arrBookingList.sbServiceType )} </p>` +
            "<p><b>Date:</b> " + arrBookingList.sbDateFrom + " to " + arrBookingList.sbDateTo + "</p>" +
            "<p><b>Time:</b> " + arrBookingList.sbTimeStart + " to " + arrBookingList.sbTimeEnd + "</p>" +
            "</div>" +
            "<p>" + arrBookingList.sbServiceType + "</p>" +
            `<button class = 'call-sitter' type='button' onclick='callSitter("${arrBookingList.sbMobile}")'>  Call Sitter </button>` +
            `<button class = 'end-track' type='button' id = 'endlive' onclick='endLiveTracking("${booking_id}")'> End Tracking </button>` +
            "</div>"
        );


        $(".live-info").append(newRow);

        setModal();
        getSitterLocationByBookingId(booking_id);

    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

/********************************* SAVING FUNCTION *********************************/
function endLiveTracking(strbookingID) {




    $(".modal-body2").empty();

    let newRow;



    newRow = (
        "<p><b>Do you want to end the service?</b></p>" +
        // `<p> ${getLiveTrackingMessage(arrBookingList.sbServiceType )} </p>` +
        // "<p><b>Date:</b> " + arrBookingList.sbDateFrom + " to " + arrBookingList.sbDateTo + "</p>" +
        // "<p><b>Time:</b> " + arrBookingList.sbTimeStart + " to " + arrBookingList.sbTimeEnd + "</p>" +
        // "</div>" +
        // "<p>" + arrBookingList.sbServiceType + "</p>" +
        // `<button class = 'call-sitter' type='button' onclick='callSitter("${arrBookingList.sbMobile}")'>  Call Sitter </button>` +
        `<button class = 'end-track' type='button' onclick='updateSchedule("${strbookingID}", "2")'> YES </button>`
        // "</div>"
    );

    $(".modal-body2").append(newRow);




}

function updateSchedule(bookingId, intUpdatebooking) {


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();
    var docRef = db.collection("dbServiceBooking").doc(bookingId.replace(/\s/g, ''));
    docRef.update('sbStatus', intUpdatebooking);
    window.alert("The service is completed.");
    window.location.href = "./bookinglist.html";
}

function saveImage(strFileLocation) {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }


    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storageRef = firebase.storage().ref();
    var pictureRef = storageRef.child(strFileLocation);
    var imageRef = storageRef.child(strFileLocation);

    // While the file names are the same, the references point to different files
    pictureRef.name === imageRef.name; // true
    pictureRef.fullPath === imageRef.fullPath; // false 

    var metadata = {
        contentType: 'image/jpeg',
    };

    // Upload the file and metadata
    var uploadTask = storageRef.child(strFileLocation).put(file, metadata);

}

function saveSchedule(UserEmail, SitterEmail, dateFrom, dateTo, address, fullname, ServiceType) {
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    // firebase.analytics();
    var db = firebase.firestore();

    db.collection("dbServiceBooking").doc().set({
        sbUserEmail: UserEmail,
        sbSitterEmail: SitterEmail,
        sbDateFrom: dateFrom,
        sbDateTo: dateTo,
        sbStatus: 0,
        sbRating: 0,
        sbAddress: address,
        sbSitterName: fullname,
        sbServiceType: ServiceType
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
            window.alert("BOOKED SUCCESSFULLY!");

            console.log("BOOKED SUCCESSFULLY!");
            window.location.href = "./bookinglist.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

/********************************************************************************************************/

function getSchedule() {
    $("#booking-text").trigger("click");
}


$(function() {
    $("#booking-text").daterangepicker({
        timePicker: true,
        startDate: moment().startOf('hour'),
        endDate: moment().startOf('hour').add(1, 'hour'),
        locale: {
            format: 'MM/DD/YY hh:mm A'
        }
    });
});



function getService(intService) {
    switch (intService) {
        case "1":

            localStorage.setItem("servicetype", "Pet Boarding");
            break;

        case "2":
            localStorage.setItem("servicetype", "House Sitting");

            break;
        default:

            localStorage.setItem("servicetype", "Pet Walking");
            break;
    }


}




let evntlstener;

evntlstener = document.getElementById('calendar_save');
if (evntlstener) {
    evntlstener.addEventListener('click', saveSchedule);
}

evntlstener = document.getElementById('setBooking');
if (evntlstener) {
    evntlstener.addEventListener('click', getSchedule);
}



// evntlstener = document.getElementById('ps-search');
// if (evntlstener) {
//     evntlstener.addEventListener('click', gotoSearch2);
// }

evntlstener = document.getElementById('booknow');
if (evntlstener) {
    evntlstener.addEventListener('click', getBooking);
}

evntlstener = document.getElementById('btnSearch');
if (evntlstener) {
    evntlstener.addEventListener('click', gotoSearch);
}

evntlstener = document.getElementById('lastservices');
if (evntlstener) {
    evntlstener.addEventListener('click', goToPetServices);
}



// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn = document.getElementById("booknow");



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


function getBooking(e) {

    e.preventDefault;
    let sitterEmailId = localStorage.getItem("emailId");

    $(".modal-body").empty();

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    var db = firebase.firestore();

    let docRef = db.collection("dbUserProfile").doc(sitterEmailId.replace(/\s/g, ''));
    docRef.get().then((doc) => {
        let arrProfileList = new PetSitterProfile;
        arrProfileList = doc.data();
        // strSchedule, strFullName, strAddress, intMobile, strServiceType, strSitterEmail
        var strSchedule = document.getElementById("booking-text").value;

        var temp = new Array();

        temp = strSchedule.split("-");
        let datefrom = temp[0].toString();
        let dateto = temp[1].toString();
        let newRow;

        if (newRow == undefined) {



            newRow = (
                "<p>Pet-sitter's Name: <b>" + arrProfileList.upUsername + "</b></p>" +
                '<p> Service type: <select id="enquiryService" class="enquiryInputClass">' +
                '<option value="Pet Boarding">Pet Boarding</option>' +
                '<option value="Pet Walking">Pet Walking</option>' +
                '<option value="House Sitting">House Sitting</option>' +
                '</select></p>' +
                "<p>From: <b>" + datefrom.trim() + "</b></p>" +
                "<p>To: <b>" + dateto.trim() + "</b></p>" +
                // `<p> ${getLiveTrackingMessage(arrBookingList.sbServiceType )} </p>` +
                // "<p><b>Date:</b> " + arrBookingList.sbDateFrom + " to " + arrBookingList.sbDateTo + "</p>" +
                // "<p><b>Time:</b> " + arrBookingList.sbTimeStart + " to " + arrBookingList.sbTimeEnd + "</p>" +
                // "</div>" +
                // "<p>" + arrBookingList.sbServiceType + "</p>" +
                // `<button class = 'call-sitter' type='button' onclick='callSitter("${arrBookingList.sbMobile}")'>  Call Sitter </button>` +
                `<button class = 'end-track' type='button' onclick='saveSchedule("${localStorage.getItem("user-email-Id")}", "${localStorage.getItem("emailId")}", "${datefrom.trim()}", "${dateto.trim()}", "${arrProfileList.upAddress}", "${arrProfileList.upUsername}", "Pet Walking")'> Confirm Booking </button>`
                // "</div>"
            );

            $(".modal-body").append(newRow);


        }
    });

}


// When the user clicks on the button, open the modal
if (modal) {
    btn.onclick = function() {
        modal.style.display = "block";

        getBooking();


    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


}

function setModal() {
    // When the user clicks on the button, open the modal
    var btn2 = document.getElementById("endlive");
    if (modal2) {
        btn2.onclick = function() {
            modal2.style.display = "block";
            endLiveTracking(localStorage.getItem("bookingId"));
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal2.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal2) {
                modal2.style.display = "none";
            }
        }
    }
}





/***********MOBILE NAV**************** */

const nav = document.querySelector("#nav");
const menu = document.querySelector("#menu");
const menuToggle = document.querySelector(".nav__toggle");
let isMenuOpen = false;

if (menuToggle) {
    // TOGGLE MENU ACTIVE STATE
    menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        isMenuOpen = !isMenuOpen;

        // toggle a11y attributes and active class
        menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
        menu.hidden = !isMenuOpen;
        nav.classList.toggle("nav--open");

        if (!isMenuOpen) {
            $(".trackmap").css("z-index", "1");
        } else {

            $(".trackmap").css("z-index", "-1");
        }

    });

}

if (nav) {
    // TRAP TAB INSIDE NAV WHEN OPEN
    nav.addEventListener("keydown", (e) => {
        // abort if menu isn't open or modifier keys are pressed
        if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }

        // listen for tab press and move focus
        // if we're on either end of the navigation
        const menuLinks = menu.querySelectorAll(".nav__link");
        if (e.keyCode === 9) {
            if (e.shiftKey) {
                if (document.activeElement === menuLinks[0]) {
                    menuToggle.focus();
                    e.preventDefault();
                }
            } else if (document.activeElement === menuToggle) {
                menuLinks[0].focus();
                e.preventDefault();
            }
        }
    });
}