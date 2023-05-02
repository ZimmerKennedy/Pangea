import React from "react";
import styled from "styled-components";

const Container = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.body};
`;

const GridContainer = styled.div`
  height: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const LeftGrid = styled.div`
  background: ${(props) => props.theme.fourthBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.text};
  overflow: hidden;
  margin: 10px;
  position: relative;
  border-radius: 20px 5px 5px 20px;
`;

const MiddleGrid = styled.div`
  background: ${(props) => props.theme.fourthBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.text};
  overflow: hidden;
  margin: 10px;
  border-radius: 5px 5px 5px 5px;
`;
const RightGrid = styled.div`
  background: ${(props) => props.theme.fourthBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.text};
  margin: 10px;
  border-radius: 5px 20px 20px 5px;
`;

const Box = styled.div`
  width: 80%;
  text-align: center;
`;

const Vision = styled.p`
  font-size: 1.5em;
  margin: 40px 0;
  font-weight: 100;
  line-height: 1.2em;
  z-index: 3;
`;
const Button = styled.button`
  font-size: 1.4rem;
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 800;
  z-index: 3;
  padding: 20px;
  background: ${(props) => props.theme.secondBg};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.text};
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
  background-color: transparent;
  z-index: 3;
  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.secondBg};
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 300px;
  display: block;
  object-position: center center;
  background-repeat: no-repeat;
  border-radius: 50%;
`;

const Home3rdPage = () => {
  return (
    <Container>
      <GridContainer>
        <LeftGrid>
          <Box>
            <Image
              src="https://media.istockphoto.com/id/827615404/photo/paper-house-under-a-magnifying-lens.jpg?s=612x612&w=0&k=20&c=97KzqjE4gKtU5P0Bs3xFwbOLzNJtwWAnYPUZO1ZaaQI="
              alt="discoverImg"
            />
            <Vision>
              Unlock the potential of seamless property management with
              Rentality, simplifying tenant onboarding, communication, rent
              collection, and maintenance coordination.
            </Vision>

            <Button>DISCOVER RENTALITY</Button>
          </Box>
        </LeftGrid>
        <MiddleGrid>
          <Box>
            <Image
              src="https://www.homee.com/hubfs/Blog%20Images/Maintenance%20Checklist.jpeg"
              alt="efficiencyImg"
            />
            <Vision>
              Streamline your rental process with Rentality's all-in-one
              platform, helping you save time, reduce stress, and enhance your
              landlord-tenant relationships.
            </Vision>
            <Button>EMBRACE EFFICIENCY</Button>
          </Box>
        </MiddleGrid>
        <RightGrid>
          <Box>
            <Image
              src="https://images.globest.com/contrib/content/uploads/sites/304/2020/07/handshake-art-photo-resized.jpg"
              alt="buildImg"
            />
            <Vision>
              Join the growing community of satisfied landlords and tenants, and
              let Rentality pave the way for your thriving, transparent, and
              convenient property management future.
            </Vision>
            <Button>BUILD YOUR RENTAL EMPIRE</Button>
          </Box>
        </RightGrid>
      </GridContainer>
    </Container>
  );
};

export default Home3rdPage;
