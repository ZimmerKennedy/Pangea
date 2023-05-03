import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePropertyAsync, fetchPropertiesAsync, selectProperties } from "./landlordSlices/fetchAllPropertiesSlice.js";
import styled from "styled-components";

import Sidebar from "../sidebar/Sidebar.jsx";

import DeleteIcon from '@mui/icons-material/Delete.js';

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

const PropertyBox = styled.div`
  background-color:white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  border: 1px solid black;
  height: 50vh;
  width: 50vw;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }
  box-shadow: 0px 0px 10px #1E56A0;
`;

const PropertyImage = styled.img`
  width: 20rem;
  height: 15rem;
`;
const PropertyAddress = styled.div`
  padding: 1rem;
  font-color: white;
`;


const DeleteSpan = styled.span`
position: absolute;
padding-left: 5rem;
padding-bottom: 1rem;
&:hover {
  cursor: pointer;
  color: red;
}
`;

const Properties = () => {
  const dispatch = useDispatch();
  const properties = useSelector(selectProperties);
  useEffect(() => {
    dispatch(fetchPropertiesAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePropertyAsync(id));
  };
  return (
    <GridContainer>
    <Sidebar />
    <Container>
      
        {properties &&
          Array.isArray(properties) &&
          properties.map((property) => {
            return (
              <PropertyBox key={property.id}>
                <PropertyAddress>{property.propertyName} 
                <DeleteSpan>
                  <DeleteIcon onClick={() => handleDelete(property.id)}/>
                  </DeleteSpan>
                  </PropertyAddress>
                <PropertyImage
                
                alt="image"
                />
                <PropertyAddress>{property.address}</PropertyAddress>
                <p>{property.numberOfUnits} Units</p>
              </PropertyBox>
            );
          })}
      
    </Container>
          
  </GridContainer>
  );
};

export default Properties;
