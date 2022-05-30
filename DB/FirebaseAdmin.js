var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
require("dotenv").config({ path: "./firebase.env" })

const {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
} = process.env;


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    databaseURL: DATABASE_URL,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
});

// Cloud storage
const bucket = admin.storage().bucket()

module.exports = {
    bucket
}

// const firebase = require('firebase-admin');
// var admin = require("firebase-admin");
// require("dotenv").config({ path: "./firebase.env" })



// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: STORAGE_BUCKET,
// });


// const firebaseConfig = {
//     apiKey: API_KEY,
//     authDomain: AUTH_DOMAIN,
//     projectId: PROJECT_ID,
//     databaseURL: DATABASE_URL,
//     storageBucket: STORAGE_BUCKET,
//     messagingSenderId: MESSAGING_SENDER_ID,
//     appId: APP_ID
// }

// module.exports = admin
