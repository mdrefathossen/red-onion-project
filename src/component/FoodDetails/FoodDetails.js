import React, { useState } from 'react';
import { Button,Col,Container,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown,faShippingFast } from '@fortawesome/free-solid-svg-icons';
import './FoodDetails.css';
import { useHistory} from 'react-router-dom';

const FoodDetails = (props) => {
    const {image,name,foodDescription, price} = props.food;
    const history = useHistory()
    const handalShipment = () => {
        history.push('/shipment');
    }
    
    const [quantity, setQuantity] =useState(1);
    const handleQuantity = (sign) => {
        const currentQuantity = quantity;
        let newQuantity;
        if(sign === '+'){
            newQuantity = currentQuantity + 1
        }
        else{
            newQuantity = currentQuantity > 1 ? currentQuantity - 1 : currentQuantity;
        }
        setQuantity(newQuantity);
    }
    const formatNumber = num =>{
        const number = Number(num.toFixed(2));
        return number;
    }
    return (
        <Container className="my-5 pt-5">
        <Row>
            <Col md={6}>
                <h1 className="py-2">{name}</h1>
                <p>{foodDescription}</p>
                <div className="d-flex">
                    <h3>${formatNumber(price*quantity)}</h3>
                    <div className="main-btn p-1 ml-md-5">
                        <button className="btn-type minus" onClick={()=>handleQuantity('-')}>-</button>
                        <input className="count-field text-center" type='text' value={quantity} disabled></input>
                        <button className= "btn-type plus" onClick={()=>handleQuantity('+')}>+</button>
                    </div>
                </div>
                <p className="pt-3">Selected Item: {quantity}</p>
                <div className="d-flex pt-3">
                    
                        <Button onClick={() => props.handalBtn(props.food) }  className="btn btn-danger"> <FontAwesomeIcon icon={faCartArrowDown} /> Add</Button>
                    
                    {/* <Link to="/shipment"> */}
                        <Button onClick={handalShipment} className="btn btn-danger ml-4"><FontAwesomeIcon icon={faShippingFast} /> Shipment</Button>
                    {/* </Link> */}
                </div>
            </Col>
            <Col md={6}>
                <img src={image} className="image-fluid display-img" alt=""/>
            </Col>
        </Row>
    </Container>
    );
};

export default FoodDetails;