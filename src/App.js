import fakeData from './fakeData';
import Header from './component/Header/Header';
import Banner from './component/Banner/Banner';
import FoodContainer from './component/FoodContainer/FoodContainer';
import React, { useState,useEffect, createContext } from 'react';
import FoodInfo from './component/FoodInfo/FoodInfo';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';


import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { addToDatabaseCart, getDatabaseCart } from './utilities/databaseManager';
import PrivatRoute from './component/PrivatRoute/PrivatRoute';
import FoodDelivery from './component/FoodDelivery/FoodDelivery';

export const UserContex = createContext();

function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  const [cart,setCart] = useState([]);
  console.log(cart.length)

   useEffect(() => {
     const saveCart = getDatabaseCart;
     const foodKey = Object.keys(saveCart);
     const foodItem = foodKey.map(key => {
       const food = fakeData.find(fd => fd.key === key);
       food.quantity = saveCart[key];
       return food;
     })
     setCart(foodItem);
   },[])

  const handalFoodCart = (food) => {
    // const sameFood = cart.find(fd => fd.key === food.key);
    // let count = 1;
    // let newCart;
    // if(sameFood){
    //   count = sameFood.quantity + 1;
    //   sameFood.quantity = count;
    //   const other = cart.filter(fd => fd.key!== food.key);
    //   newCart = [...other,sameFood];
    // }
    // else{
    //   food.quantity = 1;
    //   newCart = [...cart,food];
    // }
    // setCart(newCart);
    // addToDatabaseCart(food.key,count)

    console.log(food)
  }
  const handalBtn = (food) =>{
    const sameFood = cart.find(fd => fd.key === food.key);
    let count = 1;
    let newCart;
    if(sameFood){
      count = sameFood.quantity + 1;
      sameFood.quantity = count;
      const other = cart.filter(fd => fd.key!== food.key);
      newCart = [...other,sameFood];
    }
    else{
      food.quantity = 1;
      newCart = [...cart,food];
    }
    setCart(newCart);
    addToDatabaseCart(food.key,count)
    
    
  }
  console.log(cart.name)
 
 

  return (
    <UserContex.Provider value={[loggedInUser,setLoggedInUser]}>
      <h1>email: {loggedInUser.email}</h1>
     <Router>
       <Switch>
       <Route path="/login">
            <Header cart={cart}></Header>
            <Login></Login>
            
          </Route>
          <Route exact path="/">
              <Header cart={cart}></Header>
              <Banner></Banner>
              <FoodContainer  cart={cart}></FoodContainer>
              
             
          </Route>
          <Route path="/food/:foodKey">
              <Header cart={cart}></Header>
              <FoodInfo handalBtn={handalBtn}></FoodInfo>

              
          </Route>
          <Route path="/login">
            
          </Route>
          <PrivatRoute path="/shipment">
              <Header cart={cart}></Header>
              <Shipment></Shipment>
          
          </PrivatRoute>
          <Route path="/delivery">
          <Header cart={cart}></Header>
            <FoodDelivery></FoodDelivery>
          </Route>

       </Switch>
     </Router>
     </UserContex.Provider>
     
  );
}

export default App;
