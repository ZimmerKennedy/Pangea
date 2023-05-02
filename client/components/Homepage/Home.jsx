import React from 'react';
import Navbar from './Navbar.jsx';
import styled from 'styled-components';

const Container = styled.main`
  background: ${(props) => props.theme.body};
  min-height: 100vh;
`;
const Home = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  )
}

export default Home