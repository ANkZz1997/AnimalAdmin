import React, { useState } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { BiMenu } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import URLS from '../../utils/urls'
import NotificationBar from './NotificationBar'
import { FaWallet } from 'react-icons/fa'

export default function Topbar() {

  const [toggle,setToggle] = useState(false)
  const [notifyToggle, setNotifyToggle] = useState(false);
  const userCheck = useSelector((state)=>state?.persistReducer?.adminDetails)
  const nevigate = useNavigate()
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;


  return (
    <Root>
      <div className="admin_profile">
      <div className='click_menu' onClick={()=>setToggle(!toggle)}><BiMenu/></div>
      <div className='admin_details_notification'>
  
        <div className='notification_point' onClick={()=>{nevigate("/notification")}}>
          <IoIosNotifications/>
          <div className={notifyToggle?"notify": "notify off"}>
            <NotificationBar/>
          </div>
          <div className="notify_child">21</div>
        </div>
        <div className='wallet_amount'>
            <span><FaWallet/></span>
            <h3>51.28 Eth</h3>
        </div>
        <div className="admin_details" onClick={()=>{nevigate("profileadmin")}}>
          <img
            src={`${IMAGE_END_POINT}${userCheck?.avatar}`}
            style={{ borderRadius: '60px' }}
            height="40"
            width="40"
            alt="antier logo"
          />
          &#160;&#160;
          <div className="notify_parent" >
            Welcome {userCheck?.name}
            <p>@{userCheck?.username}</p>
            {/* <div className="notify_child"> 21</div> */}
          </div>
        </div>
      </div>
    </div>
    <div className={toggle?"toggle_on":"toggle_off"} onClick={()=>setToggle(!toggle)}>
      <div className='toggle_sidebar' onClick={()=>setToggle(!toggle)} >
          <Sidebar />
      </div>
      <div className='back_blur'>
      </div>
    </div>

      </Root>
  )
}

const Root = styled.section`
/* position: fixed;
width: 100%; */
background-color: #070c27;
/* z-index:5; */

    .admin_profile {
      display: flex;
      justify-content: end;
      cursor: pointer;
      padding: 10px;
      .update_admin{
        position: fixed;
        background-color: red;
        top:0;
      }
      .click_menu{
        color: white;
        font-size: 30px;
        padding: 20px;
        margin-right:auto;
        display:none;
        @media(max-width: 1000px){
          display:unset;
        }
      }
      .admin_details_notification{
        display: flex;
        .admin_details{
          /* background-color: white; */
          color: white;
          display: flex;
          padding: 5px;
          margin: 15px 5px 5px 5px;
          border-radius: 10px;
          :hover{
          background-color: grey;
        }
          img{
            object-fit: cover;
          }
          .notify_parent {
          font-weight: 600;
          font-size: 18px;
          position: relative;
          text-transform: capitalize;
          /* .notify_child {
            position: absolute;
            top: 0;
            background: #ff555f;
            padding: 3px;
            border-radius: 50%;
            font-size: 15px;
            right: 0;
            margin-top: -18px;
            margin-right: -18px;
            font-weight: 800;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
          } */
        }
        p {
          font-size: 12px;
        }
        }
        .notification_point{
          color: white;
          padding: 5px;
          margin: 15px 5px 5px 5px;
          display: flex;
          align-items: center;
          font-size: 35px;
          position: relative;
          border-radius: 10px;
          :hover{
            background-color: grey;
          }

          .notify{
            position: fixed;
            position: fixed;
            background: #070c27;
            top: 0;
            margin-top: 65px;
            right: 0;
            width: 400px;
            border: 1px solid;
            height: 90%;
            margin-right: 10px;
            padding: 9px;
      }
          }
          .notify.off{
            display: none;
          }
          
            .notify_child {
              position: absolute;
              top: 0;
              background: #ff555f;
              padding: 0px;
              border-radius: 50%;
              font-size: 15px;
              right: 0;
              margin-top: -5px;
              margin-right: -2px;
              font-weight: 600;
              width: 23px;
              height: 23px;
              display: flex;
              align-items: center;
              justify-content: center;
          }
        }

        .wallet_amount{
          margin: 15px 5px 5px 5px;
          padding: 5px;
          border: 1px solid grey;
          color: white;
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          border-radius: 10px;
          span{
            font-size: 20px;
          }
        }
      }

    .toggle_on{
      color:  white;
      backdrop-filter: blur(2px);
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;

      .toggle_sidebar{
        width: 240px;
        padding: 20px 10px 20px 20px;
        border-right: 1px solid #3b3b3b;
        gap: 60px;
        position: sticky;
        overflow-x: scroll;
        height: 100vh;
        z-index: 999;
        top: 0px;
        position: relative;
        background: #070c27;
        ::-webkit-scrollbar{
            display: none;
        }
    }
    .back_blur{

    }
    }
    .toggle_off{
      display: none;
    }
   
`