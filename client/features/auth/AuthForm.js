import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../app/store';
import './auth.css';
import pangeaLogo from "../../../public/pangeaLogo.png";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    if (!username || !password ) {
      alert("Please fill out all fields");
      return;
      }
      
    dispatch(authenticate({ username, password, method: formName }));
    
    navigate('/dashboard')
  };

  const handleNav = () => {
    navigate('/signup')
  }

  return (
    <div id='home'>
      <div id="logoContainer">
        <img src={pangeaLogo} alt="Pangea Logo" id="pangeaLogo" draggable="false"/>
      </div>
      <form id='loginForm' onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div id='loginDiv'>
          <button className='loginBtns' type="submit">{displayName}</button>
        </div>
        <div>
          New to Pangea?
          <a href="/signup" className="sign-in-link">Sign Up</a>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;