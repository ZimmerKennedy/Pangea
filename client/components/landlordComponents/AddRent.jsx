import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRentAsync } from "./landlordSlices/fetchAllRentsSlice";
import {
  selectTenants,
  fetchTenantsAsync,
} from "./landlordSlices/fetchAllTenantsSlice";
import styled from "styled-components";
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

const Form = styled.form`
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
const AddRent = () => {
  const [price, setPrice] = useState("");
  const [tenantId, setTenantId] = useState("");
  const dispatch = useDispatch();
  const tenants = useSelector(selectTenants);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(addRentAsync({ rentAmount: price, tenantId }));
    setPrice("");
  };

  const handleChange = (e) => {
    setTenantId(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTenantsAsync());
  }, [dispatch]);

  return (
    <GridContainer>
      <Sidebar />
      <Container>
        <Form onSubmit={onSubmit}>
          <h1>Create rent</h1>
          <p>Fill out this form to create a new rent amount.</p>
          <Select name="tenantId" value={tenantId} onChange={handleChange}>
            <option>Select Tenant</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </Select>
          <label>Rent Price</label>
          <Input
            type="number"
            name="price"
            placeholder="$"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <Button>Submit</Button>
        </Form>
      </Container>
    </GridContainer>
  );
};

export default AddRent;
