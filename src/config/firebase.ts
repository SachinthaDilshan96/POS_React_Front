import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwOf4_c_eaFDV7cnYxH2P1TSAiA6JkLbk",
    authDomain: "fullstackmaster-pos.firebaseapp.com",
    projectId: "fullstackmaster-pos",
    storageBucket: "fullstackmaster-pos.appspot.com",
    messagingSenderId: "403779989783",
    appId: "1:403779989783:web:753bcc0227f08f69d30752",
    measurementId: "G-VMGTKWBWQB"
};

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export const storage = firebase.storage();
export default firebase;
