import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logout, me } from "../../app/store";
import { selectMe } from "../../auth/authSlice";
import {
  fetchTenantAsync,
  selectTenant,
} from "../landlordComponents/landlordSlices/fetchSingleTenantSlice";
import TenantSidebar from './TenantSidebar.jsx'



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

const Title = styled.h1`
  color: #163172;
  margin-bottom: -0.4rem;
`;

const RentBox = styled.div`
  border: 3px solid #1e56a0;
  color: #1e56a0;
  width: 45vw;
  height: 15vh;
  margin: 2rem;
  display: flex;
  background-color: #f2f2f2;
`;
const Section = styled.section`
  flex: 6;
  height: 45em;
  margin-top: 2rem;
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
`;

const MonthlyRentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  border-right: 2px solid #1e56a0;
`;
const DueRentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
const MonthlyAmount = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;
const DueAmount = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #1e56a0;
  opacity: 75%;
  color: #fff;
  border: none;
  width: 20vw;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    background-color: #163172;
    color: #f6f6f6;
  }
`;



const TenantHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rentDue, setRentDue] = useState(0);

  const thisUser = useSelector(selectMe);
  const thisTenant = useSelector(selectTenant);
  useEffect(() => {
    dispatch(fetchTenantAsync(thisUser.id));
  }, []);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const handleNav = () =>{
    navigate('/payment')
}

  return (
    <GridContainer>

      <TenantSidebar />
    <Container>
      <Section>
        <Title>
          {greeting}, {thisTenant.name}
        </Title>
        <Title>Unit #{thisTenant.unitIdToAssociateTenant}</Title>
        <RentBox>
          <MonthlyRentBox>
            <h2>Monthly Rent</h2>
            <MonthlyAmount>${thisTenant.rentAmount}</MonthlyAmount>
          </MonthlyRentBox>
          <DueRentBox>
            <h2>Rent Due</h2>
            <DueAmount
              style={{
                color: rentDue === 0 ? "green" : "red",
              }}
              >
              ${rentDue}
            </DueAmount>
          </DueRentBox>
        </RentBox>
        <Button onClick={handleNav}>Pay Rent Now</Button>       
        <Button onClick={() => navigate("/create-maintenance-request")}>Create Work Order</Button>       
      </Section>
    </Container>
        </GridContainer>
  );
};

export default TenantHome;
