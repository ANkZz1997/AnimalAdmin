import axios from 'axios'
import React, { useState } from 'react'
import URLS from '../../utils/urls'
import { PreLoginCSs } from './PreLoginCss';


export default function LazyMinting({nextPage}) {


  const lazyMint = async(lazy)=>{

    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_LAZY_MINTING}${lazy}`);
      nextPage()
  
    }catch(err){
      console.log("err",err)
    }

  }
  

  return (
    <PreLoginCSs>
       <div className='main_body'>
            <div className='child1'>
            <h2>Set Lazy Minting Feature</h2>
            <div className='lazy_bdy'>
              <button onClick={()=>{lazyMint("true")}}>Enable</button>
              <button onClick={()=>{lazyMint("false")}}>Diable</button>
            </div>
            {/* <button className={!lazy==0?"btn":"perr.no"} onClick={()=>{lazyMint()}}>Click to send i am great</button> */}
  
            </div>
        </div>
      
    </PreLoginCSs>
  )
}

