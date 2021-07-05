import firebaseConfig from './firebase.config';
import firebase from 'firebase/app';
import 'firebase/auth';
export const initializeLoginFramWork = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}
const provider = new firebase.auth.GoogleAuthProvider();
export  const handalGoogleSingIn = () => {
   return firebase.auth().signInWithPopup(provider)
    .then(res =>{
        const {displayName,photoURL,email} = res.user;
        const signedInUser = {
            isSignedIn:true,
            name:displayName,
            photo:photoURL,
            email:email,
            success:true
        }
        return signedInUser
        // console.log(displayName,photoURL,email)
    })
    .catch(err => {
        // console.log(err);
        // console.log(err.message)
    })
 }
 export const handalSignOut = () => {
   return firebase.auth().signOut()
    .then(() => {
        const signOutuser = {
            isSignedIn:false,
            name:'',
            photo:'',
            email:'',
            error:'',
            success:false
        }
        return signOutuser
      })
    .catch((error) => {
        // An error happened.
      });
}
export const createUserEmailAndPassword = (name,email,password) => {
    return  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = "";
        newUserInfo.success = true;
        
        updateUserName(name)
        return newUserInfo;
       
      
    })
    .catch((error) => {
       
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
      // ..
    });
}
export const signInWtihEmailAndPassword = (email,password) => {
     return  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo
      
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
         
        }).then(() => {
        // Update successful
        console.log("User name update successfuly")
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        // console.log(error)
        });  
}