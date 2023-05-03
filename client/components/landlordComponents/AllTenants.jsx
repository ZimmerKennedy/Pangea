import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTenantsAsync,
  selectTenants,
  deleteTenantAsync,
} from "./landlordSlices/fetchAllTenantsSlice";
import {
  fetchUnitsAsync,
  selectUnits,
} from "./landlordSlices/fetchAllUnitsSlice";
import styled from "styled-components";
import Sidebar from "../sidebar/Sidebar.jsx";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-areas: "sidebar main";
  height: 100vh;
  width: 100vw;
`;

const StyledLandlordProfile = styled.div`
  grid-area: main;
  height: 100%;
  background: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-size: 5rem;
`;

const ProfileItem = styled.p`
  font-size: 1rem;
  margin: 10px;
`;

const TenantBox = styled.div`
  background-color: white;
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
  box-shadow: 0px 0px 10px #1e56a0;
`;

const LinkSingle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const AllTenants = () => {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);

  const tenants = useSelector(selectTenants);
  const units = useSelector(selectUnits);

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
    <GridContainer>
      <Sidebar />
      <StyledLandlordProfile>
        {tenants &&
          Array.isArray(tenants) &&
          tenants.map((tenant) => {
            return (
              <TenantBox key={tenant.id}>
                <ProfileImage>
                  <FaHome />#{tenant.unitIdToAssociateTenant}
                </ProfileImage>
                <ProfileItem>{tenant.name}</ProfileItem>
                <ProfileItem>Phone Number:{tenant.phoneNumber}</ProfileItem>
                <ProfileItem>Email: {tenant.email}</ProfileItem>
                <ProfileItem>Username: {tenant.username}</ProfileItem>
                <ProfileItem>Birth Date: {tenant.dateOfBirth}</ProfileItem>
                <ProfileItem>
                  Lease Start:{" "}
                  {new Date(tenant.leaseStartDate)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$1/$2")}
                </ProfileItem>
                <ProfileItem>
                  Lease End:{" "}
                  {new Date(tenant.leaseEndDate)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3/$1/$2")}
                </ProfileItem>
                <ProfileItem>Rent:{tenant.rentAmount}</ProfileItem>
                <ProfileItem>
                  {" "}
                  Status: {tenant.rentPaid ? "Paid" : "Owed"}
                </ProfileItem>
              </TenantBox>
            );
          })}
      </StyledLandlordProfile>
    </GridContainer>
  );
};

export default AllTenants;
