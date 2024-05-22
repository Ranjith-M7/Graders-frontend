import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYvz97qtv0EEe1P8w3t7GUMI-nc6RWkBE",
  authDomain: "graders-51b05.firebaseapp.com",
  databaseURL: "https://graders-51b05-default-rtdb.firebaseio.com",
  projectId: "graders-51b05",
  storageBucket: "graders-51b05.appspot.com",
  messagingSenderId: "551587800777",
  appId: "1:551587800777:web:e8a30ec197ac45d3afcf18",
  measurementId: "G-VTEJFC66EH",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the Firebase database for use in components
const database = firebase.database();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { database, firestore, storage };
