import React,{useContext} from 'react';
import { AuthContext } from '../context/auth';
import {Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const PrivateRoute = () => {
    const User = useContext(AuthContext);
    return (
         User ? <Profile/>: <Navigate to={<Login/>}/>        
    );
};

export default PrivateRoute;
