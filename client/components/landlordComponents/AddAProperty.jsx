import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty, getLandlordId } from "./landlordSlices/createProperty";
import { selectMe } from "../../auth/authSlice";
import styled from "styled-components";
import Sidebar from "../sidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";


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


const Box = styled.form`
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
const Input = styled.input`
margin: 10px 0;
padding: 10px;
width: 20vw;
font-size: 1.2em;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;


const Button = styled.button`
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

const CreateProperty = () => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [landlordId, setLandlordId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandlordId = async () => {
      const landlordId = await dispatch(getLandlordId(me.id));
      setLandlordId(landlordId);
    };
    fetchLandlordId();
  }, [dispatch, me.id]);

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!propertyName || !address) {
      alert("Missing Fields");
      return;
    }

    if (landlordId) {
      dispatch(
        createProperty(me.id, {
          propertyName,
          address,
          userId: me.id,
        })
        );
      }
      navigate('/dashboard')
  };
  

  return (
    <GridContainer >
      <Sidebar />

    <Container>
      <Box onSubmit={handleSubmit}>
        <Input
          type="text"
          id="propertyName"
          value={propertyName}
          onChange={handlePropertyNameChange}
          placeholder="Property Name"
          />
        <Input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Address"
          />
        <Button type="submit">Add Property</Button>
      </Box>
    </Container>
          </GridContainer>
  );
};

export default CreateProperty;
