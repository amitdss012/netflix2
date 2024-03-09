import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setDoc(doc(db, "users", email), {
          email: email,
          password: password,
          likedMovies: [],
        });
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }
  return (
    <authContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
}

export function UserAuth() {
  return useContext(authContext);
}
