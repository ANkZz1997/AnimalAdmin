import React from 'react'
import URLS from '../../utils/urls'
import axios from 'axios'
import { useState } from 'react'
import { PreLoginCSs } from './PreLoginCss'
import { Loader } from 'semantic-ui-react'

export default function StripeCallback({nextPage}) {
    const [callData, setCallData] = useState("")
    const[loading,setLoading] = useState(false);

    const StrCall = async () =>{
        setLoading(true);
        const data = {
            stripeCallbackUrl: callData
        }
        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_STRIPE_CALLBACK}`,data)
            console.log("res",res)
            nextPage();

        }catch(error){
            console.log(error)
        }
    }

    console.log("calldata",callData)

  return (
    <PreLoginCSs>
        <div className='main_body'>
            <div className='child1'>
                <h2>Please Enter Stripe Callback</h2>
                <input onChange={(e)=>{setCallData(e.target.value)}}/>

                <button className={!callData? "perr no":"btn"} onClick={()=>{StrCall()}}>
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
