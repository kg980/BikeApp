// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGvbchwzdlVU7yoAU3rA0e8lznIgHc1Lw",
  authDomain: "bikeapp-db2d1.firebaseapp.com",
  projectId: "bikeapp-db2d1",
  storageBucket: "bikeapp-db2d1.appspot.com",
  messagingSenderId: "301542388427",
  appId: "1:301542388427:web:e6e4abb5f82bac7c0da14e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);

{/* 
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig); 
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };
*/}
