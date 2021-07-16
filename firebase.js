import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyA0-Ru5LzJoGF9z1WK0dUVXPVxJSavsxY0",
  authDomain: "vue-bulletin-board-7de84.firebaseapp.com",
  projectId: "vue-bulletin-board-7de84",
  storageBucket: "vue-bulletin-board-7de84.appspot.com",
  messagingSenderId: "1015495354427",
  appId: "1:1015495354427:web:953f76ebd4f6b67f4fd41e",
  measurementId: "G-QVM43DN3DS"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const database = firebaseApp.firestore();

export { database, auth };