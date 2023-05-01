import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUnitAsync, fetchUnitsAsync, selectUnits } from "./unitsSlice";
import styled, { keyframes } from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {FaHome} from "react-icons/fa";
import DeleteIcon from '@mui/icons-material/Delete';
const Container = styled.div`
  display: flex;
  height: 98vh;
  margin-left: 17vw;
  width: 83vw;
  justify-content: center;
  flex-direction: row;
  background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const UnitContainer = styled.div`
  display: flex;
  margin: 2rem;
  text-align: center;
  padding-left: 2rem;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  animation: ${fadeIn} 1s;
`;

const UnitItem = styled.div`
  background-color:white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  border: 1px solid gray;
  height: 25rem;
  width: 20rem;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }
  box-shadow: 0px 0px 10px #1E56A0;
`;

const UnitImage = styled.img`
  width: 20rem;
  height: 15rem;
`;
const UnitAddress = styled.div`
  margin: 1rem;
  flex-direction: row;
  font-color: white;
  font-size:1.5rem;
`;
const Button = styled.button`
  font-size: 15px;
  background-color: #1e56a0;
  color: #fff;
  border: none;
  width: 20rem;
  height: 3rem;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    background-color: #163172;
    color: #f6f6f6;
  }
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
    dispatch(fetchUnitsAsync())
    
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUnitAsync(id));
    window.location.reload(false);
  };
  return (
    <Container>
      <Sidebar />
      <UnitContainer>
        {units &&
          Array.isArray(units) &&
          units.map((unit) => {
            return (
              <UnitItem key={unit.id}>
                <UnitAddress>
                  <FaHome /> {unit.unitNumber} 
                <DeleteSpan>
                  <DeleteIcon onClick={() => handleDelete(unit.id)}/>
                  </DeleteSpan>
                  </UnitAddress>
                <UnitImage src={`/units/${unit.image}`} alt="image" />
                <p>Bedrooms: {unit.bedrooms}</p>
                <Button>View Unit</Button>
              </UnitItem>
            );
          })}
      </UnitContainer>
    </Container>
  );
};

export default Units;
