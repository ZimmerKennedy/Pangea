import React, { useState } from 'react';
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Github, LinkedIn } from '../assets/svgs/Svgs.jsx';
const Container = styled.nav`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
  color: ${(props) => props.theme.body};
  background: ${(props) => props.theme.text};
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
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: 800;
  font-family: ${(props) => props.theme.fontFamily};
  cursor: pointer;
`;
const Footer = () => {
  const navigate = useNavigate();


  return (
    <Container>
      <Brand onClick={() => navigate("/")}>Rentility</Brand>
      <RightDiv>
        <div onClick={() => navigate("/signup")}>Apply Now</div>
        <div onClick={() => navigate("/signup")}>Tenants</div>
        <div onClick={() => navigate("/signup")}>Landlord</div>
      </RightDiv>
      <div>
      <NavLink
          style={{ color: "inherit" }}
          onClick={() =>
            window.open("https://github.com/ZimmerKennedy/Rentility", "_blank")
          }
        >
          <Github
            width={25}
            height={25}
            fill={(props) => props.theme.body}
          />
        </NavLink>
        <NavLink
          style={{ color: "inherit" }}
          onClick={() =>
            window.open("https://www.linkedin.com/in/zimmerkennedy/", "_blank")
          }
        >
          <LinkedIn
            width={25}
            height={25}
            fill={(props) => props.theme.body}
          />
        </NavLink>
      </div>
    </Container>
  );
};

export default Footer;
