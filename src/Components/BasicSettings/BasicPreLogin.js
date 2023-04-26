import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { preLoginAction } from '../../redux/admin/action';
import { useState } from 'react';
import URLS from '../../utils/urls';
import {AiFillEdit} from 'react-icons/ai'
import cogoToast from 'cogo-toast';
import BasicPreLoginEdit from './BasicPreLoginEdit';

export default function BasicPreLogin() {

  const [editWindow,setEditWindow] = useState(false)

  const dispatch = useDispatch();
  const [settingData, setSettingData] = useState({});
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;


  const callback = (data)=>{
    console.log("datadata",data)
    setSettingData(data)
  }

  const getAllSettings = ()=>{
    dispatch(preLoginAction({},callback))
  }

  useEffect(()=>{
    getAllSettings();
  },[])

  console.log("settingData",settingData)

  return (
   <Root>
    <div className='head_bar'>
      <h3>Below Settings Are Very Important...</h3>
      <button onClick={()=>{setEditWindow(true)}}><AiFillEdit/></button>
    </div>
    <div className='prelogin_body'>
      <div className='body_child'>
        <div><h5>Title</h5><p>{settingData?.platformTitle}</p></div>
        <div><h5>Pinata Key</h5><p>{settingData?.pinataApiKey}</p></div>
        <div><h5>Pinata Secret</h5><p>{settingData?.pinataSecret}</p></div>
        <div><h5>Stripe CallBack</h5><p>{settingData?.stripeCallbackUrl}</p></div>
        <div><h5>Stripe Secret</h5><p>{settingData?.stripeSecret}</p></div>
        <div><h5>Lazy Minting</h5><p>{settingData?.lazymint?"True":"False"}</p></div>
        <div><h5>Commission</h5><p>{settingData?.commission}</p></div>
        <div><h5>Commission Type</h5><p>{settingData?.commissionType}</p></div>
        <div><h5>Admin Private Key</h5><p>{settingData?.adminPrivateKey?settingData.adminPrivateKey:"No Key Entered"}</p></div>
        <div><h5>Created On</h5><p>{settingData?.createdAt}</p></div>
        <div><h5>Updated On</h5><p>{settingData?.updatedAt}</p></div>
      </div>
      <div className='admin_logo'>
        <img src={`${IMAGE_END_POINT}${settingData?.platformLogo}`}/>
        <h4>{settingData?.platformTitle} Logo</h4>
      </div>
    </div>

    <div className={editWindow?"prelogedit":"prelogedit no"}>
      <BasicPreLoginEdit currentData={settingData} closeIt={(e)=>{setEditWindow(e)}}/>
    </div>
    
   </Root>
  )
}

const Root = styled.section`

padding: 20px;
border: 1px solid;
.head_bar{
  display: flex;
  justify-content: space-between;
  button{
    padding:3px;
    font-size: 20px;
  }
  margin-bottom: 10px;
}
.prelogin_body{
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @media(max-width:600px){
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .admin_logo{
    /* background-color: red; */
    min-width: 200px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: top;
    img{
      height: 190px;
      width: 190px;
      object-fit: contain;
      border: 2px solid;
    }

  }

  .body_child{
    display: flex;
    flex-direction: column;
    gap: 5px;
   
    >div{
      display: flex;
      gap: 10px;
      h5{
        margin:0;
        padding:0;
        min-width: 120px;

      }
      p{
        word-break: break-all;
      }
    }
  }
}

.prelogedit{
  position: fixed;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
  z-index:999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
}

.prelogedit.no{
  display: none;
}

`
