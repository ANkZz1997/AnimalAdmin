import axios from 'axios'
import React, { useState } from 'react'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https';
import styled from 'styled-components';

export default function LazyMinting({handleApiCall}) {

  const [lazy, setLazy] = useState();


  const lazyMint = async()=>{

    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_LAZY_MINTING}${lazy}`,configAxios);
      handleApiCall()
  
    }catch(err){
      console.log("err",err)
    }

  }
  

  console.log("lazyMinting",lazy)

  return (
    <Root>Set Lazy Minting Feature....
    <button onClick={()=>{setLazy("true")}}>Enable</button>
    <button onClick={()=>{setLazy("false")}}>Diable</button>

    <button className={lazy?"btn":"btn no"} onClick={()=>{lazyMint()}}>Click to send i am great</button>
    </Root>
  )
}

const Root = styled.section`

.btn{
  padding: 10px;
}

.btn.no{
  display: none;
}

`
