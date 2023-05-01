import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTenantsAsync, selectTenants, deleteTenantAsync } from "./allTenantsSlice";
import { fetchUnitsAsync, selectUnits } from "../units/unitsSlice";
import styled, { keyframes } from "styled-components";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import {
  FaHome
} from "react-icons/fa";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const StyledLandlordProfile = styled.div`
display:flex;
height: 98vh;
margin-left: 17vw;
width: 83vw;
justify-content: center;
flex-direction: row
background: rgb(246,246,246);
background: linear-gradient(90deg, rgba(246,246,246,1) 0%, rgba(214,228,240,1) 44%, rgba(30,86,160,1) 79%, rgba(22,49,114,1) 99%);
`;

const ProfileImage = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size:5rem;
`;

const ProfileItem = styled.p`
  font-size: 1rem;
  margin: 10px;
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TenantWrapper = styled.div`
  width: 20%;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  background-color: #eee;
  box-shadow: 2px 2px 5px rgba(1, 2, 3, 0.2);
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    
  }
  animation: ${fadeIn} 1s;
`;

const ProfileSection = styled.section`
  background: linear-gradient(
    90deg,
    rgba(246, 246, 246, 1) 0%,
    rgba(214, 228, 240, 1) 44%,
    rgba(30, 86, 160, 1) 79%,
    rgba(22, 49, 114, 1) 99%
  );
  background-color: #fff;
  flex: 7;
  width: 50%;
  padding: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
`;
const Deletebtn = styled.span`
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

 const AllTenants = () => {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);


  const tenants = useSelector(selectTenants);
  const units = useSelector(selectUnits);
  console.log(`tenants`, tenants);
  console.log(`units`, units);
  useEffect(() => {
    dispatch(fetchTenantsAsync());
    dispatch(fetchUnitsAsync());
  }, [dispatch]);

const handleDelete = (id) => {
  dispatch(deleteTenantAsync(id));
  setDeleteId(id);
  window.location.reload(false);
};
// when deleted the page needs the state to be updated
useEffect(() => {
  if (deleteId) {
    dispatch(fetchTenantsAsync());
    setDeleteId(null);
  }
}, [deleteId, dispatch]);

  return (
    <StyledLandlordProfile>
      <Sidebar />
        <ProfileSection>
        {tenants && Array.isArray(tenants) && tenants.map((tenant) => {
          return (
            <TenantWrapper key={tenant.id}>
              <ProfileImage>
                <FaHome />#{tenant.unitIdToAssociateTenant}
              </ProfileImage>
              <ProfileItem>{tenant.name}</ProfileItem>
              <ProfileItem>Phone Number:{tenant.phoneNumber}</ProfileItem>
              <ProfileItem>Email: {tenant.email}</ProfileItem>
              <ProfileItem>Username: {tenant.username}</ProfileItem>
              <ProfileItem>Birth Date: {tenant.dateOfBirth}</ProfileItem>
              <ProfileItem>Lease Start: {new Date(tenant.leaseStartDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')}</ProfileItem>
              <ProfileItem>Lease End: {new Date(tenant.leaseEndDate).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3/$1/$2')}</ProfileItem>
              <ProfileItem>Rent:{tenant.rentAmount}</ProfileItem>
              <ProfileItem> Status: {tenant.rentPaid ? "Paid" : "Owed"}</ProfileItem>
              <Link to={`/singletenant/${tenant.id}`}>
                View Details
              </Link>
              <Deletebtn onClick={() => handleDelete(tenant.id)}><DeleteIcon /></Deletebtn>
            </TenantWrapper>
          );
        })}
      </ProfileSection>
    </StyledLandlordProfile>
  );
};

export default AllTenants;
