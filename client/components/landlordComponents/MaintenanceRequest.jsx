import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMaintenanceRequestsAsync,
  selectMaintenanceRequests,
  deleteMaintenanceRequestAsync,
} from "./landlordSlices/fetchAllMaintenanceRequestsSlice";
import { Link, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Sidebar from "../sidebar/Sidebar.jsx";
import { FaHome } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-areas: "sidebar main";
  height: 100vh;
  width: 100vw;
`;

const WorkOrdersContainer = styled.div`
  grid-area: main;
  height: 100%;
  background: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WorkOrderFont = styled.p`
  font-size: 24px;
  margin: 10px;
  font-weight: bold;
  color: black;
`;

const WorkOrder = styled.div`
  background-color: white;
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
  box-shadow: 0px 0px 10px #1e56a0;
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
  const [holdRequest, setHoldRequest] = useState([]);
  const urlParams = useParams();

  useEffect(() => {
    dispatch(fetchMaintenanceRequestsAsync());
  }, [dispatch]);

  const handleDelete = async (maintenanceRequestId) => {
    dispatch(deleteMaintenanceRequestAsync(maintenanceRequestId));
    dispatch(fetchMaintenanceRequestsAsync());
  };
  // checking url for unit id and filter workorders by unit id
  useEffect(() => {
    if ("id" in urlParams) {
      setHoldRequest(
        maintenanceRequests.filter((request) => {
          return request.unit && request.unit.id === urlParams.id;
        })
      );
    } else {
      setHoldRequest(maintenanceRequests);
    }
  }, [maintenanceRequests]);

  return (
    <GridContainer>
      <Sidebar />
      <WorkOrdersContainer>
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
            <FaHome /># {maintenanceRequest.unitId}
            <Link to={`/workorders/${maintenanceRequest.id}`}>
              <WorkOrderFont>
                Priority: {maintenanceRequest.severity}
              </WorkOrderFont>
              <WorkOrderFont>Type: {maintenanceRequest.type}</WorkOrderFont>
            </Link>
            <Deletebtn onClick={() => handleDelete(maintenanceRequest.id)}>
              <DeleteIcon />
            </Deletebtn>
          </WorkOrder>
        ))}
      </WorkOrdersContainer>
    </GridContainer>
  );
};

export default MaintenanceRequest;
