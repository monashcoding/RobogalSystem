// Reference: https://www.youtube.com/watch?v=ZmpO65DhRN0&ab_channel=SairajChouhan
/*
This File has the Firebase authentication processes
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        const userDoc = doc(db, "users", currUser.uid);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          const userRole = userDocSnap.get("role");
          setUser({
            uid: currUser.uid,
            email: currUser.email,
            displayName: currUser.displayName,
            role: userRole,
          });
        } else {
          setUser({
            uid: currUser.uid,
            email: currUser.email,
            displayName: "",
            role: "user",
            ownedSessionList: [],
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
