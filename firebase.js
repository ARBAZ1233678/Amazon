// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBMhjEVi_if7GaCvfHhCtzgHRMd9OgxsJU",
  authDomain: "clone-bcdd3.firebaseapp.com",
  projectId: "clone-bcdd3",
  storageBucket: "clone-bcdd3.appspot.com",
  messagingSenderId: "923361863580",
  appId: "1:923361863580:web:3fc55b3d3cecd7edff8a59",
  measurementId: "G-9VRK719TH9"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };

