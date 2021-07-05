import React, { useContext, useState } from 'react';

 
import './Login.css';
import { UserContex } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserEmailAndPassword, handalGoogleSingIn, handalSignOut, initializeLoginFramWork, signInWtihEmailAndPassword } from './LoginManager';

// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//  }
const Login = () => {
    const [newUser,setNewUser] = useState(false)
    const [user,setUser] = useState({
        isSignedIn:false,
        
        name:' ',
        photo:' ',
        email:' ',
        password:''
    });
    initializeLoginFramWork();
    const [loggedInUser,setLoggedInUser] = useContext(UserContex)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const googleSingIn = () => {
      handalGoogleSingIn()
      .then(res => {
        handalRespons(res,true)
      })
    }
    const signOut = () => {
      handalSignOut()
      .then(res => {
        handalRespons(res,false)
      })
    }

     
    
   
    
    const handalChange = (e) => {
      // console.log(e.target.name,e.target.value)
      let isFieldValid = true;
      if(e.target.name ===  'email'){
        isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        // console.log(isEmailValid)
      }
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value)
        isFieldValid= isPasswordValid && passwordHasNumber
      }
      if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo)
      }
    }
    const handalSubmit = (e) => {
        if(newUser && user.email && user.password){
          createUserEmailAndPassword(user.name,user.email,user.password)
          .then(res =>{
            handalRespons(res,true)

          })
           

        }
    if(!newUser && user.email && user.password){
     signInWtihEmailAndPassword(user.email,user.password)
     .then(res =>{
      handalRespons(res,true)

    })
    }
        e.preventDefault();

    }
    const handalRespons = (res,redirect) => {
            setUser(res);
            setLoggedInUser(res)
            if(redirect){
              history.replace(from);
            }
    }
   
    
    return (
        <div className="login">
        {
           user.isSignedIn ? <button onClick={signOut} >Sign Out</button> :
            <button className="btn-danger" onClick={googleSingIn}>Sign In With Google</button>

        }
        
         {
             user.isSignedIn && <p>Welcome to {user.name}</p>
         }
         <h2>Our Own Authentication</h2>
          
         <form className="input-form" onSubmit={handalSubmit}>
             <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
             <label htmlFor="newUser">New User Sign Up</label>
             <br />
          { newUser && <input className="input-field" name="name" onBlur={handalChange} type="text" placeholder="Enter Your Name" />}
          <br/>
         <input type="text" className="input-field" name="email" onBlur={handalChange} placeholder="Enter Your Email" required />
         <br />
         <input type="password" className="input-field" onBlur={handalChange} name="password" id="" placeholder="Enter your Password" required />
         <br/>
         <input type="submit" className="input-field" value={ newUser ? "Sign Up" : "Sign In"}  />
         </form>
         <p style={{color:'red'}}>{user.error} </p>
         { user.success &&  <p style={{color:'green'}}> User {newUser ? 'Create' : 'Logged in'} Successfully </p>  
         
         }
         
         </div>
         
    );
};

export default Login;