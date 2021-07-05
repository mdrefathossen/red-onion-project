import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContex } from '../../App';
import delivery1 from '../../images/Image/Group 1151.png';
import delivery2 from '../../images/Image/Group 1152.png';
import MapContainer from '../MapContainer/MapContainer';
import './FoodDelivery.css'

const FoodDelivery = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContex);
    const time = new Date().toLocaleString();
    return (
         <Container className="py-5">
             <Row>
                 <Col className="map" md={7}>
                     <MapContainer></MapContainer>
                 </Col>
                 <Col md={4} className="delivery-place ml-md-5 my-sm-3 my-xs-3">
                     <div>
                         <img src={delivery1} className="delivery-img  my-md-3 ml-md-4" alt="" />
                         <div className="delivery-address p-2">
                            <h6>Your Location</h6>
                            <p className="text-muted">Sodor Dinajpur</p>
                            <h6>Shop Address</h6>
                            <p className="text-muted">Lilir Mor</p>
                        </div>
                        <div>
                            <p className="mt-md-3"> <b>Delivery Time</b>: {time}</p>
                        </div>
                        <div className="d-flex align-items-center oder-person p-2 my-md-2">
                            <img className="delivery-image" src={delivery2} alt=""/>
                            {
                                loggedInUser.displayName  ? 
                                <h6>{loggedInUser.displayName}</h6>
                                :
                                <p>Can't find any user</p>
                            }
                        </div>
                        <button className="btn-danger btn-block my-md-4">Contact</button>
                     </div>

                 </Col>
             </Row>

         </Container>
    );
};

export default FoodDelivery;