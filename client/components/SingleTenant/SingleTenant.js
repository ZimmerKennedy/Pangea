import React, { useEffect } from "react";
import './singletenant.css'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'
import { getTenant } from './singleTenantSlice'
import { Link } from "react-router-dom";
import LandlordNavbar from "../../features/navbar/LandlordNavbar";


const SingleTenant = () => {

    const tenant = useSelector(state => {
        return state.landlordTenant
    })
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getTenant(id))
    }, [])
console.log("TENANT:"+ tenant)
    return (
        <div>
            <LandlordNavbar />
            <div id="rentDiv">
                <p id="tenName">{tenant.name}</p>
                <div id="rentBox">
                    <p id="rentStatus">Rent Status: {tenant.rentPaid ? "Paid" : "Owed"}</p>
                    <p id="rentNum" className="paid owed">{tenant.unit && tenant.unit.rentAmount}</p>
                </div>
            </div>
            <div id="tenInfoDiv">
            <ul id="tenantBoxes">
                    {/* <li className="tenantLi">
                        <Link className="tenLinks" to={`/messages/${tenant.id}`}>Messages</Link>
                    </li> */}
                    <li className="tenantLi">
                        <Link className="tenLinks" to={tenant && `/singletenant/${tenant.unitIdToAssociateTenant}/workorders`}>Work Orders: <span id="workNum">{tenant.unit && tenant.unit.workOrders}</span></Link>
                    </li>
                    <li className="tenantLi">
                        <Link className="tenLinks" to={'/pastpayments'}>Payment History</Link>
                    </li>
                </ul>
                <ul id="teninfoUL">
                    <p id="tenInfoTitle">Tenant Information</p>
                    <p className="tenInfo">Unit: {tenant.unitId}</p>
                    <p className="tenInfo">Phone: {tenant.phoneNumber}</p>
                    <p className="tenInfo">Email: {tenant.email}</p>
                    <p className="tenInfo">Lease start date: {tenant.leaseStartDate}</p>
                    <p className="tenInfo">Lease end date: {tenant.leaseEndDate}</p>
                </ul>
            </div>
        </div>
    )
}

export default SingleTenant