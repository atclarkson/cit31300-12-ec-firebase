import firebase from "firebase";

 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXN1tgKijAv2tV5XGwWyGwxpU_cCK9ep8",
    authDomain: "ec-firebase.firebaseapp.com",
    databaseURL: "https://ec-firebase.firebaseio.com",
    projectId: "ec-firebase",
    storageBucket: "ec-firebase.appspot.com",
    messagingSenderId: "115086667544",
    appId: "1:115086667544:web:82ccda0f21416f8961f86d"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;