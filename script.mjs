//**************************************************************/
// Script.mjs
// Sal's Strawberries
// Written by Ryan Parks, Term 2 2025
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = 'pink';	//  console.log for functions scheme
console.log('%c script.mjs',
    'color: blue; background-color: white;');
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, set }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/

export { fb_initialise, fb_authenticate, fb_WriteRec, fb_ReadRec, email_view }

function fb_initialise() {
    console.log('%c fb_initialise(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const firebaseConfig =
    {
        apiKey: "AIzaSyAQ3Qc6Ej_4YvNXCAjqsfLoA8p75j3R7-8",
        authDomain: "comp2025-ryan-parks.firebaseapp.com",
        databaseURL: "https://comp2025-ryan-parks-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp2025-ryan-parks",
        storageBucket: "comp2025-ryan-parks.firebasestorage.app",
        messagingSenderId: "73072219046",
        appId: "1:73072219046:web:7608445213a3fd3e973567",
        measurementId: "G-R89L1J8Z4D"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const firebaseGameDB = getDatabase(app);
    console.info(firebaseGameDB);
}

var currentUser = null;
var userId = null;
var emailTemplate = "";

function fb_authenticate() {
    console.log('%c fb_authenticate(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        //✅ Code for a successful authentication goes here
        currentUser = result.user;
        userId = currentUser.uid;
        console.log("Authenticated");
    })

        .catch((error) => {
            //❌ Code for an authentication error goes here
            console.log("ERROR!!!!!!!!");

        });
    //var userId = result.User;
}


function fb_WriteRec() {
    if (!currentUser) {
        alert("You must be logged in to submit the form.");
        return;
    }
    console.log('%c fb_WriteRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var name = document.getElementById("name").value;
    var favoriteFruit = document.getElementById("favoriteFruit").value;
    var fruitQuantity = document.getElementById("fruitQuantity").value;

    // Add additional fields here as needed
    
    const dbReference= ref(DB, 'Test/UID/' + userId);
    set(dbReference, {
        Name: name,
        FavoriteFruit: favoriteFruit,
        FruitQuantity: fruitQuantity
    }).then(() => {
        console.log("Write successful!")
    }).catch((error) => {
        console.log("fail Writing")
    });
}

function fb_ReadRec() {
    console.log('%c fb_ReadRec(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    const dbReference= ref(DB, "Test/UID/" + userId);

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read all goes here
            console.log("Successfully read all");
            console.log(fb_data);
        } else {

            //✅ Code for no record found goes here
            console.log("no record");
            console.log(fb_data);

        }

    }).catch((error) => {

        //❌ Code for a read all error goes here
        console.log("error not read all");
        console.log(fb_data);
    });
}

// Displays email under the questions
function email_view(){
    if(!currentUser){
        alert("You must be logged in to view email.");
    }
    else{
        fb_ReadRec().then((fb_data) => {
            emailTemplate = `
                <div style="background: #fff0f5; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
                    <p>Kia ora ${fb_data.Name},</p>
                    <p>Thank you for joining us at Sal’s Strawberry Saloon (and other fruit products)! We're thrilled to have you as a customer!</p>
                    <p>Based on your preferences, we’ll be sending you personalized recommendations for tasty and healthy treats made with the freshest fruit — especially those ${fb_data.FavoriteFruit} we heard you love!</p>
                    <p>At the moment, we want to offer you a deal to get fresh ${fb_data.FavoriteFruit} ${fb_data.FruitQuantity}x a week!!</p>
                    <p>Ngā mihi nui,</p>
                    <p><em>The Sal’s Strawberry Saloon Team</em></p>
                </div>`
            console.log("Sal! The email has been sent!");
            document.getElementById("emailOutput").innerHTML = emailTemplate;
        }).catch((error) => {
            console.log("error")
        });
    }
}






