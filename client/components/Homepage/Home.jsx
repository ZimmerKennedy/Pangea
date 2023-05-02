import React from "react";
import Navbar from "./Navbar.jsx";
import styled, { keyframes } from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AuthForm from "../../auth/AuthFormSignup.js";
const Container = styled.main`
  background: ${(props) => props.theme.body};
  height: 100vh;
  min-height: 100vh;
  position: relative;
`;

const Brand = styled.h1`
  font-size: calc(6rem + 6rem);
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    <Container>
      <Navbar />
      <Brand>Empowering Rental Harmony</Brand>
      <ScrollDownIcon
        sx={{ width: 50, height: 50, color: "gray" }}
        onClick={handleScrollDown}
      />
    </Container>
  );
};

export default Home;
