import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import styled from 'styled-components';
import {FaHome,FaUserAlt,FaRegAddressCard} from 'react-icons/fa'
import {RiAuctionFill} from 'react-icons/ri'
import {GiCardKingDiamonds} from 'react-icons/gi'
import {TbReplace} from 'react-icons/tb'
import {BiDna} from 'react-icons/bi'
import {BsFillChatDotsFill} from 'react-icons/bs'
import {FiSettings, FiLogOut} from 'react-icons/fi'
import cogoToast from "cogo-toast";
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAction } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import { scrollTopFunction } from '../../utils/https';
// import { userLoginAction, userLogoutAction } from '../../redux/admin/action';



export default function Sidebar() {
  const navigate = useNavigate()
  const currentUrl = window.location.href
  const activeParam = currentUrl.replace('?',"/").split('/')[3];
  const [activeTab, setActiveTab] = useState("/dashboard")
  const dispatch = useDispatch()
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const logo = useSelector((state)=>state?.persistReducer?.preLogData?.platformLogo)

  const userLogoutAction = ()=>{
    dispatch(checkUserAction(false))
    localStorage.setItem("token","")
    cogoToast.success("Logout Successfully")

  }

  useEffect(()=>{
    scrollTopFunction()
    setActiveTab(activeParam)
  },[activeParam])

  console.log("activeTab",activeParam)
  // onClick={()=>setActiveTab("user")}

  return (
    <Root>
      <div className='menu_top'>
        <div className='company_logo'>
          <img className='com_img'
            src={`${IMAGE_END_POINT}${logo}`}
            alt="SDNA logo"
          />
        </div>

        <div>
          <h4 className="caption">ANALYTICS</h4>
        </div>
       
        <div className='nav_section nav_div'>
          <div onClick={()=>{ navigate('/dashboard')}} className={activeTab == "dashboard"?"div_1 active":"div_1"} 
            ><FaHome/><h3>Dashboard</h3>
          </div>
          <div><h4 className="caption">CONTENT</h4></div>
          <div  onClick={()=>{ navigate('/user?type=alluser')}} className={activeTab == "user"?"div_2 active":"div_2"} 
            ><FaUserAlt/><h3>User</h3>
          </div>
          <div onClick={()=>{ navigate('/nfts')}} className={activeTab == "nfts"?"div_2 active":"div_2"} 
            ><GiCardKingDiamonds/><h3>NFTs</h3>
          </div>
          <div onClick={()=>{ navigate('/auction')}} className={activeParam == "auction"?"div_2 active":"div_2"} 
            ><RiAuctionFill/><h3>Auction</h3>
          </div>
          <div onClick={()=>{ navigate('/marketplace')}} className={activeParam == "marketplace"?"div_2 active":"div_2"} 
            ><TbReplace/><h3>Marketplace</h3>
          </div>
          <div onClick={()=>{ navigate('/bids')}} className={activeParam == "bids"?"div_2 active":"div_2"} 
            ><BiDna/><h3>Bids</h3>
          </div>
          <div onClick={()=>{ navigate('/kyc')}} className={activeParam == "kyc"?"div_2 active":"div_2"} 
            ><FaRegAddressCard/><h3>KYC</h3>
          </div>
          <div onClick={()=>{ navigate('/chatsupport')}} className={activeParam == "chatsupport"?"div_2 active":"div_2"} 
            ><BsFillChatDotsFill/><h3>Chat Support</h3>
          </div>
        </div>
      </div>

      <div  className='menu_button nav_div'>
        <hr/>
        <div onClick={()=>{ navigate('/mobilesettings')}} className={activeParam == "mobilesettings"?"div_2 active":"div_2"} 
          ><FiSettings/><h3>Mobile Settings</h3>
        </div>
        <div onClick={()=>{ navigate('/platformsettings')}} className={activeParam == "platformsettings"?"div_2 active":"div_2"} 
          ><FiSettings/><h3>Platform Settings</h3>
        </div>
        <button onClick={()=>{ navigate('/login'); dispatch(userLogoutAction())}} className='div_2'><FiLogOut/><h3>Logout</h3></button>
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
    text-align: center;
    .com_img{
      border-style: none;
      height: 60px;
      width: 200px;
      object-fit: contain;
    }
  }

  .nav_section{
    display: flex;
    flex-direction: column;
    gap: 4px;

    .div_1{
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
    .div_1.active, .div_1:hover{
      background-color: whitesmoke;
      color: black;
      cursor: pointer;
    }
    
  
  }
}
 .menu_button{
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;

  .admin_profile2{
    display: flex;
    background-color: whitesmoke;
    border-radius: 10px;
    padding: 5px;
    img{
      object-fit: cover;
    }
    .admin_details{
      font-weight: 600;
      font-size: 18px;
      color: black;
      text-transform: capitalize;

      p{
        font-size: 12px;
        color: black;

      }
    }
  }
  button{
    background-color: transparent;
    border: none;
    cursor: pointer;

  }
}
.div_2{
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
    .div_2.active, .div_2:hover{
      background-color: whitesmoke;
      color: black;
      cursor: pointer;
    }

.caption{
  margin-top: 5px;
  color: grey;
  padding: 10px;
}



`

