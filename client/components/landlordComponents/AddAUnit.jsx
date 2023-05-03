import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUnit } from "./landlordSlices/createUnit";
import styled from "styled-components";
import {
  selectProperties,
  fetchPropertiesAsync,
} from "./landlordSlices/fetchAllPropertiesSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.jsx";

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
const Select = styled.select`
  width: 15rem;
  height: 3rem;
  border: 1px solid #d6e4f0;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const UnitForm = () => {
  const navigate = useNavigate();
  const [unit, setUnit] = useState({
    unitNumber: "",
    bedrooms: "",
    propertyId: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPropertiesAsync()).then(() => {});
  }, [dispatch]);

  const properties = useSelector(selectProperties);

  const handleChange = (event) => {
    setUnit({ ...unit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUnit({ ...unit }));
    navigate("/tenantHome");
  };

  return (
    <GridContainer>
      <Sidebar />
      <Container>
        <Box onSubmit={handleSubmit}>
          <Input
            type="text"
            name="unitNumber"
            value={unit.unitNumber}
            onChange={handleChange}
            placeholder="Unit#"
          />
          <Input
            type="number"
            name="bedrooms"
            value={unit.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
          />
          <div>
            <Select
              name="propertyId"
              value={unit.propertyId}
              onChange={handleChange}
            >
              <option value="">Select Property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.propertyName}
                </option>
              ))}
            </Select>
          </div>
          <Button type="submit">Create Unit</Button>
        </Box>
      </Container>
    </GridContainer>
  );
};

export default UnitForm;
