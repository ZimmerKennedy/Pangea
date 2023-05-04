import React from "react";
import styled from "styled-components";
import { DoubleQuote } from "../assets/svgs/Svgs.jsx";

const Container = styled.main`
  min-height: 100vh;
  background: ${(props) => props.theme.fourthBg};
  color: ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.text};
`;
const Box = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Quotation = styled(DoubleQuote)`
  font-weight: 800;
`;

const Quote = styled.div`
  font-size: 2rem;
  text-align: center;
  letter-spacing: 2px;
  font-weight: 400;
  @media only screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Home3rdPage = () => {
  return (
    <Container>
      <Box>
        <Quotation width={100} height={100} />
        <Quote>
          Embrace the harmony between landlords and tenants with Rentality. Our
          intuitive app simplifies the rental journey, fostering transparent
          communication and seamless management. Experience the true essence of
          rental bliss in Rentality's modern ecosystem, where vibrant
          connections meet effortless living.
        </Quote>
      </Box>
    </Container>
  );
};

export default Home3rdPage;