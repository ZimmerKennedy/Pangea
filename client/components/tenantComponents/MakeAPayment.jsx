import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  selectTenant,
  fetchTenantAsync,
} from "../landlordComponents/landlordSlices/fetchSingleTenantSlice";
import { selectMe } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import TenantSidebar from './tenantSidebar/TenantSidebar.jsx'

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-size: 1500px;
  background-repeat: no-repeat;
  background-position: 25% 75%;
  width: 83vw;
  height: 98vh;
margin-left: 17vw;

`;
const Title1 = styled.h1`
  color: #163172;
  font-size: 30px;
`;
const Title = styled.h1`
  color: #163172;
  margin-bottom: 0-3rem;
  font-size: 30px;
`;

const RentBox = styled.div`
  border: 3px solid #1e56a0;
  color: #1e56a0;
  width: 45vw;
  height: 15vh;
  display: flex;
`;

const Section = styled.section`
  width: 30vw;
  height: 45vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  scrollbar-width: none;
  background-color: white;
  opacity: 90%;
  padding: 0 10vw;
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
  background-color: #f2f2f2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;
const DueRentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  background-color: #f2f2f2;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
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

const MakeAPayment = () => {
  const dispatch = useDispatch();
  const [rentDue, setRentDue] = useState(0);
  const [rent, setRent] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);

  const tenant = useSelector(selectTenant);
  const thisUser = useSelector(selectMe);

  useEffect(() => {
    dispatch(fetchTenantAsync(thisUser.id));
  }, [dispatch]);


  const navigate = useNavigate();
const handleNav = () =>{
    navigate('/payment')
}

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



  return (
    <Background>
      <TenantSidebar/>
      <Section>
        <Title1>
          {greeting}, {tenant.name}
        </Title1>
        <Title>Suite #{tenant.unitIdToAssociateTenant}</Title>
        <RentBox>
          <MonthlyRentBox>
            <h2>Monthly Rent</h2>
            <MonthlyAmount>${tenant.rentAmount}</MonthlyAmount>
          </MonthlyRentBox>
          <DueRentBox>
            <h2>Rent Due</h2>
            <DueAmount
              style={{
                color: rentDue !== 0 ? "green" : "red",
              }}
            >
              ${tenant.rentAmount}
            </DueAmount>
          </DueRentBox>
        </RentBox>
        <Button onClick={handleNav}>Pay Rent Now</Button>
      </Section>
    </Background>
  );
};

export default MakeAPayment;
