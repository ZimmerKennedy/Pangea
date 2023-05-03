import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUnits,
  fetchUnitsAsync,
} from "./landlordSlices/fetchAllUnitsSlice";
import {
  selectTenants,
  fetchTenantsAsync,
} from "./landlordSlices/fetchAllTenantsSlice";
import { associateTenantWithUnit } from "./landlordSlices/associateTenantWithUnit";
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

const Label = styled.label`
  margin: 10px 0;
  padding: 10px;
  width: 20rem;
  font-size: 1.2em;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Select = styled.select`
  width: 10rem;
  height: 3rem;
  border: 1px solid #d6e4f0;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
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

function NewTenant() {
  const unit = useSelector(selectUnits);
  const tenant = useSelector(selectTenants);
  const navigate = useNavigate();
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [selectedTenantId, setSelectedTenantId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUnitsAsync());
    dispatch(fetchTenantsAsync());
  }, [dispatch]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      associateTenantWithUnit({
        unitId: selectedUnitId,
        tenantId: selectedTenantId,
      })
    );
    navigate("/dashboard");
  }
  return (
    <GridContainer>
      <Sidebar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Label>
            Tenant Name:
            <Select
              value={selectedTenantId || ""}
              onChange={(e) => setSelectedTenantId(e.target.value)}
            >
              <option value="">Tenants</option>
              {tenant.map((aTenant) => (
                <option key={aTenant.id} value={aTenant.id}>
                  {aTenant.name}
                </option>
              ))}
            </Select>
          </Label>

          <Label>
            Select Unit#:
            <Select
              value={selectedUnitId || ""}
              onChange={(e) => setSelectedUnitId(e.target.value)}
            >
              <option value="">Units</option>
              {unit.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.unitNumber}
                </option>
              ))}
            </Select>
          </Label>

          <Button type="submit">Add Tenant</Button>
        </Form>
      </Container>
    </GridContainer>
  );
}

export default NewTenant;
