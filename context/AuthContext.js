import React, { useState, useEffect, useRef, useContext } from 'react';
import { auth, db } from '../pages/api/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setloading] = useState(null);
  const userInfo = useRef();

  const login = (e, inputs) => {
    e.preventDefault();
    return signInWithEmailAndPassword(auth, inputs.email, inputs.password);
  }

  const signup = (e, inputs) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
    return
  }
  const logout = () => {
    return signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      setloading(false)
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    userInfo
  }
  return (
    <AuthContext.Provider value={value} >
      {!loading && children}
    </AuthContext.Provider>
  )

}