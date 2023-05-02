import React from 'react'
import styled from 'styled-components'
import { DoubleQuote } from '../assets/svgs/Svgs.jsx'

const Container = styled.main`
min-height: 100vh;
background: ${(props) => props.theme.secondBg};
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid ${(props) => props.theme.text};
`
const Box = styled.div`
width: 50vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Quotation = styled(DoubleQuote)`
font-weight: 800;

`

const Quote = styled.div`
font-size: 2rem;
text-align: center;
letter-spacing: 2px;
font-weight: 400;
`
const Home2ndPage = () => {
  return (
   <Container>
    <Box>
      <Quotation width={100} height={100}/>
    <Quote>
        Embrace the harmony between landlord and tenant 
        as you navigate the world of rental living with Rentality. 
        Our intuitive app simplifies the journey, fostering transparent communication and 
        seamless management. Delve into Rentality's modern ecosystem, where vibrant connections 
        meet effortless living, and experience the true essence of rental bliss.
    </Quote>
    </Box>
   </Container>
  )
}

export default Home2ndPage