import React, { useState } from 'react'
import URLS from '../../utils/urls'
import styled from 'styled-components'
import axios from 'axios'
import { PreLoginCSs } from './PreLoginCss'
import { Loader } from 'semantic-ui-react'

export default function StripeSecret({nextPage}) {
  const[stripe,setStripe] = useState()
  const[loading,setLoading] = useState(false);


  const stripeSec = async () =>{
    setLoading(true);
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_STRIPE_SECRET}${stripe}`);
      nextPage();

    }catch(err){
      console.log("err",err)
    }
  }

    console.log("stripe",stripe)

  return (
    <PreLoginCSs>
      <div className='main_body'>
        <h2>
          Please Fill your Stripe Secret 
        </h2>
        <div className='grandchild2'>
          <input onChange={(e)=>{setStripe(e.target.value)}}/>
          <button className={stripe?"btn":"perr no"} onClick={()=>{stripeSec()}}>
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

