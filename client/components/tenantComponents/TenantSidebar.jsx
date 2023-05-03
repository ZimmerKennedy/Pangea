import DashboardIcon from "@mui/icons-material/Dashboard";

import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeWorkOutlinedIcon from "@mui/icons-material/AddHomeWorkOutlined";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import React from "react";
import { logout } from "../../app/store.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Rentility</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <p className="title">SETTINGS</p>
          <Link to="/profile-page" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <Link to="/signup-tenant" style={{ textDecoration: "none" }}>
            <li>
              <AdminPanelSettingsOutlinedIcon className="icon" />
              <span>Update Account</span>
            </li>
          </Link>
          <Link to="/create-maintenance-request" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>Submit Work Order</span>
            </li>
          </Link>
      <li onClick={logoutAndRedirectHome}>
        <ExitToAppIcon className="icon" />
        <span>
          Sign Out
        </span>
      </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
