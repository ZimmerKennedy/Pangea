import React from "react";
import Navbar from "./Navbar.jsx";
import styled, { keyframes } from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Home2ndPage from "./Home2ndPage.jsx";
import Home3rdPage from "./Home3rdPage.jsx";
import Home4thPage from "./Home4thPage.jsx";
import Footer from "./Footer.jsx";


const Container = styled.main`
  background: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: center;

  & > h1 {
    padding: 0.5rem 1rem;
    color: inherit;
    background-color: transparent;
    transition: background-color 1s ease, color 1s ease;
  }

  & > h1:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.hoverText};
  }
`;

const Brand = styled.h1`
  font-size: calc(6rem + 6rem);
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 600;
  text-align: center;

  @media only screen and (max-width: 768px) {
    font-size: calc(1rem + 1rem);
  }
`;

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(7px);
  }
  100% {
    transform: translateY(0);
  }
`;
const ScrollDownIcon = styled(ExpandMoreIcon)`
  bottom: 1%;
  left: 50%;
  position: absolute;
  animation: ${bounce} 2s infinite;
  cursor: pointer;
`;

const Home = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
    <Container>
      <Navbar />
      <Brand>Empowering</Brand>
      <Brand>RENTAL</Brand>
      <Brand>HARMONY</Brand>
      <ScrollDownIcon
        sx={{ width: 50, height: 50, color: "gray" }}
        onClick={handleScrollDown}
        />
    </Container>
    <Home2ndPage />
    <Home3rdPage />
    <Home4thPage />
    <Footer />
        </>
  );
};

export default Home;
