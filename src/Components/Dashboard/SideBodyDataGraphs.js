import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaEthereum, FaRupeeSign, FaWallet} from 'react-icons/fa'
import {SlOptionsVertical} from 'react-icons/sl'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import CountUp from 'react-countup'
import UserTypeGraph from './UserTypeGraph'
import KycChart from './KycChart'
import axios from 'axios'
import URLS from '../../utils/urls'

function SideBodyDataGraphs() {
    const [balance, setBalance] = useState("");
    const [ethBalance, setEthBalance] = useState("");
    const [revenueBalance, setRevenueBalance] = useState("");

    const getUsersBalance = async()=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_USERS_WALLET_BALANCE}`)
            if(res.status === 200){
                setBalance(res?.data?.data?.amount)
            }

        }catch(e){
            console.log(e)
        }
    }

    const ethTransfered = async()=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.ETH_TRANSFEREDBY_ADMIN}`)
            if(res.status === 200){
                setEthBalance(res?.data?.data?.eth)
            }

        }catch(e){
            console.log(e)
        }
    }
    const revenueApi = async()=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.PLATFORM_FEE_DATA}`)
            if(res.status === 200){
                setRevenueBalance(res?.data?.data?.totalRevenue)
            }

        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getUsersBalance();
        ethTransfered();
        revenueApi();
    },[])

    console.log("revenueBalance",revenueBalance)
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
                        <h1><CountUp start={0} end={revenueBalance} duration={2.5} decimals={6}/></h1>
                    </div>
                </div>
               
                <div className='child_3'>
                    <p className='arrow_up'><AiOutlineArrowUp/>5.34%</p>vs. Previous Month
                </div>
            </div>

            <div className='revenue_div'>
            <div className='child_2'>
                <p>Total Etherium Transfered</p>
                <button className='opt_btn'><SlOptionsVertical/></button>
            </div>

            <div className='child_1'>
                <div>
                    <p className='child_1_logo'><FaEthereum/></p>
                    <h1><CountUp start={0} end={ethBalance} duration={2.5} decimals={6}/></h1>
                </div>
            </div>
        
            <div className='child_3'>
                <p className='arrow_up off'><AiOutlineArrowDown/>1.24%</p>vs. Previous Month
            </div>
            </div>

            <div className='revenue_div'>
            <div className='child_2'>
                <p>Total User Wallet Balance</p>
                <button className='opt_btn'><SlOptionsVertical/></button>
            </div>

            <div className='child_1'>
                <div>
                    <p className='child_1_logo'><FaRupeeSign/></p>
                    <h1><CountUp start={0} end={balance} duration={2.5} decimals={2}/></h1>
                </div>
            </div>
        
            {/* <div className='child_3'>
                <p className='arrow_up off'><AiOutlineArrowDown/>2.34%</p>vs. Previous Month
            </div> */}
            </div>
        </div>

        <div className='second_child'>
            <UserTypeGraph/>
            <KycChart/>
        </div>


                  
    </Root>
  )
}

export default SideBodyDataGraphs

const Root = styled.section`

display: flex;
flex-direction: column;
gap : 15px;


@media(max-width:1320px){
      flex-direction: row-reverse;
      .second_child{
        width: 50%;
      }
      .first_child{
        width: 50%;
        /* justify-content: space-around; */
      }
    }
@media(max-width: 600px){
    /* flex-direction: row-reverse; */
    flex-direction: column-reverse;
    .second_child{
    width: 100%;
    }
    .first_child{
    width: 100%;
    justify-content: space-around;
    }
}

.first_child{
    display: flex;
    flex-direction: column;
    gap: 15px;
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

.second_child{
    display : flex;
    flex-direction: column;
    gap : 15px
}


`