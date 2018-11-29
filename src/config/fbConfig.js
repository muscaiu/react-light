import firebase from 'firebase/app'; //core functionality
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDLm2fW6HErord99U4_RJR8ia949gHmKVM",
    authDomain: "pump-3e29a.firebaseapp.com",
    databaseURL: "https://pump-3e29a.firebaseio.com",
    projectId: "pump-3e29a",
    storageBucket: "",
    messagingSenderId: "1001221036910"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;
