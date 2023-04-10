import React from 'react'
import {TbArrowBackUp} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'


export default function BackButton() {

  const navigate = useNavigate();

  const goBack = ()=>{
    navigate(-1);
  }
  return (
    <Root>
        <button className='back_btn' onClick={goBack}><TbArrowBackUp/></button>
    </Root>
  )
}

const Root = styled.section`

.back_btn{
      font-size: 30px;
      background-color: #070c27;
      border: none;
      color: white;
      padding: 5px;
      width: 50px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      /* position: fixed;
      top: 0;
      z-index: 99999;
      margin-top: 20px; */
      :hover{
        background-color: #a29b9b30;
      }
    }

`
