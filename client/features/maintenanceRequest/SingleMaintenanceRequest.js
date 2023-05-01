import React, { useEffect } from "react";
import {
  fetchSingleMaintenanceRequestAsync,
  selectMaintenanceRequest,
} from "./singleMaintenanceRequestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar.jsx";


const WorkOrdersContainer = styled.div`
display:flex;
height: 98vh;
margin-left: 17vw;
width: 83vw;
justify-content: center;
align-items: center;
flex-direction: row
background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);
`;

const WorkOrderItems = styled.div`

flex: 7;
width: 50%;
padding: 20px;


margin-top: 30px;
display: flex;
flex-wrap: wrap;
justify-content: center;
overflow: auto;
`;


const WorkOrder = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background-color: #eee;
  box-shadow: 4px 4px 20px rgba(1, 2, 3, 0.2);
  &.medium-severity {
    background-color: #f9a51a;
  }
  &.high-severity {
    background-color: #f92a2a;
  }
`;

const Button = styled.button `
background-color: #163172;
color: #fff; 
padding: 10px 20px; 
border-radius: 5px;
border: none; 
font-size: 1rem;
font-weight: bold;
&:hover { background-color: #1e56a0; cursor: pointer; }
`;


const SingleMaintenanceRequest = () => {
const maintenanceRequest = useSelector(selectMaintenanceRequest)
const {id} = useParams()
const dispatch = useDispatch();

useEffect(() =>{
  dispatch(fetchSingleMaintenanceRequestAsync(id))
},[dispatch]);
console.log(`maintenanceRequest`,maintenanceRequest)
return (
  <WorkOrdersContainer>
    <Sidebar />
    <WorkOrderItems>
      <WorkOrder>
      <p>Unit#:{maintenanceRequest.unitId}</p>
      <p>Type: {maintenanceRequest.type}</p>
      <p>Severity: {maintenanceRequest.severity}</p>
        <p>{maintenanceRequest.description}</p>
      <Button> Respond </Button>
      <p>Submitted on: {new Date(maintenanceRequest.creationDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')}</p>
      </WorkOrder>
    </WorkOrderItems>
  </WorkOrdersContainer>
);
};

export default SingleMaintenanceRequest;