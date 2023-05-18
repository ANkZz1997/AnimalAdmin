import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CreateRoles from '../Create Roles'
import AccessCodes from '../AdminAccess'
import Networks from '../Networks'
import BasicSettings from '../BasicSettings'
import { useNavigate } from 'react-router-dom'
import BasicSettingAccess from '../BasicSettingsAccess'


export default function Settings() {

    const [activeTab,setActiveTab] = useState("basicSettings")
    const nevigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("basicSetting");

    useEffect(()=>{
        if(redirect=="adminProfile"){
            setActiveTab("basicSettings")
        }
    },[redirect])

    console.log("activeTab",activeTab)
    return (
        <Root>
        <div><h1>Platform Settings</h1></div>
        <div className='settings_main'>
            <div className='btn_div'>
                <button onClick={()=>{setActiveTab("basicSettings");nevigate('?basicSettings')}} className={activeTab=="basicSettings"?"btn on":"btn"}>Basic Settings</button>
                <button onClick={()=>{setActiveTab("accesscodes");nevigate('?accessCodeSettings')}} className={activeTab=="accesscodes"?"btn on":"btn"}>Access Codes</button>
                {/* <button onClick={()=>{setActiveTab("adminuser");nevigate('?adminRoles')}} className={activeTab=="adminuser"?"btn on":"btn"}>Admin Roles</button> */}
                {/* <button onClick={()=>{setActiveTab("setting5");nevigate('?manageAccess')}} className={activeTab=="setting5"?"btn on":"btn"}>Manage Access</button> */}
                <button onClick={()=>{setActiveTab("setting6");nevigate('?networkSettings')}} className={activeTab=="setting6"?"btn on":"btn"}>Networks</button>
                {/* <button onClick={()=>{setActiveTab("setting7");nevigate('?accessCodeSettings')}} className={activeTab=="setting6"?"btn on":"btn"}>Access Codes</button> */}

            </div>
            <hr/>
            <div className='content_div'>
                {
                activeTab=="basicSettings"?<BasicSettings/>:
                activeTab =="accesscodes"?<BasicSettingAccess/>:
                // activeTab =="adminuser"?<CreateRoles/>: 
                // activeTab =="setting5"?<h2 className='h2element'>Settings 5</h2>:
                activeTab =="setting6"?<Networks/>:
                // activeTab =="setting7"?<BasicSettingAccess/>:
                " "
                }
            </div>
        </div>
        </Root>
  )
}

const Root = styled.section`
color: whitesmoke;

.settings_main{

    .btn_div{
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        .btn.on{
            border-bottom: 2px solid green;
        }
        .btn{
            padding: 10px 2px 10px 2px;
            font-size: 16px;
            background-color: transparent;
            border: none;
            color: white;
            border-bottom: 2px solid #0000;
            margin: 5px 5px 10px 5px;
            :hover{
                color: green;
                border-bottom: 2px solid green;
            }
        }
    }
    .content_div{
        padding: 20px;
    }
}

`
