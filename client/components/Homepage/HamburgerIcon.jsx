import React from 'react';
import styled from 'styled-components';

const Icon = styled.svg`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 1s;
`;

const HamburgerIcon = ({ handleClick, isOpen}) => {


  

  const Hamburger = (
    <Icon onClick={handleClick} viewBox="0 0 24 24">
      <path d="M2 6h20v2H2zm0 5h20v2H2zm0 5h20v2H2z" strokeWidth="2"/>
    </Icon>
  );

  const CloseIcon = (
    <Icon onClick={handleClick} viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeWidth="2" stroke="currentColor" />
    </Icon>
  );

  return isOpen ? CloseIcon : Hamburger;
};

export default HamburgerIcon;