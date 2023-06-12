import React from 'react'
import axios from 'axios';
import URLS from '../../utils/urls';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import cogoToast from 'cogo-toast';
import moment from 'moment/moment';

export default function KycOption() {

  const [getDoc, setGetDoc] = useState();
  const [addPop,setAddPop] = useState(false);
  const [docName,setDocName] = useState();
  const [statusType, setStatusType] = useState(false);
  const [address, setAddress] = useState(false);
  const [identity, setIdentity] = useState(false);
  const [changeStatus,setChangeStatus] = useState();
  const [docId, setDocId] = useState();


const getDocList = async()=>{
  try{
    const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_KYC_DOC_LIST}`)
    setGetDoc(res.data?.data)
    console.log("setGetDoc", res.data.data)
  }catch(err){
    console.log(err)
  }
}

const saveNewDocType = async()=>{
  const data = {
    name: docName,
    enabled: statusType,
    addressProof: address,
    identitiyProof:identity
  }
  try{
    const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ADD_KYC_DOC_LIST}`,data)
    cogoToast.success(`Doc Type ${docName} Added`)
    setAddPop(false);
    getDocList();
    emptyFunction();

  }catch(err){
    console.log(err)
  }
}

const changeStatusDoc = async(val,id)=>{
  const data = {
    documentTypeId:id,
    status: val,
  }
  try{
    const res = await axios.post(`${URLS.EXCHANGE.ADMIN.UPDATE_KYC_DOC}`,data)
    cogoToast.success(`Updated Successfully`)
    getDocList();


  }catch(err){
    console.log(err)
  }
}


const emptyFunction = ()=>{
  setDocName("");
  setIdentity(false);
  setAddress(false);
  setStatusType(false)
}

const handleCheckSelect = (e)=>{
  console.log("initial value",e.target.value)
  if(e.target.value =="AA"){
    setAddress(true);
    setIdentity(false)
  }if(e.target.value == "BB"){
    setIdentity(true)
    setAddress(false)
  }if(e.target.value =="CC"){
    setAddress(true)
    setIdentity(true)
  }if(e.target.value =="OO"){
    setAddress(false)
    setIdentity(false)
  }
}

useEffect(()=>{
  getDocList();
},[])

console.log("AAaaaa----",changeStatus,docId)

  return (
    <Root>
      <h3>You can change the KYC document settings.<button onClick={()=>{setAddPop(true)}}>Add+</button></h3>
      <div className='main_div_doc'>
        <div className='doc_child'>
          {getDoc && getDoc?.map((i, ix)=>{
            return(
              <div className={i.enabled?"doc_body":"doc_body no"} key={ix}>
                <button onClick={()=>{changeStatusDoc(!i.enabled,i.id)}} className='act_btn'>{i.enabled?"Disable":"Enable"}</button>
                <div><h5>Document Name</h5><p>{i?.name}</p></div>
                <div><h5>Document Status</h5><p>{i?.enabled?"Enabled":"Disabled"}</p></div>
                <div><h5>Id Proof</h5><p>{i?.identitiyProof?"True":"False"}</p></div>
                <div><h5>Address Proof</h5><p>{i?.addressProof?"True":"False"}</p></div>
                <div><h5>Created On</h5><p> {`${moment(i?.createdAt).format(
                                'DD-MMM-YY',
                              )}`}</p></div>
                <div><h5>Updated on</h5><p>{`${moment(i?.updatedAt).format(
                                'DD-MMM-YY',
                              )}`}</p></div>
                
              </div>
            )
          })}
        </div>
      </div>

      <div className= {addPop?"add_doc": "add_doc no"}>

          <div className='add_doc_box'>
            <button className='cls' onClick={()=>{setAddPop(false);emptyFunction()}}><AiOutlineCloseCircle/></button>
            <h3>Add Document Title</h3> <input value={docName} onChange={(e)=>{setDocName(e.target.value)}}></input>
            <h3>Document Status </h3>
              <select onClick={(e)=>{setStatusType(e.target.value)}}>
                <option value={true}>Enable</option>
                <option value={false}>Disable</option>
              </select>
            <h3>Document KYC Type</h3>
              <select onClick={(e)=>{handleCheckSelect(e)}}>
                <option value={"OO"}>Select Type</option>
                <option value={"AA"}>Address Proof</option>
                <option value={"BB"}>Id Proof</option>
                <option value={"CC"}>Both</option>
              </select>
            <div>
              <button className={!identity && !address?"btn_hide":" "} onClick={()=>{saveNewDocType()}}>Save</button>
            </div>
          </div>
      </div>

    </Root>
  )
}

const Root = styled.section`

border: 1px solid;
padding: 20px;
h3{
  button{
    padding: 5px;
    font-size: 15px;
    margin: 0px 10px;
    cursor: pointer;

  }
}

.main_div_doc{
  margin-top: 15px;
  gap: 10px;
    
    .doc_child{
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
  
      .doc_body{
        border: 1px solid;
        padding: 30px 15px 15px 15px;
        width: 49%;
        background-color: #11183f;
        position: relative;
        .act_btn{
          position: absolute;
          right: 0;
          top:0;
          padding: 6px;
          background-color:#070c27;
          :hover{
            background-color: grey;
          }
        }
        >div{
          display: flex;
          gap: 10px;
          align-items: center;
          h5{
            margin: 0;
            min-width: 120px;
          }
        }

      @media(max-width: 750px){
        width: 100%;
      }
      }
      .doc_body.no{
        opacity: 0.5;
      }
    }
}

.add_doc{
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;

  .add_doc_box{
    padding: 20px;
    background-color: #070c27;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    gap: 10px;
    position: relative;
    .btn_hide{
      display: none;
    }

    .cls{
      background-color: #070c27;
      color: white;
      width: 20px;
      font-size: 28px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0;
      margin-right: 7px;
      :hover{
        color: #c16262;
      }
    }
      input,select{
        border: none;
        font-size: 16px;
        padding: 3px;
        :focus{
          outline: none;
        }
      }

      >div{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        
        button{
          width: fit-content;
          padding: 5px;
          cursor: pointer;

        }
      }

   

  }
}

.add_doc.no{
  display: none;
}
`
