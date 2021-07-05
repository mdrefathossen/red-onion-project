import React from 'react';
import { Container,Form,FormControl,Button } from 'react-bootstrap';
import './Banner.css'

const Banner = () => {
    return (
        <div className="banner">
        <Container className="d-flex justify-content-center">                               
            <div className=" mt-md-5 pt-md-5 mt-sm-5 pt-sm-5">
                <h2 className="mt-md-5">Best food is waiting for your belly</h2>
                <Form className="d-flex pt-md-3">
                    <FormControl type="text" placeholder="Search Food" />
                    <Button className="btn-danger" variant="danger">Search</Button>
                </Form>
            </div>
        </Container>
    </div>
    );
};

export default Banner;