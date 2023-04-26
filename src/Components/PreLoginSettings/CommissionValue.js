import { max } from 'moment/moment'
import React from 'react'
import { useState } from 'react'
import cogoToast from 'cogo-toast';
import styled from 'styled-components';
import { useEffect } from 'react';
import URLS from '../../utils/urls';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { preLoginAction } from '../../redux/admin/action';
import { Loader } from 'semantic-ui-react';
import { PreLoginCSs } from './PreLoginCss';


export default function CommissionValue({nextPage}) {

  const[option,setOption] = useState('percent')
  const[valError,setValError] = useState(true)
  const[comValue,setComValue] = useState(0)
  const[loading,setLoading] = useState(false);

  const FillCommissionType = async ()=>{
    setLoading(true);
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_COMMISSION_TYPE}${option}`)
      console.log("ResponseCommission",res)
      FillCommissionVal()
    }catch(err){
      console.log("err",err)
    }
  }

  const FillCommissionVal = async ()=>{
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_COMMISSION}${comValue?comValue:0}`)
      console.log("ResponseCommission i9999",res)
      nextPage();
    }catch(err){
      console.log("err",err)
    }
  }

  useEffect(() => {
    // setLoading(true)
    // console.log('comValue',Number(comValue) > 0 , option)
    if(option == "percent" &&  Number(comValue) > 100){
      setValError(true);
    }else if(Number(comValue)<0 || Number(comValue)==""){
      setValError(true);
    }else{
      setValError(false);
    }
  }, [comValue])

 
 
  console.log("comValue",comValue)

  return (
    <PreLoginCSs>
      <div className='main_body'>
        <div className='child1'>
          <h2>Please Select Commission Type</h2>
          <select onChange={(e)=>{setOption(e.target.value)}}>
            <option value="percent">Percentage</option>
            <option value="value">Default Fiat Currency</option>
          </select>
        </div>

        <div className='child2'>
          <h2>Enter Commission Amount</h2>
          <div className='grandchild2'>
            <input type="number" onChange={(e)=>{setComValue(e.target.value)}} className ={valError?"error":"error no"} placeholder='Amount>0'/>
            <p className={valError?"perr":"perr no"}>Please Enter A Valid Amount</p>
          </div>
          <button className={valError? "perr no":"btn"} onClick={()=>{FillCommissionType()}}>
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

