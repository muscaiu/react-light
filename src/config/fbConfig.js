import firebase from 'firebase/app'; //core functionality
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDu1V6eO6vQczNtecZdo8rVvFQAZB6llyg",
    authDomain: "pompa-b855f.firebaseapp.com",
    databaseURL: "https://pompa-b855f.firebaseio.com",
    projectId: "pompa-b855f",
    storageBucket: "pompa-b855f.appspot.com",
    messagingSenderId: "145084180701"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;
