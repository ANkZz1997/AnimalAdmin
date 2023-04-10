import React, { useState } from 'react'
import styled from 'styled-components'
import PlatformCharge from '../PlatformFees/PlatformCharge'
import CreateRoles from '../Create Roles'
import AccessCodes from '../AdminAccess'


export default function Settings() {

    const [activeTab,setActiveTab] = useState("platformfee")

    console.log("activeTab",activeTab)
    return (
        <Root>
        <div><h1>Platform Settings</h1></div>
        <div className='settings_main'>
            <div className='btn_div'>
                <button onClick={()=>{setActiveTab("platformfee")}} className={activeTab=="platformfee"?"btn on":"btn"}>Platform Fee</button>
                <button onClick={()=>{setActiveTab("accesscodes")}} className={activeTab=="accesscodes"?"btn on":"btn"}>Access Codes</button>
                <button onClick={()=>{setActiveTab("adminuser")}} className={activeTab=="adminuser"?"btn on":"btn"}>Admin Roles</button>
                <button onClick={()=>{setActiveTab("setting5")}} className={activeTab=="setting5"?"btn on":"btn"}>Manage Access</button>
                <button onClick={()=>{setActiveTab("setting6")}} className={activeTab=="setting6"?"btn on":"btn"}>Manage Access</button>
            </div>
            <hr/>
            <div className='content_div'>
                {
                activeTab=="platformfee"?<PlatformCharge/>:
                activeTab =="accesscodes"?<AccessCodes/>:
                activeTab =="adminuser"?<CreateRoles/>: 
                activeTab =="setting5"?<h2 className='h2element'>Settings 5</h2>:
                activeTab =="setting6"?<h2 className='h2element'>Settings 6</h2>:
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
