import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLandlord } from './landlordSlices/updateLandlord';
import { selectMe } from "../../auth/authSlice";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../sidebar/Sidebar.jsx';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-areas: "sidebar main";
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  grid-area: main;
  height: 100%;
  background: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  margin: 10%;
  align-self: center;
  background-color: #fff;
  box-shadow: 0px 0px 10px #1e56a0;
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

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [idForTenantToAssociate, setIdForTenantToAssociate] = useState('');
  const navigate = useNavigate();


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

  return (
    <GridContainer> 

      <Sidebar />
    <Container>
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
        <StyledButton type="submit">Update Profile</StyledButton>
      </StyledForm>
    </Container>
          </GridContainer>
  );
};

export default UpdateLandlordForm
