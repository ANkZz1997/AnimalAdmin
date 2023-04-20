import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import URLS from '../../utils/urls';
import axios from 'axios';
import cogoToast from "cogo-toast";


export default function AddNetworks({toClose}) {

    const [inputFile, setInputFile] = useState([]);

    const [initialValue, setInitialValue] = useState({
        host:"",
        chainId:"",
        address:"",
        logo:"",
        name:""
    })
   

    const AddNet = async ()=>{

        if(inputFile[0]){
            let Data = new FormData();
            Data.append("name",initialValue.name)
            Data.append("host",initialValue.host)
            Data.append("chainId",initialValue.chainId)
            Data.append("address",initialValue.address)
            Data.append("logo",inputFile[0])
                try{
                    const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ADD_NETWORK}`,Data);
                    console.log("postresres",res)
                    cogoToast.success("Network Added Successfully")
                    resetForm();
        
                }catch(err){
                    console.log("err",err)
                }
        }
    }

    const resetForm = ()=>{
        setInitialValue({
            host:"",
            chainId:"",
            address:"",
            logo:"",
            name:""
        });
        setInputFile([]);
        toClose(false)
    }


    useEffect(() => {
        if (inputFile[0]) {
            console.log("inputFile", inputFile, URL.createObjectURL(inputFile[0]))
            setInitialValue({...initialValue, logo : inputFile[0] })
        }
    }, [inputFile])

    
    // console.log("formData",formData)

  return (
    <Root>
        <div className='main_child'>
            <h2>Make Sure You Are Filling Valid Inputs</h2>
                <button className='cls_btn'  onClick={()=>{resetForm()}}>Close</button>
            <div className='input_details'>
                <div className='input_data'>

                    <h4>Add Name</h4>
                    <input type='text' value={initialValue.name} onChange={(e)=>{setInitialValue({...initialValue, name: e.target.value})}}/>

                    <h4>Add Host Link</h4>
                    <input type='text' value={initialValue.host} onChange={(e)=>{setInitialValue({...initialValue, host: e.target.value})}}/>

                    <h4>Add Chain Id</h4>
                    <input type='text' value={initialValue.chainId} onChange={(e)=>{setInitialValue({...initialValue, chainId: e.target.value})}}/>

                    <h4>Add Address</h4>
                    <input type='text' value={initialValue.address} onChange={(e)=>{setInitialValue({...initialValue, address: e.target.value})}}/>

                    <h4>Add Logo</h4>
                    <div className='input_file_div'>
                        <input className='input_file' type="file" onChange={(e) => {setInputFile(e.target.files) }} />
                        <p>Click To Select File</p>
                    </div>
                </div>

                <div className='input_img'>
                    {inputFile[0] ? <img className='preview_img' src={URL.createObjectURL(inputFile[0])} /> : <h2 className='noimg'>No Image</h2>}
                </div>

            </div>
            
            <button className={initialValue.host && initialValue.address && initialValue.chainId && initialValue.logo && initialValue.name?
            "save_btn":"save_btn no"} onClick={()=>{AddNet()}}>SAVE</button>
            
        </div>
        

    </Root>
  )
}

const Root = styled.section`

display: flex;
justify-content: center;
align-items: center;
height: 100%;

h4{
    padding:0;
    margin: 0;
}

.main_child{
    /* height: 50%;
    width: 70%; */
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background-color: #070c27;
    border: 1px solid;
    position: relative;
    flex-direction: column;
    padding: 15px;

    .save_btn{
        height: 30px;
        width: 50px;
        margin-top: 10px;
    }
    .save_btn.no{
        display: none;
    }

    .cls_btn{
        position: absolute;
        top: 0;
        right: 0;
    }

    .input_details{
       display: flex;
       justify-content: center;
       align-items: center;
       /* padding: 15px; */
       gap: 15px;
        width: 100%;

        .input_data{
            gap: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            flex:2;
            input{
                border: 1px solid grey;
                background-color: #070c27;
                width: 100%;
                color: whitesmoke;
                padding: 5px;
            }
            .input_file_div{
                border: 2px solid grey;
                position: relative;
                
                .input_file{
                    width: 100%;
                    /* height: 50px; */
                    opacity: 0;
                    z-index: 1;
                    position: relative;
                    cursor: pointer;
                }
                p{
                    position: absolute;
                    z-index: 0;
                    top: 0;
                    right: 0;
                    /* background: red; */
                    height: 100%;
                    width: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
            }
        }

        .input_img{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 5px;
            border: 1px solid;

            .preview_img{
                object-fit: cover;
                background-color: red;
                height: 200px;
                width: 200px;
            }
            .noimg{
                height: 200px;
                width: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}


`