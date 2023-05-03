import React from 'react';
import Sidebar from "../../sidebar/Sidebar.jsx";
import "./dashboard.scss";
import Widget from "./widget/Widget.jsx";
import Featured from "./featured/Featured.jsx";
import Chart from "./chart/Chart.jsx";
import Table from "./table/Table.jsx";
import NavbarDashboard from "./navbardashboard/NavbarDashboard.jsx"; 


const Dashboard = () => {

  return (
    <div id="grid__dashboard">
      <Sidebar />
    <div className="dashboard">
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
    </div>
  );
};

export default Dashboard;
