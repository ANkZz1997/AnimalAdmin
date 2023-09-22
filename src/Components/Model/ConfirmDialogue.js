import React from 'react'
import styled from 'styled-components'
import {AiOutlineCloseCircle} from 'react-icons/ai'

export default function ConfirmDialogue({show , handleClick , children, setDefault}) {
    return (
    <Root>
    <div className={show?"popup active": "popup"}>
        <div className='background_layer' onClick={()=>{handleClick(!show)}}></div>
        <div className='child_section'>
            <button className='cls_btn' onClick={()=>{handleClick(!show); setDefault("")}}><AiOutlineCloseCircle/></button>
            {children}
        </div>
    </div>
</Root>
  )
}

const Root = styled.section`
color: whitesmoke;
.popup{
    .background_layer {
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
    display: none;
}
    .child_section {
        background: #070c27;
        width: 50%;
        height: fit-content;
        position: fixed;
        top: -300px;
        left: 50%;
        transform: translateX(-50%);
        transition:all 1s;
        z-index: 9999;
        padding: 10px;
        text-align: center;
        border-radius: 20px;
        box-shadow: 0px 0px 10px -2px #fff;
        overflow: hidden;
        .cls_btn{
                position: absolute;
                right: 0;
                top: 0;
                background-color: transparent;
                height: 40px;
                width: 40px;
                border: transparent;
                svg{
                  color: white;
                  font-size: 30px;
                }
        }  

        .btns2{
          height: 30px;
          width: 50px;
          margin: 3px;
        }
    }
    &.active{
        .background_layer {
            display: unset;
        }
        .child_section{
            top:30px;

          
        }
    }      
}

`