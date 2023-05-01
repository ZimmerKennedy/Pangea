import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HouseIcon from "@mui/icons-material/House";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectTenants, fetchTenantsAsync } from "../../features/allTenants/allTenantsSlice";
import { selectMaintenanceRequests, fetchMaintenanceRequestsAsync } from "../../features/maintenanceRequest/allMaintenanceRequestSlice";
import { selectPaymentHistory, fetchPaymentHistory } from "../../features/paymentsLandlord/paymentsSlice";
import { selectProperties, fetchPropertiesAsync } from "../../features/property/propertySlice";
const Widget = ({ type }) => {
  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);
  let data;
  const dispatch = useDispatch();
  let tenants = useSelector(selectTenants)
  let maintenanceRequests = useSelector(selectMaintenanceRequests)
  let earnings = useSelector(selectPaymentHistory)
  let properties = useSelector(selectProperties)
  
  
  useEffect(() => {
    dispatch(fetchTenantsAsync());
    dispatch(fetchMaintenanceRequestsAsync());
    dispatch(fetchPaymentHistory());
    dispatch(fetchPropertiesAsync());
    if (tenants) {
      setAmount(tenants.length);
    }
  }, [dispatch, tenants.length]);
  const totalEarnings = earnings.paymentHistory.reduce(
    (total, payment) => {
      return total + payment.paidAmount;
    },
    0
    );
  
  switch (type) {
    case "tenants":
      data = {
        title: "TENANTS",
        isMoney: false,
        link: "See all tenants",
        query: "tenants",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "maintenance_request":
      data = {
        title: "MAINTENANCE REQUEST",
        isMoney: false,
        link: "View all maintenance request",
        icon: (
          <CommentBankIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "properties":
      data = {
        title: "PROPERTIES",
        query: "properties",
        link: "See details",
        icon: (
          <HouseIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        {type === "tenants" && (
          <span className="counter">
            You Have {amount} Tenants
          </span>
        )}
        {type === "tenants" && (
          <Link to="/tenants" className="link">
            {data.link}
          </Link>
        )}
        

        {type === "maintenance_request" && (
          <span className="counter">
          {maintenanceRequests.length} Work Orders Open
          </span>
           )}
        {type === "maintenance_request" && (
          <Link to="/workorders" className="link">
            {data.link}
          </Link>
        )}
        {type === "earning" && (
          <span className="counter">
           ${totalEarnings}
          </span>
           )}
        {type === "earning" && (
          <Link to="/payments" className="link">
            {data.link}
          </Link>
        )}
        {type === "properties" && (
          <span className="counter">
           You Own {properties.length} Properties
          </span>
           )}
        {type === "properties" && (
          <Link to="/properties" className="link">
            {data.link}
          </Link>
        )}
      </div>
      <div className={`right ${diff < 0 ? "negative" : "positive"}`}>
        <div className="percentage">
          {diff < 0 ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;

