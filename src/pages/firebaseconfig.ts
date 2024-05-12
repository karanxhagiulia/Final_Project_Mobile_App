import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

const config = {
  apiKey: "AIzaSyDS9VKg7B4Lk2O6RckIxmWN3I3gKaLV7S4",
  authDomain: "fir-auth-project-bd13a.firebaseapp.com",
  projectId: "fir-auth-project-bd13a",
  storageBucket: "fir-auth-project-bd13a.appspot.com",
  messagingSenderId: "918344248875",
  appId: "1:918344248875:web:20e1009ac727a78871446e",
  measurementId: "G-FTXZCNSC3N"
};



const app = firebase.initializeApp(config);


const auth = getAuth(app);

const registerUser = (name: string, email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed up successfully:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('User registration error:', errorCode, errorMessage);
    });
};

const signInUser = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User signed in successfully:', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('User sign-in error:', errorCode, errorMessage);
    });
};

export { app, auth, registerUser, signInUser };