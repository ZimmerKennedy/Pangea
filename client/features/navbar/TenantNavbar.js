import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import './navbar.css'
import AuthForm from '../auth/AuthForm';
import accountIcon from './accountIcon.png'

const TenantNavbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1 id='title'>Welcome to Pangea</h1>
      <nav>
        {isLoggedIn ? (
          <div id='navDiv'>
            {/* The navbar will show these links after you log in */}
            <Link className='navLinks' to="/home">Home</Link>
            <Link className='navLinks' to="/tenant">Submit Work Order</Link>
            <Link className='navLinks' to="/pastdue">Contact</Link>
            <Link className='navLinks' to="/chat">Make A Payment</Link>
            <button id='logoutBtn' type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
            <img id='accountIcon' src={accountIcon} alt='AccountIcon'/>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div id='loginBtns'>
            <button className='landtenBtns'>Landlords</button>
            <button className='landtenBtns'>Tenants</button>
            </div>
            {/* <AuthForm name="login" displayName="Login"/> */}
            <div id='loginDiv'>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default TenantNavbar;