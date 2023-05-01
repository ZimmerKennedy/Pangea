import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLandlord } from './afterSignUpLandlordSlice';
import { selectMe } from "../auth/authSlice";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/sidebar/Sidebar.jsx';

const Container = styled.div`
display:flex;
height: 98vh;
margin-left: 17vw;
width: 83vw;
justify-content: center;
flex-direction: row
background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);

;`

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: auto;
height:auto;
margin: 10%;
align-self: center;
background-color: #fff;
box-shadow: 0px 0px 10px #1E56A0;
border-radius: 1rem;
padding: 5rem;
&:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}
`;

const StyledInput = styled.input`
margin: 10px 0;
padding: 10px;
width: 20vw;
font-size: 1.2em;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button`
margin-top: 20px;
padding: 10px 20px;
font-size: 18px;
background-color: #1e56a0;
color: #fff;
border-radius: 5px;
border: none;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
cursor: pointer;
&:hover {
  background-color: #163172;
  color: #f6f6f6;
}
`;




const UpdateLandlordForm = () => {
  const me = useSelector(selectMe)
  console.log(`me`, me)
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [idForTenantToAssociate, setIdForTenantToAssociate] = useState('');
  const navigate = useNavigate();


  // const [showAddAProperty, setShowAddAProperty] = useState(false);


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdForTenantToAssociateChange = (event) => {
    setIdForTenantToAssociate(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLandlord(me.id, {
      name,
      phoneNumber,
      email,
      idForTenantToAssociate,
      address
    }));
    navigate('/dashboard')
  };

  // const handleClick = () => {
  //   setShowAddAProperty(true);
  // };
  return (
    <Container>
      <Sidebar />
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <StyledInput
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="Phone Number"
        />
        <StyledInput
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <StyledInput
          type="number"
          name="idForTenantToAssociate"
          value={idForTenantToAssociate}
          onChange={handleIdForTenantToAssociateChange}
          placeholder="ID for Tenant to Associate"
        />
        <StyledInput
          type="text"
          name="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Address"
        />
        <StyledButton type="submit">Update Landlord</StyledButton>
      </StyledForm>
      {/* <StyledAddAPropertyButton onClick={handleClick}>Add Property</StyledAddAPropertyButton>
      {showAddAProperty && <AddAProperty />} */}
    </Container>
  );
};

export default UpdateLandlordForm
