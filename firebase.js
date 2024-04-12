import { initializeApp } from "firebase/app";
import "dotenv/config";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};
if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
