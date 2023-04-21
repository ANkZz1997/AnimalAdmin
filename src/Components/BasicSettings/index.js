import React from 'react'
import styled from 'styled-components'
import KycOption from './KycOption'
import { useState } from 'react'
import BasicPreLogin from './BasicPreLogin'


export default function BasicSettings() {

  const[basicActive,setBasicActive] = useState(false)
  const[basicActive2,setBasicActive2] = useState(false)
  const[basicActive3,setBasicActive3] = useState(false)
  const[basicActive4,setBasicActive4] = useState(false)


  console.log("basicActive",basicActive)

  return (
    <Root>
      <button onClick={()=>{setBasicActive(!basicActive)}}><h5>Pre-Login Settings List</h5></button>
      <div className={basicActive?"makeActive":"makeActive no"}><BasicPreLogin/></div>
      <button onClick={()=>{setBasicActive2(!basicActive2)}}><h5>KYC Options Setting</h5></button>
      <div className={basicActive2?"makeActive":"makeActive no"}><KycOption/></div>
      <button onClick={()=>{setBasicActive3(!basicActive3)}}><h5>Setting 3</h5></button>
      <div className={basicActive3?"makeActive":"makeActive no"}>Setting 3</div>
      <button onClick={()=>{setBasicActive4(!basicActive4)}}><h5>Setting 4</h5></button>
      <div className={basicActive4?"makeActive":"makeActive no"}>Setting 4</div>
    </Root>
  )
}

const Root = styled.section`

display: flex;
flex-direction: column;
gap: 5px;
button{
  background-color: #11183f;
  color: white;
  text-align: left;
  padding: 10px;
  border: 0;
  :hover{
    background-color: #40404d;
  }
}

.makeActive{
  display: block;
}
.makeActive.no{
  display: none;
}

`
