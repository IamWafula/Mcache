import * as firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDESLpdUU20wdlQ-zEttJjAwgisFAtK_ik",
    authDomain: "mcache-proto-one.firebaseapp.com",
    projectId: "mcache-proto-one",
    storageBucket: "mcache-proto-one.appspot.com",
    messagingSenderId: "372836497819",
    appId: "1:372836497819:web:acf0e1ee010df5df6b493e"
  };

let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth()


export {db, auth}