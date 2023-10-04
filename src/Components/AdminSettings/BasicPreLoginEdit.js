import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import URLS from '../../utils/urls';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { useDispatch } from 'react-redux';
import { preLoginAction } from '../../redux/admin/action';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function BasicPreLoginEdit({ currentData, closeIt }) {
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [activeSetting, setActiveSetting] = useState("setting1")
  const [inputFile, setInputFile] = useState([]);
  const [pinataKey,setPinataKey]= useState(currentData?.pinataApiKey);
  const [pinataSecret,setPinataSecret]= useState(currentData?.pinataSecret);
  const [stripeSecret,setStripeSecret]= useState(currentData?.stripeSecret);
  const [stripeCallback,setStripeCallback]= useState(currentData?.stripeCallbackUrl);
  const [commissionType, setCommissionType] = useState(currentData?.commissionType);
  const [commissionValue, setCommissionValue] = useState(currentData?.commission);
  const [companyTitle, setCompanyTitle] = useState(currentData?.platformTitle);
  const [lazyMinting,setLazyMinting] = useState(currentData?.lazymint)

  const dispatch = useDispatch();

  const userCallback = (data) => {
  };

  const ApiRefresh = ()=>{
    dispatch(preLoginAction({},userCallback))
  }

  const AddNameLogo = async()=>{
    let Data = new FormData();
    Data.append("platformTitle",companyTitle?companyTitle:"")
    Data.append("logo",inputFile[0]?inputFile[0]:"")
    try{
        const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_PLATFORM_DETAILS}`,Data)
        ApiRefresh()
        cogoToast.success("Changes Made Successfully")
        console.log("resres",res)
        closeIt(false) 
    }catch(error){
        console.log(error)
    }
}

const AddPinataKey = async ()=>{
  const data = {
    pinataApiKey: pinataKey,
    pinataSecret: pinataSecret
  }
  try{
    const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_PINATA_CREDINTIALS}`,data)
    ApiRefresh()
      cogoToast.success("Changes Made Successfully")
      console.log("resres",res)
      closeIt(false) 

  }catch(err){
    console.log("err",err)
  }
}

const EditStripeCallback = async () =>{
  const data = {
      stripeCallbackUrl: stripeCallback
  }
  try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_STRIPE_CALLBACK}`,data)
      ApiRefresh()
      cogoToast.success("Changes Made Successfully")
      console.log("resres",res)
      closeIt(false) 

  }catch(error){
      console.log(error)
  }
}

const EditStripeSecret = async () =>{
  try{
    const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_STRIPE_SECRET}${stripeSecret}`);
    ApiRefresh()
      cogoToast.success("Changes Made Successfully")
      console.log("resres",res)
      closeIt(false)

  }catch(err){
    console.log("err",err)
  }
}

const FillCommissionType = async ()=>{
  try{
    const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_COMMISSION_TYPE}${commissionType}`)
    ApiRefresh()
      cogoToast.success("Changes Made Successfully")
      console.log("resres",res)
  }catch(err){
    console.log("err",err)
  }
}

const FillCommissionVal = async ()=>{
  try{
    const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_COMMISSION}${commissionValue}`)
    ApiRefresh()
      console.log("resres",res)
      closeIt(false)
  }catch(err){
    console.log("err",err)
  }
}

const lazyMint = async(lazy)=>{

  try{
    const res = await axios.get(`${URLS.EXCHANGE.ADMIN.SET_LAZY_MINTING}${lazy}`);
    ApiRefresh()
    cogoToast.success("Changes Made Successfully")
    console.log("resres",res)
    closeIt(false)

  }catch(err){
    console.log("err",err)
  }

}


  console.log("lazyMinting", lazyMinting)
  return (
    <Root>
      <button className='btnbtn2' onClick={() => { closeIt(false) }}><AiOutlineCloseCircle/></button>
      <div className='prelogin_body2'>
        <div className='body_child2'>
          <button onClick={() => { setActiveSetting("setting1") }} className={activeSetting=="setting1"?"btnbtn4 active":"btnbtn4"}>
            Title & Logo</button>
          <button onClick={() => { setActiveSetting("setting2") }} className={activeSetting=="setting2"?"btnbtn4 active":"btnbtn4"}>
            Pinata Credentials</button>
          <button onClick={() => { setActiveSetting("setting3") }} className={activeSetting=="setting3"?"btnbtn4 active":"btnbtn4"}>
            Stripe Secret</button>
          <button onClick={() => { setActiveSetting("setting4") }} className={activeSetting=="setting4"?"btnbtn4 active":"btnbtn4"}>
            Stripe CallBack</button>
          <button onClick={() => { setActiveSetting("setting5") }} className={activeSetting=="setting5"?"btnbtn4 active":"btnbtn4"}>
            Platform Commission</button>
          <button onClick={() => { setActiveSetting("setting6") }} className={activeSetting=="setting6"?"btnbtn4 active":"btnbtn4"}>
            Lazy Minting</button>
            
        </div>
        <div className='body_child1'>
          {activeSetting == "setting2" ?
            <>
              <h4>Pinata Key</h4>
              <input value={pinataKey} onChange={(e)=>{setPinataKey(e.target.value)}}></input>
              <h4>Pinata Secret</h4>
              <input value={pinataSecret} onChange={(e)=>{setPinataSecret(e.target.value)}}></input>
              <button className='btnbtn3' onClick={() => {AddPinataKey()}}>Save</button>
            </> :
            activeSetting == "setting3" ?
              <>
                <h4>Stripe Secret</h4>
                <input value={stripeSecret} onChange={(e)=>{setStripeSecret(e.target.value)}}></input>
                <button className='btnbtn3' onClick={() => { EditStripeSecret() }}>Save</button>
              </> :
            activeSetting == "setting4" ?
              <>
                <h4>Stripe Callback</h4>
                <input value={stripeCallback} onChange={(e)=>{setStripeCallback(e.target.value)}}></input>
                <button className='btnbtn3' onClick={() => { EditStripeCallback() }}>Save</button>
              </> :
            activeSetting == "setting5" ?
              <>
                <h4>Commission Type</h4>
                <select value={commissionType} onChange={(e)=>{setCommissionType(e.target.value)}} >
                  {currentData?.commissionType == "percent"?
                  <>
                    <option value={"percent"}>Percentage</option>
                    <option value={"value"}>Value</option>
                  </>:
                  <>
                    <option value={"value"}>Value</option>
                    <option value={"percent"}>Percentage</option>
                  </>
                }
                </select>
                <h4>Commission Value</h4>
                <input value={commissionValue} onChange={(e)=>{setCommissionValue(e.target.value)}}></input>
                <button className='btnbtn3' onClick={() => {FillCommissionType(); FillCommissionVal()}}>Save</button>
              </>:
              activeSetting == "setting1"?
              <div className='img_logo'>
                <div className='change_img'>
                  <img className='comp_img' src={inputFile[0]?URL.createObjectURL(inputFile[0]):`${IMAGE_END_POINT}${currentData?.platformLogo}`}/>
                  <input className='hide_choose' type='file' onChange={(e)=>{setInputFile(e.target.files)}}></input>
                </div>
                <input className='title_input' value={companyTitle} onChange={(e)=>{setCompanyTitle(e.target.value)}}></input>
                <button className='btnbtn3' onClick={() => {AddNameLogo()}}>Save</button>
              </div>:
              activeSetting == "setting6"?
              <>
                <h4>Current Lazy Minting Status is {lazyMinting?"True":"False"}</h4>
                <p>Click to make it {!lazyMinting?"True":"False"}<button className='btn_lazy' onClick={()=>{lazyMint(!lazyMinting)}}>
                  {!lazyMinting?"True":"False"}</button></p>
              </>:""
          }
        </div>
      </div>
    </Root>
  )
}

const Root = styled.section`

background-color: #070c27;
padding: 5px;
width: 65%;
border: 1px solid;
display: flex;
flex-direction: column;
align-items: right;
align-items: end;
position: relative;

.btnbtn2{
    position: absolute;
    top: 0;
    background-color: transparent;
    right: 0;
    margin: 0px !important;
    padding: 0px !important;

    svg {
      font-size: 30px;
    }
}
.btnbtn2:hover {
    color: #c16262;
    background-color: transparent;
}

.btnbtn3{
    padding:3px;
    font-size: 15px;
    right:0;
    margin: 10px;
    position: absolute;
    bottom: 0;
    cursor: pointer;

}

.btnbtn4{
    /* background-color: #11183f; */
    color: white;
    text-align: left;
    padding: 10px;
    border: 0;
    cursor: pointer;

}
.btnbtn4.active{
    background-color: white;
    color: black;
    cursor: pointer;

}
.btn_lazy{
  /* background-color: #11183f; */
  color: white;
  text-align: left;
  padding: 5px;
  border: 0;
  margin: 0px 5px;
  cursor: pointer;

  :hover{
    background-color: grey;
  }
}

.prelogin_body2{
  display: flex;
  gap: 10px;
  width: 100%;
  padding: 25px;
  justify-content: space-between;
  @media(max-width:600px){
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .body_child1{
    width: 70% ;
    border: 1px solid;
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;

    .img_logo{
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 100%;

      .change_img{
        position: relative; 
        height: 120px;
        width: 120px;
        margin: 5px;
        border: 1px solid;
        padding: 2px;
        object-fit: cover;
        :hover{
            opacity: 0.5;
          }
        .comp_img{
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
        .hide_choose{
          position: absolute;
          left:0 ;
          height: 100%;
          width: 100%;
          opacity: 0;
        }
      }

      .title_input{
        width: 200px;
        margin: 5px;
      }
    }

    h4{
      margin:0;
    }
    input,select{
        width: 100%;
        border: none;
        padding: 3px;
        :focus{
            outline: none;
        }
      }
  }

  .body_child2{
    display: flex;
    width: 30%;
    flex-direction: column;
    gap: 5px;
    justify-content: center;

    @media(max-width:600px){
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
   
  }
}

`
