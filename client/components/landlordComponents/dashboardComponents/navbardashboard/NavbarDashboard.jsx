import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMe } from "../../../../auth/authSlice";
import {
  fetchlandlordAsync,
  selectLandlord,
} from "../../landlordSlices/fetchLandlordSlice";

const NavbarDashboard = () => {
  const thisUser = useSelector(selectMe);
  const thisLandlord = useSelector(selectLandlord);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchlandlordAsync(thisUser.id));
  }, []);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="landlordName">
          {greeting}, {thisLandlord.name}
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
