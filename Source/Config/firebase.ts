import "@firebase/auth"
import "@firebase/firestore"
import * as firebase from "firebase"

// Initialize Firebase

const prodFirebaseConfig = {
  apiKey: "AIzaSyCQM-npgyWNNYM9K5FlbjdTDrmfEf4fZjw",
  authDomain: "https://ridelogg.firebaseio.com",
  databaseURL: "https://ridelogg.firebaseio.com",
  projectId: "ridelogg",
  storageBucket: "ridelogg.appspot.com",
  appId: "1:931489511293:android:da3edce7bac9b418befe14",
}

if (!firebase.apps.length) {
  firebase.initializeApp(prodFirebaseConfig)
}

export { firebase }
