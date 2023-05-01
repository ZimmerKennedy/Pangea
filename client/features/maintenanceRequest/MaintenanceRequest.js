import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaintenanceRequestsAsync,
  selectMaintenanceRequests,
  deleteMaintenanceRequestAsync
} from "./allMaintenanceRequestSlice";
import { Link, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {FaHome} from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';

const WorkOrdersContainer = styled.div`
display:flex;
height: 98vh;
margin-left: 17vw;
width: 83vw;
justify-content: center;
flex-direction: row
background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);
`;

const WorkOrderItems = styled.div`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 7rem;
`;

const WorkOrderFont = styled.p`
  font-size: 24px;
  margin: 10px;
  font-weight: bold;
  color: black;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }
  animation: ${fadeIn} 1s;
`;

const WorkOrdersSection = styled.section`
  background: linear-gradient(
    90deg,
    rgba(246, 246, 246, 1) 0%,
    rgba(214, 228, 240, 1) 44%,
    rgba(30, 86, 160, 1) 79%,
    rgba(22, 49, 114, 1) 99%
  );
  flex: 7;
  width: 50%;
  padding: 20px;

  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`;
const Deletebtn = styled.span`
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const MaintenanceRequest = () => {

  const maintenanceRequests = useSelector(selectMaintenanceRequests);
  const dispatch = useDispatch();

  // filter for workorders 
  const [holdRequest, setHoldRequest] = useState([])
  const urlParams = useParams()
  

  useEffect(() => {
    dispatch(fetchMaintenanceRequestsAsync());

  }, [dispatch]);

  const handleDelete = async (maintenanceRequestId) =>{
    dispatch(deleteMaintenanceRequestAsync(maintenanceRequestId));
    dispatch(fetchMaintenanceRequestsAsync());
  }
  // checking url for unit id and filter workorders by unit id
  useEffect(() => {
  if('id' in urlParams){
    setHoldRequest(maintenanceRequests.filter((request) => {
      return request.unit && (request.unit.id === urlParams.id)
    }))
  } else{
    setHoldRequest(maintenanceRequests)
  }
},[maintenanceRequests])


  return (
    <WorkOrdersContainer>
      <Sidebar />
      <WorkOrdersSection>
        {maintenanceRequests.map((maintenanceRequest) => (
          <WorkOrder
          key={maintenanceRequest.id}
          className={`
          ${
            maintenanceRequest.severity.toLowerCase().charAt(0) === "l"
            ? ""
            : maintenanceRequest.severity.toLowerCase().charAt(0) === "m"
            ? "medium-severity"
            : "high-severity"
          }
          `} 
          >
            <WorkOrderItems>
          <FaHome /># {maintenanceRequest.unitId}
            <Link to={`/workorders/${maintenanceRequest.id}`}>
              
            <WorkOrderFont>Priority: {maintenanceRequest.severity}</WorkOrderFont>
            <WorkOrderFont>Type: {maintenanceRequest.type}</WorkOrderFont>
            </Link>
        </WorkOrderItems>
        <Deletebtn onClick={() => handleDelete(maintenanceRequest.id)}><DeleteIcon /></Deletebtn>
          </WorkOrder>
        ))}
      </WorkOrdersSection>
    </WorkOrdersContainer>
  );
};

export default MaintenanceRequest;