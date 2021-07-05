import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContex } from '../../App';

 

const PrivatRoute = ({children,...rest}) => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContex)
    return (
        <Route
        {...rest}
        render={({ location }) =>
          loggedInUser.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivatRoute;