import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTenants,
  fetchTenantsAsync,
  deleteTenantAsync,
} from "./landlordSlices/fetchAllTenantsSlice";
import {
  selectProperties,
  fetchPropertiesAsync,
  deletePropertyAsync,
} from "./landlordSlices/fetchAllPropertiesSlice";
import {
  selectUnits,
  fetchUnitsAsync,
  deleteUnitAsync,
} from "./landlordSlices/fetchAllUnitsSlice";
import styled from "styled-components";
import Sidebar from "../sidebar/Sidebar.jsx";
import {
  fetchMaintenanceRequestsAsync,
  selectMaintenanceRequests,
  deleteMaintenanceRequestAsync,
} from "./landlordSlices/fetchAllMaintenanceRequestsSlice";

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

const Select = styled.select`
  width: 15rem;
  height: 3rem;
  border: 1px solid #d6e4f0;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 15px;
  background-color: #1e56a0;
  color: #fff;
  border-radius: 5px;
  border: none;
  width: 10rem;
  height: 3rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    background-color: #163172;
    color: #f6f6f6;
  }
`;

const Remove = () => {
  const tenants = useSelector(selectTenants);
  const units = useSelector(selectUnits);
  const properties = useSelector(selectProperties);
  const maintenanceRequests = useSelector(selectMaintenanceRequests);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTenantsAsync());
    dispatch(fetchPropertiesAsync());
    dispatch(fetchUnitsAsync());
    dispatch(fetchMaintenanceRequestsAsync());
  }, [dispatch]);

  const [selectedProperty, setSelectedProperty] = useState();
  const [selectedTenant, setSelectedTenant] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const [selectedMaintenanceRequest, setSelectedMaintenanceRequest] =
    useState();

  const handleDeleteTenant = (id) => {
    dispatch(deleteTenantAsync(id));
    dispatch(fetchTenantsAsync());
    window.location.reload(false);
  };

  const handleDeleteUnit = (id) => {
    dispatch(deleteUnitAsync(id));
    dispatch(fetchUnitsAsync());
    window.location.reload(false);
  };

  const handleDeleteProperty = (id) => {
    dispatch(deletePropertyAsync(id));
    dispatch(fetchPropertiesAsync());
    window.location.reload(false);
  };

  const handleDeleteMaintenanceRequest = (id) => {
    dispatch(deleteMaintenanceRequestAsync(id));
    dispatch(fetchMaintenanceRequestsAsync());
    window.location.reload(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProperty) handleDeleteProperty(selectedProperty);
    if (selectedTenant) handleDeleteTenant(selectedTenant);
    if (selectedUnit) handleDeleteUnit(selectedUnit);
    if (selectedMaintenanceRequest)
      handleDeleteMaintenanceRequest(selectedMaintenanceRequest);
  };

  return (
    <GridContainer>
      <Sidebar />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Select onChange={(e) => setSelectedProperty(e.target.value)}>
            <option value="">Select Property</option>
            {Array.isArray(properties)
              ? properties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.propertyName}
                  </option>
                ))
              : null}
          </Select>
          <Button type="submit">Delete Property</Button>

          <Select onChange={(e) => setSelectedTenant(e.target.value)}>
            <option value="">Select Tenant</option>
            {tenants && Array.isArray(tenants)
              ? tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))
              : null}
          </Select>
          <Button type="submit">Delete Tenant</Button>

          <Select onChange={(e) => setSelectedUnit(e.target.value)}>
            <option value="">Select Unit#</option>
            {units && Array.isArray(units)
              ? units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.unitNumber}
                  </option>
                ))
              : null}
          </Select>
          <Button type="submit">Delete Unit</Button>

          <Select
            onChange={(e) => setSelectedMaintenanceRequest(e.target.value)}
          >
            <option value="">Select Work Order</option>
            {maintenanceRequests && Array.isArray(maintenanceRequests)
              ? maintenanceRequests.map((maintenanceRequest) => (
                  <option
                    key={maintenanceRequest.id}
                    value={maintenanceRequest.id}
                  >
                    {maintenanceRequest.description}
                  </option>
                ))
              : null}
          </Select>
          <Button type="submit">Delete Work Order</Button>
        </Form>
      </Container>
    </GridContainer>
  );
};

export default Remove;
