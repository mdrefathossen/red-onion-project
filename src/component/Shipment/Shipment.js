 
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import FoodOrder from '../FoodOrder/FoodOrder';
import './Shipment.css'


const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [cart,setCart] = useState([]);

    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
    useEffect(() => {
        const saveCart = getDatabaseCart();
        const foodkey = Object.keys(saveCart);
        const foodItem = foodkey.map(key => {
            const food =fakeData.find(fd => fd.key === key);
            food.quantity = saveCart[key];
            return food
        })
        setCart(foodItem);
        console.log(foodItem)
    },[]);
    const removeFood = (foodKey) => {
        const newCart = cart.filter(fd => fd.key !== foodKey);
        setCart(newCart);
        removeFromDatabaseCart(foodKey)
    }
    let history = useHistory()
    const handlePlaceOrder = () =>{
        history.push("/delivery");
    }
    const total = cart.reduce((total,food) => total + food.price * food.quantity,0);
    const tax = total/10;
    const deliveryFee = total/8;
    const grandTotal = total + tax + deliveryFee;
    const formatNumber = num => {
        const number = Number(num.toFixed(2));
        return number;
    }
    return (
        <Container>
            <Row>
                <Col md={5} className="my-5 pt-5">
                    <h2>Delivery Information</h2>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
         
        <input {...register("name", { required: true })} />
       {errors.name && <span className="error">This Name field is required</span>}
       <input {...register("email", { required: true })} />
       {errors.email && <span className="error">This Email field is required</span>}
       <input {...register("address", { required: true })} />
       {errors.address && <span className="error">This Address field is required</span>}
        
        <input type="submit" />
      </form>
                
                </Col>
                <Col md={7} className="d-flex justify-content-center py-4">
                    <div>
                    <p>From <b>Dinajpur</b>, to Birol. Arriving in 20-30 min.</p>
                    {
                            cart.map(fd=> <FoodOrder removeFood={removeFood} key={fd.key} food={fd} cart={cart}></FoodOrder>)
                        }
                         <p>Subtotal : ${formatNumber(total)}</p>
                        <p>Tax : ${formatNumber(tax)}</p>
                        <p>Delivery Fee : ${formatNumber(deliveryFee)}</p>
                        <h5>Total : ${formatNumber(grandTotal)}</h5>
                        <button onClick={handlePlaceOrder}   className="btn-danger btn-place-order mt-3 btn-block">Place Order</button> 
                         
                    </div>
                </Col>
            </Row>
        </Container>
    )
      
      

};

export default Shipment;