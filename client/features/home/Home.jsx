import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import Footer from '../footer/Footer';
import pangea5 from '../../../public/pangea5.png';
import Carousel, { rec } from "react-elastic-carousel";


const Background = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
// background: rgb(246,246,246);
background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(200, 200, 200, 0.8)
  ),
  url("photos/background5.jpg");
// background-image: url("photos/background5.jpg");
background-repeat: no-repeat;
background-color: #10121f;
background-size: 100vw;
`
const WelcomeBanner = styled.div`
Width: 93vw;
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
border-radius: 20px;
z-index: 3;
color: #D6E4F0;
text-shadow: 2px 2px 4px black;
font-size: 3rem;
margin: 1rem;
gap: 4rem;
`

const AllButtons = styled.button`
background-color: rgba(30, 86, 160, 0);
box-shadow: 4px 4px 10px 1px black;
color: #D6E4F0;
text-shadow: 2px 2px 4px black;
border-radius: 20px;
width: 20vw;
height: 5vh;
font-size: 1.5rem;
margin: 1rem;
border: none;
:hover {
    background-color: rgba(30, 86, 160, 0.4);
    border: 2px solid black;

}
`
const DescriptionBlock = styled.div`
color: white;
display: flex;
flex-direction: column;
margin-left: 2rem;
`

const DescriptionTitle = styled.h2`
font-size: 2rem;
width: fit-content;
margin: 0.5rem 0 0 0;
display: flex;
z-index: 3;
${'' /* background-color: rgba(30, 86, 160, 0.4); */}
box-shadow: 4px 4px 10px 1px black;
color: #D6E4F0;
text-shadow: 2px 2px 4px black;
justify-content: center;
border-radius: 20px;
${'' /* border: 2px solid darkgreen; */}
padding: 1rem;
font-style: italic;
`
const Description = styled.p`
color: white;
font-size: 1.5rem;
display: flex;
left: -30%;
z-index: 3;
line-height: 3rem;
text-shadow: 2px 2px 2px black;
width: 30vw;
height: fit-content;
justify-content: center;
background-color: rgba(30, 86, 160, 0.4);
box-shadow: 4px 4px 10px 1px black;
color: #D6E4F0;
text-shadow: 2px 2px 4px black;
border-radius: 20px;
border: 2px solid darkgreen;
padding: 1rem;
`
const ButtonBox = styled.div`
width: 40%;
position: absolute;
z-index: 3;
bottom: 15%;
right: 22.5%;
`
const MainBlock = styled.div`
width: 90%;
display: flex;
gap: 4rem;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 20px;
border-radius: 20px;
height: auto;
position: relative;
`
const rotate = keyframes`

from { background-position: 0vw 0vw; }
to { background-position: 10057vw 0vw; }
`
const Img = styled.div`
z-index: 2;
border-radius: 50%;
box-shadow: inset -30px -30px 150px 5px black;
background-color: #1E56A0;
width: 40vw;
height: 40vw;
background-image: url(${pangea5});
background-repeat: repeat-x;
animation: ${rotate} 2000s linear infinite;
animation-fill-mode: both;
transform-style: preserve-3d;
background-size: 60vw;
`;

const CarouselBox = styled.div`
width: 90vw;
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
margin: 2rem;
`
const CarouselPhoto = styled.img`
max-width: 40vw;
width: auto;
border-radius: 20px;
`
const Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
${'' /* height: 50vw;
width: 100%; */}
  background-color: none;
  color: #fff;
  margin: 0 15px;
  font-size: 4em;
`
// const ArrowButton = rec.rec-arrow`
// background-color: red;
// `
const StyledCarousel = styled(Carousel)`
    .rec.rec-arrow {
        background-color: rgba(0,0,20,0.2);
        color: white;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .rec.rec-arrow:hover {
        background-color: rgba(0,0,0,0);
        color: black;
        border: 2px solid black;

    }
`

const breakPoints = [
    { width: 1, itemsToShow: 1 },

];

//slogans
//Uniting your property world with Pangea
// Bringing order to your property world, with Pangea.
//Managing your world, one property at a time with Pangea.

const Home = () => {


    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }
    return (
        <Background>
            <WelcomeBanner>
                <AllButtons onClick={handleLogin}>Login</AllButtons>
                Welcome To Pangea
                <AllButtons onClick={handleSignup}>Create Account</AllButtons>
            </WelcomeBanner>
            <DescriptionTitle style={{
                // fontStyle: "normal",
                backgroundColor: "rgba(0,0,0,0)",
                border: "none",
            }}>
               三 Managing your world, one property at a time 三
            </DescriptionTitle>
            <MainBlock>
                <Img></Img>
                <DescriptionBlock>
                    <DescriptionTitle>三 Whats up with Pangea? 三</DescriptionTitle>
                    <Description> Managing your rental property(ies) can easily become a time consuming and daunting task, however using the Pangea app helps save both time and effort. 
                        Connecting with tenants has never been easier thanks to Pangea's landlord tools that allow easy lease signing and rent payments. 
                        In addition, utilizing the app to track finances and organize work orders can help landlords save hours in running their properties. 
                        It is no wonder why so many professionals are choosing this app as their go-to tool for managing rental properties more efficiently.
                    </Description>
                </DescriptionBlock>
            </MainBlock>




            <CarouselBox>
                <StyledCarousel breakPoints={breakPoints} enableAutoPlay disableArrowsOnEnd={false} autoPlaySpeed={5000}>
                    <Item><CarouselPhoto src="screenshots/1.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/2.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/3.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/4.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/5.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/6.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/7.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/8.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/9.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/10.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/11.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/12.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/13.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/14.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/15.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/16.jpeg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="screenshots/17.jpeg"></CarouselPhoto></Item>
                </StyledCarousel>
                <DescriptionBlock>
                    <DescriptionTitle>三 Powerful Tools 三 </DescriptionTitle>
                    <Description> The app helps save time by consolidating all aspects of residential property management into one single dashboard.
                        From managing applications from renters, to handling any maintenance requests, Pangea gives landlords the ability to get everything done in minimal time. 
                    </Description>
                </DescriptionBlock>
            </CarouselBox>
            <CarouselBox>
                <DescriptionBlock>
                    <DescriptionTitle>三 Properties 三</DescriptionTitle>
                    <Description style={{
                        color: "white"
                    }}> It also comes with customizable automated processes that help keep track of payments and unit availability for landlords to better control their rental business. </Description>
                </DescriptionBlock>
                <StyledCarousel breakPoints={breakPoints} enableAutoPlay disableArrowsOnEnd={false} autoPlaySpeed={5000}>
                    <Item><CarouselPhoto src="photos/property1.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property2.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property3.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property4.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property5.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property6.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/property7.jpg"></CarouselPhoto></Item>
                </StyledCarousel>
            </CarouselBox>
            <CarouselBox>
                <StyledCarousel breakPoints={breakPoints} enableAutoPlay disableArrowsOnEnd={false} autoPlaySpeed={5000}>
                    <Item><CarouselPhoto src="photos/landlord1.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/landlord2.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/landlord3.jpg"></CarouselPhoto></Item>
                    <Item><CarouselPhoto src="photos/landlord5.jpg"></CarouselPhoto></Item>

                </StyledCarousel>
                <DescriptionBlock>
                    <DescriptionTitle>三 Empowered Landlords 三 </DescriptionTitle>
                    <Description> No matter how many units a landlord needs to manage or how contingent their systems were before, Pangea makes managing a property easier than ever!
                        See why these and many other landlords choose Pangea. 
                    </Description>
                </DescriptionBlock>
            </CarouselBox>

            <Footer />

        </Background>
    )
}

export default Home