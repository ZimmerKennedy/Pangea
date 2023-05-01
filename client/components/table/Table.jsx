import React, { useEffect } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// useSelector and useDispatch are hooks that allow us to access the state and dispatch actions
import { useSelector, useDispatch } from "react-redux";
// selectProperties is the function we wrote in our propertySlice.js file that selects the properties from the state
import { selectProperties } from "../../features/property/propertySlice";
// fetchPropertiesAsync is the function we wrote in our propertySlice.js file that fetches the properties from the API
import { fetchPropertiesAsync } from "../../features/property/propertySlice";

const List = () => {
  // useDispatch is a hook that allows us to dispatch actions
  const dispatch = useDispatch();
  // useEffect is a hook that allows us to run code when the component mounts
  useEffect(() => {
    dispatch(fetchPropertiesAsync());
  }, [dispatch]);

  // useSelector is a hook that allows us to select data from the state
  const properties = useSelector(selectProperties);
  console.log(properties);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Property Name</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Number of Units</TableCell>
            <TableCell className="tableCell">Landlord ID</TableCell>
            <TableCell className="tableCell">Price Purchased</TableCell>
            <TableCell className="tableCell">Date Purchased</TableCell>
            <TableCell className="tableCell">Rental Amount</TableCell>
            <TableCell className="tableCell">Mortgage Expense</TableCell>
            <TableCell className="tableCell">Current Market Value</TableCell>
            <TableCell className="tableCell">HOA Expense</TableCell>
            <TableCell className="tableCell">Property Tax Yearly</TableCell>
            <TableCell className="tableCell">Insurance Yearly</TableCell>
            <TableCell className="tableCell">Vacancy Rate</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="tableCell">{property.id}</TableCell>
              <TableCell className="tableCell">{property.propertyName}</TableCell>
              <TableCell className="tableCell">{property.address}</TableCell>
              <TableCell className="tableCell">{property.numberOfUnits}</TableCell>
              <TableCell className="tableCell">{property.landlordId}</TableCell>
              <TableCell className="tableCell">{property.pricePurchased}</TableCell>
              <TableCell className="tableCell">{property.datePurchased}</TableCell>
              <TableCell className="tableCell">{property.rentalAmount}</TableCell>
              <TableCell className="tableCell">{property.mortgageExpense}</TableCell>
              <TableCell className="tableCell">{property.currentMarketValue}</TableCell>
              <TableCell className="tableCell">{property.hoaExpense}</TableCell>
              <TableCell className="tableCell">{property.propertyTax}</TableCell>
              <TableCell className="tableCell">{property.insuranceExpense}</TableCell>
              <TableCell className="tableCell">{property.vacancyRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
