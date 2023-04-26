import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import URLS from '../../utils/urls';

export default function BasicPreLoginEdit({currentData, closeIt}) {
    const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
    console.log("currentData",currentData)

  return (
    <Root>
        <button className='btnbtn2' onClick={()=>{closeIt(false)}}>Close</button>
         <div className='prelogin_body2'>
            <div className='body_child2'>
                <div><h5>Title</h5><input value={currentData?.platformTitle}></input></div>
                <div><h5>Pinata Key</h5><input value={currentData?.pinataApiKey}></input></div>
                <div><h5>Pinata Secret</h5><input value={currentData?.pinataSecret}></input></div>
                <div><h5>Stripe CallBack</h5><input value={currentData?.stripeCallbackUrl}></input></div>
                <div><h5>Stripe Secret</h5><input value={currentData?.stripeSecret}></input></div>
                <div><h5>Lazy Minting</h5>{currentData?.stripeSecret? <button>False</button>: <button>True</button>}</div>
                <div><h5>Commission</h5><input value={currentData?.commission}></input></div>
                <div><h5>Commission Type</h5><input value={currentData?.commissionType}></input></div>
            </div>
            <div className='admin_logo2'>
                <img src={`${IMAGE_END_POINT}${currentData?.platformLogo}`}/>
                <h4>{currentData?.platformTitle} Logo</h4>
            </div>
        </div>
        <button className='btnbtn2'>Save Changes</button>
    </Root>
  )
}

const Root = styled.section`

background-color: #070c27;
padding: 5px;
width: 80%;
border: 1px solid;

.btnbtn2{
    padding:3px;
    font-size: 20px;
}

.prelogin_body2{
  display: flex;
  gap: 10px;
  justify-content: space-between;
  @media(max-width:600px){
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }

  .admin_logo2{
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

  .body_child2{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    padding: 20px;
    justify-content: center;
   
    >div{
      display: flex;
      gap: 10px;
      h5{
        margin:0;
        padding:0;
        min-width: 120px;
      }
      input{
        width: 100%;
        border: none;
        padding: 3px;
      }
     
    }
  }
}

`
