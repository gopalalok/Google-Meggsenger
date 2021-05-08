import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDxT4_gF2nBQ80xP82NB09LhMdSLXYyoFg",
  authDomain: "messenger-ec5c4.firebaseapp.com",
  projectId: "messenger-ec5c4",
  storageBucket: "messenger-ec5c4.appspot.com",
  messagingSenderId: "1064910768804",
  appId: "1:1064910768804:web:f4e4313a3610e0bd39b431"
};

  const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };