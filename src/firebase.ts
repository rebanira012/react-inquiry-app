import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase//storage'
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };


const firebaseConfig = {
    apiKey: "AIzaSyB9jr9QdL-_KXZ35gUeJkL3cMfaKX5GcfE",
    authDomain: "react-ts-inquiry-app.firebaseapp.com",
    databaseURL: 'https://react-ts-inquiry-app.firebaseio.com',
    projectId: "react-ts-inquiry-app",
    storageBucket: "react-ts-inquiry-app.appspot.com",
    messagingSenderId: "963673220744",
    appId: "1:963673220744:web:38f583876f5a12f832e13d"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const st = getStorage(app)
// export const st = firebase.storage();


// if (window.location.hostname === "localhost") {
//     firebase.auth().useEmulator("http://localhost:9099");
//     firebase.firestore().useEmulator("localhost", 8080);
// }

