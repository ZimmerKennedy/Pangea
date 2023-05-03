import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUnitAsync,
  fetchUnitsAsync,
  selectUnits,
} from "./landlordSlices/fetchAllUnitsSlice";
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

const Container = styled.div`
  grid-area: main;
  height: 100%;
  background: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UnitBox = styled.div`
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

const UnitAddress = styled.div`
  margin: 1rem;
  flex-direction: row;
  font-color: white;
  font-size: 1.5rem;
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

const Units = () => {
  const dispatch = useDispatch();
  const units = useSelector(selectUnits);

  useEffect(() => {
    dispatch(fetchUnitsAsync());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUnitAsync(id));
    window.location.reload(false);
  };
  return (
    <GridContainer>
      <Sidebar />
      <Container>
        {units &&
          Array.isArray(units) &&
          units.map((unit) => {
            return (
              <UnitBox key={unit.id}>
                <UnitAddress>
                  <FaHome /> {unit.unitNumber}
                  <DeleteSpan>
                    <DeleteIcon onClick={() => handleDelete(unit.id)} />
                  </DeleteSpan>
                </UnitAddress>

                <p>Bedrooms: {unit.bedrooms}</p>

              </UnitBox>
            );
          })}
      </Container>
    </GridContainer>
  );
};

export default Units;
