import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const googleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser]=useState()
    const [loading,setLoading]=useState(true)

    const userRegister=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const userlogin=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
console.log(user);

    // log out
    const signout = () => {
    setLoading(true);
    return signOut(auth);
  };

// user set
      useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);
  
  const updateUser=(profile)=>{
    return updateProfile(auth.currentUser,profile)
  }
    const userInfo={
        userRegister,
        userlogin,
        googleLogin,
        user,
        loading,
        signout,
        updateUser
    

    }
    return (
        <AuthContext value={userInfo}>

            {children}

        </AuthContext>
    );
};

export default AuthProvider;
