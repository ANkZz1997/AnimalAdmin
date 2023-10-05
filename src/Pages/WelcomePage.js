import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

export default function WelcomePage() {
    const adminRole = useSelector(
        (state) => state?.persistReducer?.adminDetails.role.name
      );

      console.log("adminRole",adminRole)
  return (
    <Root>
        <h1>Welcome To ArtCod3 Platform !!</h1>
        <h2>Your role in this platform is "{adminRole}", We wish you all the best for today's work...</h2>
    </Root> 
  )
}

const Root = styled.section`

color: white;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 50%;
gap: 20px;
text-align: center;

h1,h2{
    padding:0;
    margin: 0;
}

`
