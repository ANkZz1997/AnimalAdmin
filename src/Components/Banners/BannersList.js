import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import ConfirmDialogue from '../Model/ConfirmDialogue';

export default function BannersList({newBanner}) {

    const [toggle, setToggle] = useState(false)
    const [deleteBanner, setDeleteBanner] = useState(false)
    const [btnState, setBtnState] = useState(false)
    const [bannerData, setBannerData] = useState([])
    const [loader, setLoader] = useState(false)
    const [bannerId,setBannerId] = useState()
    const [bannerName,setBannerName] = useState()

    const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

    const getDetails = (bannerId)=>{
        return bannerData.filter((s)=>s.id == bannerId)[0]
    }

    const bannerList = async ()=>{
        try{
            const axiosConfig = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }

            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.BANNER_LIST}?page=1&limit=20&sort=createdAt&order=DESC`,axiosConfig);
            console.log("responseOfBanners",res?.data?.data?.records)
            setBannerData(res?.data?.data?.records)
            setLoader(false)

        }catch(err){
            console.log("err",err)
        }
    }

    const handleApi = async (bannerId)=>{
        let updateBanner = bannerData.filter((s)=>s.id != bannerId);
        console.log("updateBannerDelete",updateBanner)
        const data = {
            id: bannerId,
        }
        try{
            const axiosConfig = {
                headers:{
                    authorization:`Bearer ${localStorage.getItem('token')}`,
                }
            }
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.DELETE_BANNER}`,data,axiosConfig)
            console.log("resDelete",res.data.data[0])
            setBannerData(updateBanner)

        }catch(err){
            console.log("err",err)
        }
        
    }

    const handleStatus = async (bannerId) =>{
        let updateBanner = bannerData.filter((s)=>s.id == bannerId)[0].isActive
        const data = {
            id: bannerId,
            isActive:!updateBanner,
        }
        try{
            const axiosConfig = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.BANNER_STATUS}`, data, axiosConfig);
            console.log('respooo ---- ',res.data.data[0])

            const filterData = bannerData.map((i,ix)=>{
                if(i.id == bannerId){
                    return {...i,isActive : !i.isActive }
                }else{
                    return i
                }
            })

            setBannerData(filterData)
        }catch(err){
            console.log("err",err)
        }
    }

    useEffect(()=>{
        // setLoader(true)
        bannerList()
    },[])

    useEffect(()=>{
        if(newBanner){
            // setLoader(true)
            setBannerData([newBanner , ...bannerData ])
        }
    },[newBanner])

    console.log("newBanner", newBanner)

    return (
        <Root>
            <h1>Active Banners</h1>
        
            <ConfirmDialogue  show={deleteBanner} handleClick={(e)=>{setDeleteBanner(e)}}>
             <h1>Confirm To Delete {getDetails(bannerId)?.name} ?</h1>
             <p>Do you really want to Delete this banner?</p>
             <button className='btns2' onClick={()=>{handleApi(bannerId);setDeleteBanner(!deleteBanner) } }>Yes</button> 
             <button className='btns2' onClick={()=>{setDeleteBanner(!deleteBanner)}}>No</button>
            </ConfirmDialogue>

            <ConfirmDialogue show={toggle} handleClick={(e)=>{setToggle(e)}}>
                <h1>Confirm To {btnState ? 'Enable' : 'Disable'} {getDetails(bannerId)?.name} ? </h1>
                <p>Do you really want to {getDetails(bannerId)?.isActive ?  'Disable' : 'Enable'} banner?</p>
                <button className='btns2' onClick={()=>{handleStatus(bannerId);setToggle(!toggle); } }>Yes</button> 
                <button className='btns2' onClick={()=>{setToggle(!toggle)}}>No</button>
            </ConfirmDialogue>

            {loader? <LoaderCSS/>:
                            bannerData?.map((i, ix)=>{
                                return(
                                        <div className={i.isActive?'banners_list_div':'banners_list_div off'} key={ix}>
                                            <div className='banner_img'>
                                                <img className='img2' src={i?.image?`${IMAGE_END_POINT}${i?.image}`:`${IMAGE_END_POINT}${i?.media}`}/>
                                            </div> 
                                            <div className='banner_content'>
                                                <h2>{i?.name}</h2>
                                                <h4>Link : <button className='link_btn' onClick={()=>{window.open(`https://${i?.link}`,"_blank")}}>{i?.link}</button></h4>
                                                <h4>Description : {i?.description}</h4>
                                                <div className='action_btns'>
                                                    <button className={i.isActive ? 'btn':'btn disable'} onClick={()=>{ setToggle(true);setBannerId(i?.id);}}>
                                                        {i.isActive ? "Diable":"Enable"}
                                                    </button>
                                                    <button className='btn_del' onClick={()=>{ setDeleteBanner(!deleteBanner);setBannerId(i?.id);}}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                )
                            })
                        }
           
        </Root>
    )
}

const Root = styled.section`

.banners_list_div{
        display: flex;
        padding: 10px;
        gap: 20px;

        .banner_img{
            width:50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #010417;

            img{
                aspect-ratio: 16/9;
                height: 99%;
                width: 80%;
                object-fit: cover;
            }

        }
        .banner_content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            width:50%;

            h2,h4{
                padding: 0;
                margin: 10px;
                text-transform: capitalize;
            }
            .btn{
                background-color: #dddd43;
                margin: 10px;
                height: 30px;
                width: 50px;
                border: none;
                :hover{
                    background-color: #ffff14;
                }
            
            }
            .btn.disable{
                background-color: #60a660;
                :hover{
                    background-color: #70e470;
                }
            }
            .btn_del{
                padding: 5px;
                background-color: #fd5959;
                border: none;
                height: 30px;
                width: 50px;
                :hover{
                    background-color: #ca0d0d;
                }

            }
            .link_btn{
                background-color: transparent;
                color: white;
                border: none;
                padding: 2px;
                :hover{
                    color: #5d5dff;
                }
            }
          
        }

    }
.banners_list_div.off{
    opacity: 0.5;
}

`