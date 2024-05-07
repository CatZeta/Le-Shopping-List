// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCB4XAA2BWoms6bsnDrq33wYlIP2rhAIlw",
    authDomain: "le-shopping-list.firebaseapp.com",
    projectId: "le-shopping-list",
    storageBucket: "le-shopping-list.appspot.com",
    messagingSenderId: "183288219769",
    appId: "1:183288219769:web:88240cba05a21b8849eca8",
    measurementId: "G-QXM68S83E5"
  };

  //Init firebase
  firebase.initializeApp(firebaseConfig);

//Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//Timestamp, logic used to set the server timestamp on a document field.
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, timestamp }