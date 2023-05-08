import React, { useEffect } from 'react'
import styled from 'styled-components'
import KycOption from './KycOption'
import { useState } from 'react'
import BasicPreLogin from './BasicPreLogin'
import AdminProfile from './AdminProfile'
import { RiUserSettingsLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'


export default function BasicSettings() {

  const[basicActive,setBasicActive] = useState(false)
  const[basicActive2,setBasicActive2] = useState(false)
  const[basicActive3,setBasicActive3] = useState(false)
  const[basicActive4,setBasicActive4] = useState(false)
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("basicSetting");
  const nevigate = useNavigate();

  useEffect(()=>{
    if(redirect=="adminProfile"){
      setBasicActive3(true);
      setBasicActive4(false);
      setBasicActive2(false);
      setBasicActive(false);
    }
  },[redirect])
  console.log("redirect",redirect)

  return (
    <Root>
      <button onClick={()=>{setBasicActive(!basicActive);nevigate("?basicSetting=prelogin")}}><h5>Pre-Login Settings List</h5></button>
      <div className={basicActive?"makeActive":"makeActive no"}><BasicPreLogin/></div>
      <button onClick={()=>{setBasicActive2(!basicActive2);nevigate("?basicSetting=kycOption")}}><h5>KYC Options Setting</h5></button>
      <div className={basicActive2?"makeActive":"makeActive no"}><KycOption/></div>
      <button onClick={()=>{setBasicActive3(!basicActive3);nevigate("?basicSetting=adminProfile")}}><h5>Admin Profile</h5></button>
      <div className={basicActive3?"makeActive":"makeActive no"}><AdminProfile/></div>
      <button onClick={()=>{setBasicActive4(!basicActive4);nevigate("?basicSetting=setting4")}}><h5>Setting 4</h5></button>
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
