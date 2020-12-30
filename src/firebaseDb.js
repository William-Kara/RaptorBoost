import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEaxh77nmwaw7wMJYzm2yiqduYCa_BaLQ",
    authDomain: "project-vod-d6fa4.firebaseapp.com",
    projectId: "project-vod-d6fa4",
    storageBucket: "project-vod-d6fa4.appspot.com",
    messagingSenderId: "772151794196",
    appId: "1:772151794196:web:3456a5dd7a8d4dfd96e501",
    measurementId: "G-Y5060RYW9H"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();