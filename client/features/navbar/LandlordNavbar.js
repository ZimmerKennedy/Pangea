import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import './navbar.css'
import AuthForm from '../auth/AuthForm';

const LandlordNavbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div id='titleDiv'>
      <h1 id='title'>Welcome to Pangea</h1>
      <nav>
          <div id='navDiv'>
            {/* The navbar will show these links after you log in */}
            <Link className='navLinks' to="/dashboard">Home</Link>
            <Link className='navLinks' to="/tenants">Tenants</Link>
            <Link className='navLinks' to="/workorders">Work Orders</Link>
            <Link className='navLinks' to="/add-property">Add Property</Link>
            <Link className='navLinks' to="/add-unit">Add Unit</Link>
            <Link className='navLinks' to="/signup-landlord">Update Information</Link>
            <button id='logoutBtn' type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        {/* {isLoggedIn ? (
        ) : (
            )} */}
          <div>
            {/* The navbar will show these links before you log in */}
            {/* <AuthForm name="login" displayName="Login"/> */}
          </div>
      </nav>
      {/* <hr /> */}
    </div>
  );
};

export default LandlordNavbar;
