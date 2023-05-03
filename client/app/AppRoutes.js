import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { me } from "./store";
import { selectMe } from "../auth/authSlice";

import {
  TenantHome,
  MakeAPayment,
  AfterSignUpTenant,
  CreateMaintenanceRequest,
  TenantPayment,
} from "../components/tenantComponents";

import {
  AfterSignUpLandlord,
  AddAProperty,
  AddAUnit,
  Dashboard,
  SingleMaintenanceRequest,
  MaintenanceRequest,
  AllTenants,
  SingleTenant,
  LandlordProfile,
  AddTenantToUnit,
  AddRent,
  Delete,
  Units,
  Properties,
  Payments,
} from "../components/landlordComponents";




import AuthForm from "../auth/AuthForm";
import AuthFormSignup from "../auth/AuthFormSignup";
import Home from "../components/Homepage/Home.jsx";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userLoggedIn = useSelector(selectMe);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        ////////// IF Logged in as a Tenant Show this Routes /////////////
        userLoggedIn.role === "tenant" ? (
          <Routes>
            <Route path="/tenanthome" element={<TenantHome />} />
            <Route path="/makeapayment" element={<MakeAPayment />} />
            <Route path="/signup-tenant" element={<AfterSignUpTenant />} />
            <Route path="/create-maintenance-request" element={<CreateMaintenanceRequest />}/>
            <Route path="/*" element={<TenantHome />} />
            <Route path="/payment" element={<TenantPayment />} /> 
          </Routes>
        ) : (
          ////////// IF Logged in as a Landlord show this Routes///////
          <Routes>
           <Route path="/signup-landlord" element={<AfterSignUpLandlord />} />
            <Route path="/add-property" element={<AddAProperty />} />
            <Route path="/add-unit" element={<AddAUnit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/workorders/:id"
              element={<SingleMaintenanceRequest />}
            />
            <Route path="/workorders" element={<MaintenanceRequest />} />
            <Route path="/tenants" element={<AllTenants />} />
            <Route path="/singletenant/:id" element={<SingleTenant />} />
            <Route path="/profile-page" element={<LandlordProfile />} />
            <Route path="add-tenant-unit" element={<AddTenantToUnit />} />
            <Route
              path="/addRent"
              element={<AddRent name="addRent" displayName="Add Rent" />}
            />
            <Route path="remove" element={<Delete />} />
            <Route path="/units" element={<Units />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/*" element={<Dashboard />} /> 
          </Routes>
        )
      ) : (
        /////// IF Not Logged in Show this Routes ////////////
        <Routes>
          
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthFormSignup name="signup" displayName="Sign Up" />}
          />
          <Route
            path="/home"
            element={<Home name="home" displayName="Pangea" />}
          />
          <Route
            path="/*"
            element={<Home name="home" displayName="Pangea" />}
          />

  
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

