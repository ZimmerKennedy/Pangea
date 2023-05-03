import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { updateTenant} from './tenantSlices/updateTenant';
import { selectMe } from '../../auth/authSlice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TenantSidebar from './TenantSidebar.jsx'


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
  align-items: center;
  background-color: #F6F6F6;
  opacity: 95%;
  padding: 20px;
  width: 500px;
  margin: 20px auto;
  background-color: #f2f2f2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 60%;
  font-size: 1.2em;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #1E56A0;
  color: #fff; 
  font-size: 1.2em;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #163172;
    color: #F6F6F6;
  }
`;

const AfterSignUpTenant = () => {
  const me = useSelector(selectMe)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idForTenantToAssociate, setIdForTenantToAssociate] = useState('');
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTenant(me.id, {
      name,
      dateOfBirth,
      phoneNumber,
      email,
      idForTenantToAssociate
    }));
    navigate('/tenantHome')
  };

  return (
    <GridContainer>
      <TenantSidebar />
      
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
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          placeholder="Date of Birth"
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
          placeholder="Unique ID from Landlord"
          />   
          <StyledButton type="submit">Update</StyledButton>
          </StyledForm>

          </Container>
          </GridContainer>
  )
}

export default AfterSignUpTenant