import React, { useState } from 'react';
import styled from "styled-components";
import HamburgerIcon from "./HamburgerIcon.jsx";
import { useNavigate } from "react-router-dom";
const Container = styled.nav`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
`;

const RightDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1rem;
  margin: auto;
  & > div {
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: inherit;
    background-color: transparent;
    transition: background-color 1s ease, color 1s ease;
  }
  
  & > div:hover {
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.hoverText};
  }
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: 800;
  font-family: ${(props) => props.theme.fontFamily};
  cursor: pointer;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <HamburgerIcon handleClick={handleClick} isOpen={isOpen}/>
      <Brand onClick={() => navigate("/")}>Rentility</Brand>
      <RightDiv>
        <div onClick={() => navigate("/signup")}>Tenants</div>
        <div onClick={() => navigate("/signup")}>Landlord</div>
      </RightDiv>
    </Container>
  );
};

export default Navbar;
