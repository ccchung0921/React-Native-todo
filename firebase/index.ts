// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHYVUeHF9hwJ4rYlj7h0Nw3lJxwKMCZbI",
  authDomain: "react-native-todo-70435.firebaseapp.com",
  projectId: "react-native-todo-70435",
  storageBucket: "react-native-todo-70435.appspot.com",
  messagingSenderId: "145262798674",
  appId: "1:145262798674:web:98aa03de354fadeb9ebc8b",
  measurementId: "G-Z737S61K9F",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
