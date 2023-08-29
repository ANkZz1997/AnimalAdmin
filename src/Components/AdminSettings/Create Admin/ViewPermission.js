import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URLS from '../../../utils/urls'
import styled from 'styled-components'
import LoaderCSS from '../../Loader'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function ViewPermission({permissionData, toClose}) {
    console.log("permissionData",permissionData)
  return (
    <Root>
    <button className='cls_btn' onClick={()=>{toClose(false)}}><AiOutlineCloseCircle/></button>

    <div className='save_btn'>
    <h3>List Of Codes assigned to {permissionData?.role?.name}</h3>
    </div>
    <div className='code_list'>
       {permissionData && permissionData?.permissions.map((i,ix)=>{
        return(
            <div>{ix+1} {i}</div>
        )
       })}
    </div>
</Root>
  )
}

const Root = styled.section`
    background: #060d31;
    margin: auto;
    position: relative;
    border: 1px solid;
    /* border-radius: 20px; */
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
    *::-webkit-scrollbar {
  display: none;
}

.cls_btn{
        position: absolute;
        right: 0;
        top:0;
        margin-right: 0px;
        margin: 0px;
        padding: 0px;
        background-color: transparent;
        border: none;
        color: white;
        svg{
            font-size: 25px;
        }
    }


`
