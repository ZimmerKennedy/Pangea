import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import "./dashboard.scss";
import Widget from "../../components/widget/Widget.jsx";
import Featured from "../../components/featured/Featured.jsx";
import Chart from "../../components/chart/Chart.jsx";
import Table from "../../components/table/Table.jsx";
import NavbarDashboard from "../../components/navbardashboard/NavbarDashboard.jsx"; 


/**
 * COMPONENT
 */
const Dashboard = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <NavbarDashboard />
        <div className="widgets">
          <Widget type="tenants" />
          <Widget type="properties" />
          <Widget type="maintenance_request" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Current Properties</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
