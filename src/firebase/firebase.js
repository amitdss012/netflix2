import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAqCP_q81XfFOZvSC6HhfORnGy0qOj_dBU",
  authDomain: "netflix-6e1bb.firebaseapp.com",
  projectId: "netflix-6e1bb",
  storageBucket: "netflix-6e1bb.appspot.com",
  messagingSenderId: "834853380653",
  appId: "1:834853380653:web:090060099aed341c5ccea4",

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
