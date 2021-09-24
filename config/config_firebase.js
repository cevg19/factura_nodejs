import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBuXOGMrD0g8eb0rFYL-0YNJoGpfUN-3v0",
  authDomain: "facturajs-16b48.firebaseapp.com",
  databaseURL: "https://facturajs-16b48-default-rtdb.firebaseio.com",
  projectId: "facturajs-16b48",
  storageBucket: "facturajs-16b48.appspot.com",
  messagingSenderId: "1010466924177",
  appId: "1:1010466924177:web:bd6a1e95d1892842008130",
  measurementId: "G-PLPCRZWXL4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
export {db}