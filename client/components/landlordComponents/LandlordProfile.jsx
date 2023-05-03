import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchlandlordAsync, selectLandlord } from "./landlordSlices/fetchLandlordSlice";
import { selectMe } from "../../auth/authSlice";
import styled, { keyframes } from "styled-components";
import {
  FaUser,
  FaHome,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import Sidebar from "../sidebar/Sidebar.jsx";


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



const ProfileBox = styled.div`
background-color:white;
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
box-shadow: 0px 0px 10px #1E56A0;
`;

const ProfileHeader = styled.h2`
  color: #1d3557;
`;

const ProfileItem = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProfileIcon = styled.span`
  margin-right: 1rem;
`;

const ProfileImage = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  background-color: #eee;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: #aaa;
`;

const LandlordProfile = () => {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const userLandlord = useSelector(selectLandlord);


  useEffect(() => {
    dispatch(fetchlandlordAsync(me.id));
  }, [dispatch]);
  return (
    <GridContainer>
      <Sidebar />

    <Container>
      
        <ProfileBox>
        <ProfileImage>
          <FaUserCircle />
        </ProfileImage>
        <ProfileHeader>{userLandlord.name}</ProfileHeader>
        <ProfileItem>
          <ProfileIcon>
            <FaHome />
          </ProfileIcon>
          Address: {userLandlord.address}
        </ProfileItem>
        <ProfileItem>
          <ProfileIcon>
            <FaUserCircle />
          </ProfileIcon>
          Username: {userLandlord.username}
        </ProfileItem>
        <ProfileItem>
          <ProfileIcon>
            <FaPhone />
          </ProfileIcon>
          Phone Number: {userLandlord.phoneNumber}
        </ProfileItem>
        <ProfileItem>
          <ProfileIcon>
            <FaEnvelope />
          </ProfileIcon>
          Email: {userLandlord.email}
        </ProfileItem>
        <ProfileItem>
          <ProfileIcon>
            <FaUser />
          </ProfileIcon>
          Unique Id: {userLandlord.idForTenantToAssociate}
        </ProfileItem>
        </ProfileBox>
     
    </Container>
    </GridContainer>
  );
};

export default LandlordProfile;
