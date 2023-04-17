import axios from 'axios'
import React from 'react'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import AddNetworks from './AddNetworks'

export default function Networks() {

    const [netData,setNetData] = useState()
    const [popup,setPopup] = useState(false)
    const [netId,setNetId] = useState()
    const [netEnable, setNetEnable] = useState();
    const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;


    const GetNetworks = async()=>{
        try{

            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`,configAxios)
            console.log("res---",res.data.data)
            setNetData(res.data?.data)

        }catch(err){
            console.log(err)
        }
    }

    const EnableNetwork = async (value, id)=>{
        const data = {
            networkId: id,
            status: value
        }
        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ENABLE_NETWORK}`,data, configAxios)
            console.log("resres",res)
            GetNetworks();


        }catch(Error){
            console.log(Error)

        }
    }

    useEffect(()=>{
        GetNetworks();
    },[popup])

    console.log("netId",netId,netEnable)

  return (
    <Root>
        <div className='addnet_div'>

            <h3>Add New Network <button onClick={()=>{setPopup(true)}}>+</button></h3>
            <div className={popup?"addnet":"addnet no"}>
                <AddNetworks toClose ={(e)=>{setPopup(e)}}/>
            </div>
            <hr/>

        </div>
        <div>
            <h3>Active Networks</h3>
            <div className= 'net_main_parent'>
                {netData?.map((i)=>{
                    return(
                       <div className={i.enabled?'net_main_child':'net_main_child no'}>

                            <div>
                                <img
                                    className='img_logo'
                                    src={i?.logo
                                        ? `${IMAGE_END_POINT}${i?.logo}`
                                        : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                    }>
                                </img>
                                <h4>{i.name}</h4>
                             
                            </div>
                            <div>
                                <h5>Address</h5>
                                 <p>{i?.address}</p>
                            </div>
                            <div>
                                <h5>Chain Id</h5>
                                 <p>{i?.chainId}</p>
                            </div>
                         
                            <div>
                                <h5>Enabled</h5>
                                 <p>{i?.enabled?"True":"False"}</p>
                            </div>
                            <div>
                                <h5>Host</h5>
                                 <p>{i?.host}</p>
                            </div>
                            <div>
                                <h5>Default</h5>
                                 <p>{i?.isDefault?"True":"False"}</p>
                            </div>
                            <div>
                                <h5>Created On</h5>
                                 <p>{i?.createdAt}</p>
                            </div>
                            <div>
                                <h5>Updated On</h5>
                                 <p>{i?.updatedAt}</p>
                            </div>
                            <div>
                                <button onClick={()=>{EnableNetwork(!i?.enabled,i?.id)}}>{i?.enabled?"Diable":"Enable"}</button>
                                <button>Set Default</button>
                            </div>
                    
                       </div>
                    )
                })}

            </div>
        </div>

    </Root>
  )
}

const Root = styled.section`
   h3{
        margin:20px 0px;
    }

.addnet_div{

    h3{
        margin:20px 0px;
    
        button{
            width: 30px;
        }
    }

    .addnet{
        background-color: transparent;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 999;
        left: 0;
        backdrop-filter: blur(4px);

    }

    .addnet.no{
        display: none;
    }

}

.net_main_parent{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    justify-content: left;


    .net_main_child {
        width: 49%;
        /* flex:; */
        border: 1px solid;
        padding: 10px;
        >div{
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 3px;
            h4{
                padding-left: 10px;
            }
            h5,h4{
                min-width: 80px;
                text-transform: capitalize;
                margin: 0;
            }

            p{
                word-break: break-all;
            }
            .img_logo{
                height: 70px;
                border-radius: 50%;
                min-width: 70px;

            }
            button{
                padding: 5px;
            }
        }

        @media(max-width:600px){
            width: 100%;
        }
    }

    .net_main_child.no{
        opacity: 50%;
    }
}



`
