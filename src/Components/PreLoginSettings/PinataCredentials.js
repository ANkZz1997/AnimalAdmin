import React, { useState } from 'react'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https'
import axios from 'axios'
import styled from 'styled-components'
import { PreLoginCSs } from './PreLoginCss'
import { Loader } from 'semantic-ui-react'

export default function PinataCredentials({nextPage}) {

  const [pinKey,setPinKey] = useState("")
  const [pinSecret, setPinSecret] = useState("")
  const [loading, setLoading] = useState(false)
  const pinataKey = async ()=>{
    setLoading(true);
    const data = {
      pinataApiKey: pinKey,
      pinataSecret: pinSecret
    }
    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_PINATA_CREDINTIALS}`,data,configAxios)
      nextPage()

    }catch(err){
      console.log("err",err)
    }
  }

  console.log("pinataCredentials",pinKey,pinSecret )
  return (
    <PreLoginCSs>
      <div className='main_body'>
        <h1>Set Your Pinata Credentials To Continue</h1>
        <div className='child2'>
          <h2>Set Pinata Key </h2>
          <input onChange={(e)=>{setPinKey(e.target.value)}}/>
          <h2>Set Pinata Secret </h2>
          <input onChange={(e)=>{setPinSecret(e.target.value)}}/>
          <button onClick={()=>{pinataKey()}} className={pinKey&&pinSecret?"btn": "perr no"}>
            {loading ? (
              <Loader size="small" active inline="loading" />
            ) : (
              'Save & Next'
            )}
          </button>
        </div>
      </div>

    </PreLoginCSs>

  )
}
