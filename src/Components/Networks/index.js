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

    useEffect(()=>{
        GetNetworks();
    },[])

    console.log("popup",popup)

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
            <table>
              <tbody>
                {netData?.map((i)=>{
                    return(
                        <div className='data_div'>
                        <tr className='img_tr'>
                            <td><h4>{i?.name}</h4></td>
                            <td>
                                <img
                                    className='img_logo'
                                    src={i?.logo
                                        ? `${IMAGE_END_POINT}${i?.logo}`
                                        : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                    }>

                                </img>
                            </td>
                        </tr>
                    
                        <tr>
                            <td>Address</td>
                            <td>{i?.address}</td>
                        </tr>
                        <tr>
                            <td>Chain Id</td>
                            <td>{i?.chainId}</td>
                        </tr>
                        <tr>
                            <td>Enabled</td>
                            <td>{i?.enabled?"True":"False"}</td>
                        </tr>
                        <tr>
                            <td>Host</td>
                            <td>{i?.host}</td>
                        </tr>
                        <tr>
                            <td>Default</td>
                            <td>{i?.isDefault?"True":"False"}</td>
                        </tr>
                        <tr>
                            <td>Created On</td>
                            <td>{i?.createdAt}</td>
                        </tr>
                        <tr>
                            <td>Updated On</td>
                            <td>{i?.updatedAt}</td>
                        </tr>
            
                        </div>
                    )
                })}
              </tbody>
            
            </table>
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


table{
    width: 100%
}

.data_div{
    border: 1px solid;
    margin: 10px 0px;

    .img_tr{
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 40px;
    }

    tr{
        td{
            h4{
                text-transform: capitalize;
            }
            padding: 5px;
        }
    }
}


.img_logo{
    height: 50px;
    border-radius: 50%;
}

`
