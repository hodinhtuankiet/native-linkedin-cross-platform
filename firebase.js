import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJzZ7DrZARx-UtZOMwmgU3l-SSuJxKX0E",
  authDomain: "linkedin-89588.firebaseapp.com",
  projectId: "linkedin-89588",
  storageBucket: "linkedin-89588.appspot.com",
  messagingSenderId: "1075608032606",
  appId: "1:1075608032606:web:b001453b983c838fb1ebcf",
};

// Initialize Firebase app if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
