import React, {useEffect} from 'react'
import styled, { keyframes } from "styled-components";
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPaymentHistory } from './paymentsSlice';
import {FaHome} from "react-icons/fa";
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

const PaymentsContainer = styled.div`
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
`;


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const PaymentsItem = styled.div`
  background-color:white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  border: 1px solid gray;
  height: 20rem;
  width: 20rem;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }
  box-shadow: 0px 0px 10px #1E56A0;
  animation: ${fadeIn} 1s;
`;


const PaymentsFontStyle = styled.div`
  margin: 1rem;
  font-size:2rem;
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

const Payments = () => {
  const dispatch = useDispatch();
  const paymentHistory = useSelector(state => state.paymentHistory);
    console.log(`payments`,paymentHistory.paymentHistory)
  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);

  return (
    <Container>
        <Sidebar />
        <PaymentsContainer>

            {paymentHistory.paymentHistory.map(payment => (
              <PaymentsItem key={payment.id}>
                <PaymentsFontStyle> <FaHome /> {payment.unitNumber}</PaymentsFontStyle>
                <PaymentsFontStyle>${payment.paidAmount}</PaymentsFontStyle>
                <PaymentsFontStyle>Paid By:{payment.paymentBy}</PaymentsFontStyle>
                <PaymentsFontStyle>{new Date(payment.paymentDate).toLocaleDateString()}</PaymentsFontStyle>
              </PaymentsItem>
            ))}
            </PaymentsContainer>
    </Container>
  );
};

export default Payments;