import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Banners from '../Banners'
import AccessCode from './AccessCode'
import PlatformCharge from './PlatformCharge'

export default function Settings() {

    const [activeTab,setActiveTab] = useState("banner")

    console.log("activeTab",activeTab)
    return (
        <Root>
        <div><h1>App Settings Page</h1></div>
        <div className='settings_main'>
            <div className='btn_div'>
                <button onClick={()=>{setActiveTab("banner")}} className={activeTab=="banner"?"btn on":"btn"} >Banner</button>
                <button onClick={()=>{setActiveTab("platformfee")}} className={activeTab=="platformfee"?"btn on":"btn"}>Platform Fee</button>
                <button onClick={()=>{setActiveTab("accesscodes")}} className={activeTab=="accesscodes"?"btn on":"btn"}>Create Admin User</button>
                <button onClick={()=>{setActiveTab("setting4")}} className={activeTab=="setting4"?"btn on":"btn"}>Settings 4</button>
                <button onClick={()=>{setActiveTab("setting5")}} className={activeTab=="setting5"?"btn on":"btn"}>Settings 5</button>
                <button onClick={()=>{setActiveTab("setting6")}} className={activeTab=="setting6"?"btn on":"btn"}>Settings 6</button>
            </div>
            <hr/>
            <div className='content_div'>
                {activeTab=="banner"?<Banners/>:
                activeTab=="platformfee"?<PlatformCharge/>:
                activeTab =="accesscodes"?<AccessCode/>:
                activeTab =="setting4"?<h2 className='h2element'>Settings 4</h2>: 
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
