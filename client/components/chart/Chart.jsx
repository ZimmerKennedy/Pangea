import React, {useEffect, useState} from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchPaymentHistory, selectPaymentHistory } from "../../features/paymentsLandlord/paymentsSlice";
import { useSelector, useDispatch } from "react-redux";


const data = [
  { name: "January", Total: 0 },
  { name: "February", Total: 0 },
  { name: "March", Total: 0 },
  { name: "April", Total: 0 },
  { name: "May", Total: 0 },
  { name: "June", Total: 0 },
  { name: "July", Total: 0 },
];




const Chart = ({ aspect, title }) => {
  const dispatch = useDispatch();
  const paymentHistory = useSelector(selectPaymentHistory);
  const [newData, setNewData] = useState(data);
  
  useEffect(() => {
    dispatch(fetchPaymentHistory());
  }, [dispatch]);
  console.log(`paymentHistory from chart.jsx`, paymentHistory);

 useEffect(() => {
    const updatedData = data.map(d => ({...d}));
    paymentHistory.paymentHistory.forEach((payment) => {
      const month = new Date(payment.paymentDate).toLocaleString("default", { month: "long" });
      const index = updatedData.findIndex((d) => d.name === month);
      updatedData[index].Total += payment.paidAmount;
    });
    setNewData(updatedData);
  }, [paymentHistory]);

  console.log(`newDataaaa`, newData);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={newData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E56A0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1E56A0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#1E56A0"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart