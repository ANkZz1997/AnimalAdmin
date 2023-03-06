import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import styled from 'styled-components';
import {FaHome,FaUserAlt,FaRegAddressCard} from 'react-icons/fa'
import {RiAuctionFill} from 'react-icons/ri'
import {GiCardKingDiamonds} from 'react-icons/gi'
import {TbReplace} from 'react-icons/tb'
import {BiDna} from 'react-icons/bi'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {FiHelpCircle, FiSettings, FiLogOut} from 'react-icons/fi'
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAction } from '../../redux/admin/action';
// import { userLoginAction, userLogoutAction } from '../../redux/admin/action';



export default function Sidebar() {

  const [activeTab,setActiveTab] = useState("dashboard")
  const dispatch = useDispatch()

  const userLogoutAction = ()=>{
    dispatch(checkUserAction(false))
    localStorage.setItem("token","")
    cogoToast.success("Logout Successfully")
    window.location.replace("/")
  }

  console.log('ActiveTab',activeTab)

  return (
    <Root>
      <div className='menu_top'>
        <div className='company_logo'>
          <img
            src="https://sdnatech.com/img/Untitled-1.webp"
            alt="SDNA logo"
          />
        </div>

          <div>
            <h4 className="caption">ANALYTICS</h4>
          </div>
       
        <div className='nav_section nav_link'>
          <Link to ='/dashboard' className={activeTab=="dashboard"?"link_1 active":"link_1"} onClick={()=>setActiveTab("dashboard")}><FaHome/><h3>Dashboard</h3></Link>
          <div>
            <h4 className="caption">CONTENT</h4>
          </div>
          <Link to ='/user' className={activeTab=="user"?"link_2 active":"link_2"} onClick={()=>setActiveTab("user")}><FaUserAlt/><h3>User</h3></Link>
          <Link to ='/nfts' className={activeTab=="nfts"?"link_2 active":"link_2"} onClick={()=>setActiveTab("nfts")}><GiCardKingDiamonds/><h3>NFTs</h3></Link>
          <Link to ='/auction' className={activeTab=="auction"?"link_2 active":"link_2"} onClick={()=>setActiveTab("auction")}><RiAuctionFill/><h3>Auction</h3></Link>
          <Link to ='/marketplace' className={activeTab=="marketplace"?"link_2 active":"link_2"} onClick={()=>setActiveTab("marketplace")}><TbReplace/><h3>Marketplace</h3></Link>
          <Link to ='/bids' className={activeTab=="bids"?"link_2 active":"link_2"} onClick={()=>setActiveTab("bids")}><BiDna/><h3>Bids</h3></Link>
          <Link to ='/kyc' className={activeTab=="kyc"?"link_2 active":"link_2"} onClick={()=>setActiveTab("kyc")}><FaRegAddressCard/><h3>KYC</h3></Link>
          <Link to ='/chatsupport' className={activeTab=="chatsupport"?"link_2 active":"link_2"} onClick={()=>setActiveTab("chatsupport")}><BsFillChatDotsFill/><h3>Chat Support</h3></Link>
        </div>
      </div>

      <div  className='menu_button nav_link'>
        <div className='admin_profile2'>
          <img
            src="https://kalasalingam.ac.in/wp-content/uploads/2021/08/Achievements-dummy-profile.png"
            style={{ borderRadius: '60px' }}
            height="40"
            width="40"
            alt="antier logo"
          />
          &#160;&#160;
          <div className='admin_details'>
            Dummy Name
            <p>Admin</p>
        </div>
        </div>
        <Link to ='/' className={activeTab=="help"?"link_2 active":"link_2"} onClick={()=>setActiveTab("help")}><FiHelpCircle/><h3>Help</h3></Link>
        <Link to ='/'className={activeTab=="settings"?"link_2 active":"link_2"} onClick={()=>setActiveTab("settings")}><FiSettings/><h3>Settings</h3></Link>
        <button onClick={()=>{dispatch(userLogoutAction())}} className='link_2'><FiLogOut/><h3>Logout</h3></button>

      </div>

    </Root>
    
  )
}

const Root = styled.section`

display: flex;
flex-direction: column;
gap: 60px;
justify-content: space-between;
height: 100%;

.menu_top{

  .company_logo{
    padding: 10px 20px 10px 0px;
  }
  .nav_section{
    display: flex;
    flex-direction: column;
    gap: 4px;

    .link_1{
      text-decoration: none;
      display: flex;
      gap: 5px;
      justify-content: left;
      align-items: center;
      font-size: 20px;
      padding: 8px;
      padding-left: 10px;
      border-radius: 10px;
      color: whitesmoke;
    

      svg{
        font-size: 25px;
      }
    }
    .link_1.active, .link_1:hover{
      background-color: whitesmoke;
      color: black;
    }
    
  
  }
}
 .menu_button{
  display: flex;
  flex-direction: column;
  gap: 10px;

  .admin_profile2{
    display: flex;
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 5px;
    .admin_details{
      font-weight: 600;
      font-size: 18px;
      color: black;

      p{
        font-size: 12px;
        color: black;

      }
    }
  }
  button{
    background-color: transparent;
    border: none;
  }
}
.link_2{
      text-decoration: none;
      display: flex;
      gap: 5px;
      justify-content: left;
      align-items: center;
      font-size: 17px;
      font-weight: 600;
      padding: 10px;
      border-radius: 10px;
      color: whitesmoke;
      padding-left: 10px;
    }
    .link_2.active, .link_2:hover{
      background-color: whitesmoke;
      color: black;
    }

.caption{
  margin-top: 5px;
  color: grey;
  padding: 10px;
}



`

