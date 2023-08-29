import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicSettings from '../AdminSettings';
import AccessCodes from '../AdminSettings/AdminAccess';
import CreateRoles from '../AdminSettings/Create Roles';
import KycOption from '../AdminSettings/KycOption';
import styled from 'styled-components';
import Networks from '../AdminSettings/Networks';
import AssignRoles from '../AdminSettings/Create Admin/AssignRoles';



export default function Settings() {

    const [activeTab,setActiveTab] = useState("platformSettings")
    const nevigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("basicSetting");

    useEffect(()=>{
        if(redirect=="adminProfile"){
            setActiveTab("platformSettings")
        }
    },[redirect])

    console.log("activeTab",activeTab)
    return (
        <Root>
        <div><h1>Admin Settings</h1></div>
        <div className='settings_main'>
            <div className='btn_div'>
                <button onClick={()=>{setActiveTab("platformSettings")}} className={activeTab=="platformSettings"?"btn on":"btn"}>Platform Settings</button>
                <button onClick={()=>{setActiveTab("permissions")}} className={activeTab=="permissions"?"btn on":"btn"}>Create Permissions</button>
                <button onClick={()=>{setActiveTab("createroles")}} className={activeTab=="createroles"?"btn on":"btn"}>Create Roles</button>
                <button onClick={()=>{setActiveTab("assignroles")}} className={activeTab=="assignroles"?"btn on":"btn"}>Assign Roles</button>
                {/* <button onClick={()=>{setActiveTab("accesscodes")}} className={activeTab=="accesscodes"?"btn on":"btn"}>Access Codes</button> */}
                <button onClick={()=>{setActiveTab("kycsettings")}} className={activeTab=="kycsettings"?"btn on":"btn"}>KYC Settings</button>
                <button onClick={()=>{setActiveTab("setting6")}} className={activeTab=="setting6"?"btn on":"btn"}>Networks</button>

            </div>
            <hr/>
            <div className='content_div'>
                {
                activeTab=="platformSettings"?<BasicSettings/>:
                activeTab =="permissions"?<AccessCodes/>: 
                activeTab =="createroles"?<CreateRoles/>:
                activeTab =="assignroles"?<AssignRoles/>:
                activeTab =="kycsettings"?<KycOption/>:
                activeTab =="setting6"?<Networks/>:
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
