import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAdYPUX4ajHRrI8vec7f-11S23CgfR3Bpo",
    authDomain: "milventanas-coder.firebaseapp.com",
    projectId: "milventanas-coder",
    storageBucket: "milventanas-coder.appspot.com",
    messagingSenderId: "1000815439071",
    appId: "1:1000815439071:web:4741b5d835daa64c440d6a"
  };


  const app = firebase.initializeApp(firebaseConfig)

  export function getFirestore () {
      return firebase.firestore(app)
  }