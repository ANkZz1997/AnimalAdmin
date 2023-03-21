import React, { useState } from 'react'
import styled from 'styled-components'
import ConfirmDialogue from '../Model/ConfirmDialogue';

function PlatformCharge() {
    const platformAmount = 2;
    const [feesPopup,setFeesPopup] = useState(false)
    const [sureActive,setSureActive] = useState(false)

    console.log("feesPopup", sureActive)

  return (
    <Root>
        <div className='parent_div'>
            <h1>Set the platform charge</h1>
            <div>
                <h4>Current Platform Charge Per Transaction is {platformAmount}%, Kindly click the below button to make changes.</h4>
            </div>
            <div>
                <button className='change_btn' onClick={()=>{setFeesPopup(!feesPopup)}}>Change Amount</button>
            </div>

          
        </div>
        <ConfirmDialogue show={feesPopup} handleClick={()=>{setFeesPopup(!feesPopup);setSureActive(false)}}>
                <h1>The Curren Platform Fees is {platformAmount}%</h1>
                <h3>Please fill your desired amount</h3>
                <div className='fees_section'>
                <input className='input_fees' type={"number"} placeholder= {`${platformAmount}%`} min={1} max={50}/>
                <button className='btns' onClick={()=>{setSureActive(true)}}>Save</button>
                </div>
                <div className= {sureActive? "confirmation on":"confirmation"}>
                    <h2>Are You Sure?</h2>
                    <button className='btns' onClick={()=>{setFeesPopup(!feesPopup);setSureActive(false)} }>Yes</button>
                    <button className='btns' onClick={()=>{setFeesPopup(!feesPopup);setSureActive(false)}}>No</button>
                </div>
        </ConfirmDialogue>
    </Root>
  )
}

export default PlatformCharge

const Root = styled.section`

color: whitesmoke;

.btns{
    height: 30px;
    width: 50px;
    margin: 2px;
}

.parent_div{
    position: relative;
    padding: 20px;


.change_btn{
    padding: 3px;
    margin-top: 10px;
}

}
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

        h3{
            padding-bottom: 10px;
        }
        .cls_btn{
                position: absolute;
                right: 0;
                top: 0;
        }
        .confirmation.on{
              display: unset;
              h2{
                margin:0 0 0 0 ;
                padding:5px 0 10px 0;
              }
            }
            .confirmation{
                display : none;
            }
            .fees_section{
                display: flex;
                justify-content: center;
                align-items: center;

                .input_fees{
                    height: 30px;
                    width: 60px;
                    padding: 2px;
    
                    :focus{
                        outline: none;
                    }
                }
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