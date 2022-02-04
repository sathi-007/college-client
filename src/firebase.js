/**
 * src/firebase.js
 */
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
 
 const firebaseConfig = {
    apiKey: "AIzaSyCj26Xu0KIca5NIrojQ-RXPntB_ZzHJ290",
    authDomain: "collegercode.firebaseapp.com",
    projectId: "collegercode",
    storageBucket: "collegercode.appspot.com",
    messagingSenderId: "875014470649",
    appId: "1:875014470649:web:e9c5d73ad661ceabc41b28"
  };
 
 firebase.initializeApp(firebaseConfig);
 
 const auth = firebase.auth();
 
 export { auth, firebase };
 
 