import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const Div = styled.div`
display: flex;
flex-direction: column;
align-content: center;
text-align: center;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
background-color: white;
padding: 20px;

opacity: 90%;

`

const Title = styled.h1`
color: #163172;
padding: 5px;
`
const EmInfoBox = styled.div`
border: 3px solid #1E56A0;
color: #1E56A0;
font-size: 1.4rem;
font-weight: bold;
width: 45vw;
height: auto;
margin: 2rem 2rem 0 2rem;
padding: 1rem;
display: flex;
flex-direction: column;
align-content: center;
text-align: center;
font-weight: bold;
`
const EmContact = styled.h3`
color: #1E56A0;
font-size: 1.5rem;
`


const AllButtons = styled.button`
background-color: #1E56A0;
color: white;
border: none;
width: 30vw;
height: 5vh;
font-size: 1.5rem;
margin-bottom: 2rem;
margin: auto;
`



//dummy daters
const landlordPhone = "757-222-1111"

const MaintenanceReq = () => {
    const navigate = useNavigate();
    const [makeEmergencyReq, setMakeEmergencyReq] = useState(false)

    useEffect(() => {
        console.log("Make Em Req?", makeEmergencyReq)
    })

    function detectMakeEmReqButtonClick() {
        makeEmergencyReq ? setMakeEmergencyReq(false) : setMakeEmergencyReq(true)
    }


    const handleNav = () =>{
        navigate('/create-maintenance-request')
    }
    return (
        <Div>
            <Title>Maintenance Request</Title>
            <EmInfoBox>
                Examples of emergency maintenance situations include: Burst Pipes, Gas Leaks,
                Electrical Hazards, or any other immediate threat to life or the property.
                For a situation where someone is in danger, or a fire, call 911.<br></br>
              
            </EmInfoBox>
            <EmContact>
                {makeEmergencyReq ? <p>Landlord Emergency Contact: {landlordPhone}</p> : <></>}
            </EmContact>

            <AllButtons onClick={detectMakeEmReqButtonClick} style={{
                backgroundColor: makeEmergencyReq ? "red" : ""
            }}>
            {makeEmergencyReq ? "Cancel" : "Emergency Request"}
                
            </AllButtons>
            {/* <AllButtons onClick={handleNav}>
                Initiate Request
            </AllButtons> */}
        </Div>
    )
}

export default MaintenanceReq