import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Banners from './Banners'
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
                <button onClick={()=>{setActiveTab("setting3")}} className={activeTab=="setting3"?"btn on":"btn"}>Settings 3</button>
                <button onClick={()=>{setActiveTab("setting4")}} className={activeTab=="setting4"?"btn on":"btn"}>Settings 4</button>
                <button onClick={()=>{setActiveTab("setting5")}} className={activeTab=="setting5"?"btn on":"btn"}>Settings 5</button>
                <button onClick={()=>{setActiveTab("setting6")}} className={activeTab=="setting6"?"btn on":"btn"}>Settings 6</button>
            </div>
            <hr/>
            <div className='content_div'>
                {activeTab=="banner"?<Banners/>:
                activeTab=="platformfee"?<PlatformCharge/>:
                activeTab =="setting3"?<h2>Settings 3</h2>:
                activeTab =="setting4"?<h2>Settings 4</h2>: 
                activeTab =="setting5"?<h2>Settings 5</h2>:
                activeTab =="setting6"?<h2>Settings 6</h2>:
                " "
                }
            </div>
        </div>
        {/* <table>
            <tbody>
                <tr>
                    <td>
                    <Link to={"/appsettings/bannersettings"}>
                        <h3>Banner Settings in Mobile Application {">"}</h3>
                    </Link>
                    </td>
                </tr>
                <tr>
                    <td>
                    <Link to={"/appsettings/platformcharge"}>
                        <h3>Set the Platform fees per transaction {">"}</h3>
                    </Link>
                    </td>
                </tr> <tr>
                    <td><h3>Settings 3 {">"}</h3></td>
                </tr> <tr>
                    <td><h3>Settings 4{">"}</h3></td>
                </tr> <tr>
                    <td><h3>Settings 5 {">"}</h3></td>
                </tr> <tr>
                    <td><h3>Settings 6{">"}</h3></td>
                </tr>
            </tbody>
        </table> */}
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
        h2{
            padding: 20px;
        }
    }
}

`
