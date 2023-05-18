import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { RiUserSettingsLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import CreateRoles from '../Create Roles'
import AccessCodes from '../AdminAccess'

export default function BasicSettingAccess() {
    const[basicActive,setBasicActive] = useState(false)
    const[basicActive2,setBasicActive2] = useState(false)
    const[basicActive3,setBasicActive3] = useState(false)
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("basicSetting");
    const nevigate = useNavigate();

  useEffect(()=>{
    if(redirect=="adminProfile"){
      setBasicActive3(true);
      setBasicActive2(false);
      setBasicActive(false);
    }
  },[redirect])
  console.log("redirect",redirect)

  return (
    <Root>
    <button onClick={()=>{setBasicActive(!basicActive);nevigate("?basicSettingAccess=adminRoles")}}><h5>All Admin Roles</h5></button>
    <div className={basicActive?"makeActive":"makeActive no"}><CreateRoles/></div>
    <button onClick={()=>{setBasicActive2(!basicActive2);nevigate("?basicSetting=AccessCodeList")}}><h5>List Of Access Code</h5></button>
    <div className={basicActive2?"makeActive":"makeActive no"}><AccessCodes/></div>
    <button onClick={()=>{setBasicActive3(!basicActive3);nevigate("?basicSetting=manageAccess")}}><h5>Manage Access</h5></button>
    <div className={basicActive3?"makeActive":"makeActive no"}></div>
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
