import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createMaintenanceRequest } from "./createMaintenanceRequestSlice";
import { fetchUnitsAsync, selectUnits } from "../units/unitsSlice";
import { useNavigate } from "react-router-dom";
import Sidebar from "../tenant/tenantSidebar/Sidebar.jsx";
import WO from "/public/38de0ff84859226f689e.jpeg"
import MaintenanceReq from "../tenant/maintenanceReq/MaintenanceReq.jsx";


const Container = styled.div`
display: flex;
flex-direction: row;
margin-left: 17vw;

`;

const FormWrapper = styled.div`
 flex: 6;
 width: 83vw;
 height: 98vh;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(200, 200, 200, 0.5)
  ), url(${WO});
background-size: cover;
background-repeat: no-repeat;
background-position: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f6f6;
  padding: 20px;
  opacity: 95%;
  width: 500px;
  margin: 20px auto;
  background-color: #f2f2f2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 60%;
  font-size: 1.2em;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #1e56a0;
  color: #fff;
  border: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    background-color: #163172;
    color: #f6f6f6;
  }
`;

const CreateMaintenanceRequest = () => {
  const dispatch = useDispatch();
  const units = useSelector(selectUnits);
  const [requestData, setRequestData] = useState({
    type: "",
    severity: "",
    description: "",
    unitId: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUnitsAsync());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMaintenanceRequest(requestData));
    navigate("/tenantHome");
  };

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
        <Sidebar />
      <FormWrapper>
    <MaintenanceReq />
    <Form onSubmit={handleSubmit}>
      <Select name="unitId" value={requestData.unitId} onChange={handleChange}>
        <option value>Select Unit Number</option>
        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.unitNumber}
          </option>
        ))}
      </Select>
      <Select name="severity" value={requestData.severity} onChange={handleChange}>
        <option value>Severity</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </Select>
      <Input
        type="text"
        name="type"
        value={requestData.type}
        placeholder="Type"
        onChange={handleChange}
        />
      <Input
        type="text"
        name="description"
        value={requestData.description}
        placeholder="Description"
        onChange={handleChange}
        />
      <Button type="submit">Submit Workorder</Button>
    </Form>
        </FormWrapper>
        </Container>
  );
};

export default CreateMaintenanceRequest;
