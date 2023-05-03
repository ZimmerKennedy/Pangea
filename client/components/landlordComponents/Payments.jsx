import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Sidebar from "../sidebar/Sidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaymentHistory } from "./landlordSlices/fetchAllPaymentsSlice.js";
import { FaHome } from "react-icons/fa";

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

const PaymentsBox = styled.div`
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
`;

const PaymentsFontStyle = styled.div`
  margin: 1rem;
  font-size: 2rem;
`;

const Payments = () => {
  const dispatch = useDispatch();
  const paymentHistory = useSelector((state) => state.paymentHistory);
  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  return (
    <GridContainer>
      <Sidebar />
      <Container>
        {paymentHistory.paymentHistory.map((payment) => (
          <PaymentsBox key={payment.id}>
            <PaymentsFontStyle>
              {" "}
              <FaHome /> {payment.unitNumber}
            </PaymentsFontStyle>
            <PaymentsFontStyle>${payment.paidAmount}</PaymentsFontStyle>
            <PaymentsFontStyle>Paid By:{payment.paymentBy}</PaymentsFontStyle>
            <PaymentsFontStyle>
              {new Date(payment.paymentDate).toLocaleDateString()}
            </PaymentsFontStyle>
          </PaymentsBox>
        ))}
      </Container>
    </GridContainer>
  );
};

export default Payments;
