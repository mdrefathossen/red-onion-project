import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import { Nav,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import  './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo2.png';
import { UserContex } from '../../App';


const Header = (props) => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContex);
    console.log(loggedInUser.displayName)
    return (
        
        <Nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <Container>
                <Link to="/" class="navbar-brand">
                    <img src={logo} alt=""/>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto">
                    <Link class="nav-link mt-2"><FontAwesomeIcon icon={faShoppingCart} /> <span className="text-danger">{props.cart.length}</span> </Link>
                    {
                        loggedInUser.displayName ? <Link className="nav-link mt-2"> {loggedInUser.displayName} </Link>
                        :
                        <Link to="/login" class="nav-item nav-link mt-2 text-danger" >Login</Link>
                    }
                         
                            {/* <FontAwesomeIcon icon={faUser} />  */}
                           
                        
                                { loggedInUser.email ? <button onClick={() => setLoggedInUser({})} type="button" class="btn btn-danger">Sign Out</button>
                            : <Link to="/login"><button  type="button" class="btn btn-danger">Sign In</button> </Link>  
                            }
                            
                        
                    </div>
                </div>
            </Container>
        </Nav>
      
    );
};

export default Header;