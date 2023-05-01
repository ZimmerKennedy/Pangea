import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import React, { useEffect } from "react";
import { fetchPaymentHistory } from "../../features/paymentsLandlord/paymentsSlice";
import { useSelector, useDispatch } from "react-redux";

const Featured = () => {
  const dispatch = useDispatch();
  const paymentHistory = useSelector((state) => state.paymentHistory);
  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);
  console.log(`paymentHistory`, paymentHistory.paymentHistory);

  const totalRentAmount = paymentHistory.paymentHistory.reduce(
    (total, payment) => {
      return total + payment.paidAmount;
    },
    0
  );

  const targetAmount = 100000;
  const percentage = (totalRentAmount / targetAmount) * 100;
  console.log(`rentamount`, totalRentAmount);

  const lastWeekAmount = paymentHistory.paymentHistory
  .filter(payment => {
    // Check if the payment was made within the last week
    const paymentDate = new Date(payment.paymentDate);
    return paymentDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  })
  .reduce((total, payment) => {
    return total + payment.paidAmount;
  }, 0);

const lastMonthAmount = paymentHistory.paymentHistory
  .filter(payment => {
    // Check if the payment was made within the last month
    const paymentDate = new Date(payment.paymentDate);
    return paymentDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  })
  .reduce((total, payment) => {
    return total + payment.paidAmount;
  }, 0);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
            strokeWidth={5}
          />
        </div>
        <p className="amount">${totalRentAmount}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${targetAmount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastWeekAmount}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastMonthAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
