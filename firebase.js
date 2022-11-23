import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRdmtEdt_Sh3gO6wolHuYqRWNS1xOIz54",
  authDomain: "budder-37d34.firebaseapp.com",
  projectId: "budder-37d34",
  storageBucket: "budder-37d34.appspot.com",
  messagingSenderId: "976711964331",
  appId: "1:976711964331:web:91ff1ea0b5f18e6a0289ee",
  measurementId: "G-T401252ZWG"
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebase