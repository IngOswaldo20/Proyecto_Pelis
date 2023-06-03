import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCK5A3Fq6NNOwBvC8Qz5wpOwbyC8eYuCuQ",
  authDomain: "proyecto2p-8180e.firebaseapp.com",
  projectId: "proyecto2p-8180e",
  storageBucket: "proyecto2p-8180e.appspot.com",
  messagingSenderId: "912637279348",
  appId: "1:912637279348:web:4e4f7990ac7a53059fe521"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, collection, addDoc };
