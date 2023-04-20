import axios from 'axios'
import React from 'react'
import URLS from '../../utils/urls'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import AddNetworks from './AddNetworks'
import { AiFillDelete, AiFillEdit, AiFillStar } from 'react-icons/ai';
import cogoToast from 'cogo-toast'
import ConfirmDialogue from '../Model/ConfirmDialogue'
import EditNetwork from './EditNetwork'
import LoaderCSS from '../Loader'
import moment from 'moment'


export default function Networks() {

    const [netData,setNetData] = useState()
    const [popup,setPopup] = useState(false)
    const [editPopup, setEditPopup] = useState(false)
    const [deleteBanner, setDeleteBanner] = useState(false)
    const [netId,setNetId] = useState()
    const [netName, setNetName] = useState()
    const [editObj, setEditObj] = useState()
    const [loader, setLoader] = useState(true)
    const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;


    const GetNetworks = async()=>{
        try{

            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`)
            console.log("res---",res.data.data)
            setNetData(res.data?.data)
            setLoader(false)

        }catch(err){
            console.log(err)
        }
    }

    const EnableNetwork = async(value, id)=>{
        const data = {
            networkId: id,
            status: value
        }
        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ENABLE_NETWORK}`,data)
            console.log("resres",res)
            GetNetworks();


        }catch(Error){
            console.log(Error)

        }
    }

    const DefaultNet = async(id,name)=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.DEFAULT_NETWORK}${id}`)
            console.log("Resres",res)
            cogoToast.success(`${name} Is Your Default Network Now...!`)
            GetNetworks();

        }catch(err){
            console.log(err)
        }
    }

    const DeleteNet = async(id)=>{
        const delData = {
            networkId: id
        }
        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.DELETE_NETWORK}`,delData)
            console.log("res",res)
            GetNetworks();


        }catch(err){
            console.log(err)
        }
    }

    const eventListner = async ()=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.START_LISTENING}`)
            console.log("resres",res)
            cogoToast.success("Started Event Listening")

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        setLoader(true);
        GetNetworks();
    },[popup])

    console.log("netId",netId)

  return (
    <Root>
        <ConfirmDialogue  show={deleteBanner} handleClick={(e)=>{setDeleteBanner(e)}}>
             <h1>Confirm To Delete {netName}?</h1>
             <p>Do you really want to Delete this Network?</p>
             <button className='btns2' onClick={()=>{DeleteNet(netId);setDeleteBanner(!deleteBanner) } }>Yes</button> 
             <button className='btns2' onClick={()=>{setDeleteBanner(!deleteBanner)}}>No</button>
        </ConfirmDialogue>
        <div className='addnet_div'>
            <div className='add_listen'>
                <h3>Add New Network <button onClick={()=>{setPopup(true)}}>+</button> </h3>
                <button className='event_btn' onClick={()=>{eventListner()}}>Start Event Listening</button>
          

            </div>
            <div className={popup?"addnet":"addnet no"}>
                <AddNetworks toClose ={(e)=>{setPopup(e);GetNetworks()}}/>
            </div>
            <hr/>

        </div>
          <div>
          <h3>Active Networks</h3>
          {loader? <LoaderCSS/>:
            <div className= 'net_main_parent'>
                
                {netData?.map((i)=>{
                    return(
                        <div className={i.enabled?'net_main_child':'net_main_child no'}>
                        <div className='net_child'>
                            <button className='btn1' onClick={()=>{setEditPopup(true);setEditObj(i)}} ><AiFillEdit/></button>
                            <div className={editPopup?"edit_net": "edit_net no"}>
                                <EditNetwork toClose = {(e)=>{setEditPopup(e);GetNetworks()}} val={editObj}/>
                            </div>
                            <button className={i?.isDefault?"btn1 no":"btn1"} onClick={()=>{setNetId(i?.id);setDeleteBanner(!deleteBanner);setNetName(i?.name)}}><AiFillDelete/></button>
                        </div>
                            <div>
                                <img
                                    className='img_logo'
                                    src={i?.logo
                                        ? `${IMAGE_END_POINT}${i?.logo}`
                                        : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                                    }>
                                </img>
                                <h4 className='hh4'>{i.name}{i.isDefault?< AiFillStar/> :""}</h4>
                            
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
                                <p>{`${moment(i?.createdAt).format('DD-MMM-YY (hh:mm A)',)}`}</p>
                            </div>
                            <div>
                                <h5>Updated On</h5>
                                <p>{`${moment(i?.updatedAt).format('DD-MMM-YY (hh:mm A)',)}`}</p>
                            </div>
                            <div>
                                <button className={i.isDefault?"btn2 no":"btn2"} disabled={i?.isDefault?true:false} onClick={()=>{EnableNetwork(!i?.enabled,i?.id)}}>{i?.enabled?"Diable":"Enable"}</button>
                                <button className={i.isDefault?"btn2 no":"btn2"} disabled={i?.isDefault?true:false} onClick={()=>{i.enabled ? DefaultNet(i?.id,i?.name) :cogoToast.error("Please Enable It First")}}>{i.isDefault?"Default": "Set Default"}</button>
                            </div>
                    
                        </div>
                    )
                })}

            </div>
          }
      </div>
    </Root>
  )
}

const Root = styled.section`
   h3{
        margin:20px 0px;
    }
    h1{
        text-transform: capitalize;
    }

.addnet_div{

    .add_listen{
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3{
            margin:20px 0px;
            button{
                width: 30px;
        }}
            .event_btn{
                height: 30px;
                padding: 2px;
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
        position: relative;
        .net_child{
            position: absolute;
            right:0;
            top: 0;

            .edit_net{
                background-color: transparent;
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                z-index: 999;
                left: 0;
                backdrop-filter: blur(4px);
            }

            .edit_net.no{
                display: none;
            }

            .btn1{
                padding:0;
                border: none;
                background-color: transparent;
                cursor: pointer;
                svg{
                    font-size: 25px;
                    color: white;
                    :hover{
                        transform: scale(1.1)
                    }
                }
            }
            .btn1.no{
                display: none;
            }
        }
        >div{
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 3px;
            .hh4{
                padding-left: 8px;
                svg{
                    overflow: hidden;
                    font-size: 20px;
                    text-align: center;
                    vertical-align: bottom;
                    color: red;
                }
            }
            h5,.hh4{
                min-width: 80px;
                text-transform: capitalize;
                margin: 0;
            }

            p{
                word-break: break-all;
            }
            .img_logo{
                height: 70px;
                width: 70px;
                object-fit: contain;
            }
            .btn2{
                padding: 5px;
                cursor: pointer;
            }
            .btn2.no{
                cursor: not-allowed;
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
