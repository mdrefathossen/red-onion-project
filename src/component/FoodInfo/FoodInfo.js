import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import FoodDetails from '../FoodDetails/FoodDetails';

const FoodInfo = (props) => {
    const {foodKey} = useParams();
    const food = fakeData.find(fd => fd.key === foodKey)
    return (
         <Container>
                <FoodDetails handalBtn={props.handalBtn} food={food}></FoodDetails>
         </Container>
    );
};

export default FoodInfo;