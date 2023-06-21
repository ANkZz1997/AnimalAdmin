import React from 'react'
import styled from 'styled-components'
import {FaEthereum, FaRupeeSign} from 'react-icons/fa'
import {SlOptionsVertical} from 'react-icons/sl'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import CountUp from 'react-countup'
import UserTypeGraph from './UserTypeGraph'

function SideBodyDataGraphs() {
  return (
    <Root>
        <div className='first_child'>

            <div className='revenue_div'>
                <div className='child_2'>
                    <p>Total Revenue</p>
                    <button className='opt_btn'><SlOptionsVertical/></button>
                </div>

                <div className='child_1'>
                    <div>
                        <p className='child_1_logo'><FaRupeeSign/></p>
                        <h1><CountUp start={0} end={1610040} duration={2.5}/></h1>
                    </div>
                </div>
               
                <div className='child_3'>
                    <p className='arrow_up'><AiOutlineArrowUp/>5.34%</p>vs. Previous Month
                </div>
            </div>

        </div>

        <div className='first_child'>

        <div className='revenue_div'>
            <div className='child_2'>
                <p>Total Etherium Transfered</p>
                <button className='opt_btn'><SlOptionsVertical/></button>
            </div>

            <div className='child_1'>
                <div>
                    <p className='child_1_logo'><FaEthereum/></p>
                    <h1><CountUp start={0} end={49} duration={2.5}/></h1>
                </div>
            </div>
        
            <div className='child_3'>
                <p className='arrow_up off'><AiOutlineArrowDown/>5.34%</p>vs. Previous Month
            </div>
        </div>

        </div>

        <div className='first_child'>
            <UserTypeGraph/>
        </div>


                  
    </Root>
  )
}

export default SideBodyDataGraphs

const Root = styled.section`

display: flex;
flex-direction: column;
gap: 20px;
padding: 0px 10px;

.first_child{
    display: flex;
    flex-direction: column;
    gap: 20px;
    >div{
        padding: 10px;
        border: 1px solid grey;
    }

    .revenue_div{
        display: flex;
        flex-direction: column;
        gap: 10px;
        .child_1{
            >div{
                display: flex;
                gap: 10px;
                align-items: center;
                flex-wrap: wrap;
                h1{
                    margin: 0;
                    word-break: break-all;
                }
                p.child_1_logo{
                    height: 40px;
                    width: 40px;
                    background-color: #ff555f;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    margin: 0;

                }
            }
       
        }
        .child_2{
            display: flex;
            justify-content: space-between;
            p{
                margin: 0;
            }
            .opt_btn{
                background-color: transparent;
                border: none;
                color: white;
            }
        }
        .child_3{
            display: flex;
            gap: 5px;
            flex-wrap: wrap;

            p.arrow_up{
                background-color: #008000d9;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2px 3px;
                border-radius: 5px;
            }

            p.arrow_up.off{
                background-color: #ef3838d9;
            }
        }
    }
    .eth_balance_div{
    }
}


`