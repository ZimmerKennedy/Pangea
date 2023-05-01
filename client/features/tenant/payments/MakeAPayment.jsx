import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  selectTenant,
  fetchTenantAsync,
} from "../../allTenants/singleTenantSlice";
import { useParams } from "react-router-dom";
import { selectMe } from "../../auth/authSlice";
import Sidebar from "../tenantSidebar/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import pay from '../../../../public/photos/pay2.jpeg'

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-image: url(${pay});
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
  console.log(`tenant`, tenant);

  function increaseRentDueClicked() {
    setRentDue(rentDue + 1000);
  }
  function increaseRentClicked() {
    setRent(rent + 1000);
  }
  function changeAmountToPay(e) {
    setAmountToPay(e.target.value);
  }
//   function PayRent() {
//     setRentDue(
//       rentDue >= amountToPay
//         ? rentDue - amountToPay
//         : alert(
//             "You can only enter an amount less than or equal to you rent due."
//           )
//     );
//   }
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

  //rentDue turns green if the tenant is caught up on rent, aka. $0.
  //message counter disappears when the tenant has no unread messages.
  //message counter stops displaying numbers of messages after 99.

  return (
    <Background>
      <Sidebar />
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
      {/* <h3>Amount To Pay: </h3>
            <input label={"Amount to pay"} type={"number"} onChange={changeAmountToPay}
             step={100} min={0} max={rentDue}>
            </input>
            <h3>Pay with selected payment method. </h3> */}
      {/* <h2 onClick={increaseRentClicked}>Increase Rent Test</h2>
            <h2 onClick={increaseRentDueClicked}>Increase Rent Due Test</h2> */}
    </Background>
  );
};

export default MakeAPayment;
