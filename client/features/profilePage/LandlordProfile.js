import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchlandlordAsync, selectLandlord } from "./landlordProfileSlice";
import { selectMe } from "../auth/authSlice";
import styled, { keyframes } from "styled-components";
import {
  FaUser,
  FaHome,
  FaUserCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

import Sidebar from "../../components/sidebar/Sidebar.jsx";
const StyledLandlordProfile = styled.div`
  // display: flex;
  // flex-direction: row;
  // margin-left: 17vw;
  // width: 83vw;
`;

const ProfileSection = styled.section`
background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);
display:flex;
height: 98vh;
margin-left: 17vw;
width: 83vw;
justify-content: center;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
  
`;

const bounce = keyframes`
  0% {
    transform: translateY(-50px);
  }
  80% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ProfileBox = styled.div`
align-self: center;
background-color: #fff;
box-shadow: 0px 0px 10px #1E56A0;
border-radius: 1rem;
padding: 5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
&:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}
animation: ${bounce} 1s;
`

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
  console.log(`userLandlord`, userLandlord);

  useEffect(() => {
    dispatch(fetchlandlordAsync(me.id));
  }, [dispatch]);
  return (
    <StyledLandlordProfile>
      <Sidebar />
      <ProfileSection>
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
      </ProfileSection>
    </StyledLandlordProfile>
  );
};

export default LandlordProfile;
