import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
// import firebaseConfig from './firebase';
import firebaseConfig from './firebase.config';
import { useState, createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuthentication = () => useContext(AuthContext);

const Auth = () => {
    const [user, setUser] = useState(null);

    const signInUser = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                setUser(response.user);
                window.history.back(); 
                return response.user;
        })
        .catch(err=> setUser({error: err.message}))
    };

    const createUser = (email, password, name) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            firebase.auth().currentUser.updateProfile({
                displayName: name,
                email: email
            }).then(() => {
                setUser(res.user);
                window.history.back(); 
            });
        })
        .catch(err=> setUser({error: err.message}))
    }

    const signOut = () => {
        return firebase.auth().signOut()
        .then(() => {
            setUser(false);
        })
    };

    useEffect(() => {
        const currUser = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } 
            else {
                setUser(false);
            }
        });    
        return () => currUser();
    }, []);

    return{
        user,
        signInUser,
        createUser,
        signOut
    };
}

export default Auth;