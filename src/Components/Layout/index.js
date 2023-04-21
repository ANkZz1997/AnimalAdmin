import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Login from '../Login'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import PreSettings from './../../Pages/PreSettings'
import URLS from '../../utils/urls'
import axios from 'axios'
// import PreLoginSetting from '../PreLoginSettings'
import CommissionValue from '../PreLoginSettings/CommissionValue'
import LazyMinting from '../PreLoginSettings/LazyMinting'
import PinataCredentials from '../PreLoginSettings/PinataCredentials'
import StripeSecret from '../PreLoginSettings/StripeSecret'
import { preLoginAction } from '../../redux/admin/action'
import LoaderCSS from '../Loader'
import StripeCallback from '../PreLoginSettings/StripeCallback'
import CompanyLogo from '../PreLoginSettings/CompanyLogo'


export default function Layout({ children }) {
    const userCheck = useSelector((state) => state?.persistReducer?.isUser);
    const [checkPreSettings, setCheckPreSettings] = useState(true)
    const [settingRes, setSettingRes] = useState({});
    const [activeTab, setActiveTab] = useState();
    const [loader,setLoader] = useState(true);

    const dispatch = useDispatch();

    const userCallback = (data) => {
        console.log("sagapresetting",data)
        setSettingRes(data);
        checkEmpty(data);
        setLoader(false);
      };

    const checkEmpty = (val) => {
        let emptyKey = [];
        for (const i in val) {
            if (val[i] == "") {
                emptyKey.push(i);
            }
        }
        emptyKey = emptyKey.filter(function (items) {
            return items !== "adminPrivateKey"
        })
        setActiveTab(emptyKey[0])
        setSettingRes(emptyKey)
    }

    const handleCall =()=>{
        dispatch(preLoginAction({},userCallback));
    }

    useEffect(() => {
        setLoader(true);
        console.log('checkkk ----- 00000')
        if(userCheck){
            dispatch(preLoginAction({},userCallback));
        }
    }, [userCheck])

    console.log('checkErr')

    return (
        <Root>
            {
            userCheck?
                loader?<LoaderCSS/> : 
                    settingRes.length > 0 ?
                        <>
                            {activeTab == "commission" || activeTab == "commissionType" ? 
                            <CommissionValue nextPage={(e)=>{handleCall()}}/>:  
                            activeTab == "lazymint"?<LazyMinting nextPage={(e)=>{handleCall()}} />: 
                            //  activeTab == "adminPrivateKey" ? <LazyMinting /> : 
                            activeTab == "pinataApiKey" || activeTab == "pinataSecret" ? 
                            <PinataCredentials nextPage={(e)=>{handleCall()}} />: 
                            activeTab == "stripeSecret" ? <StripeSecret nextPage={(e)=>{handleCall()}}/> : activeTab == "stripeCallbackUrl"
                            ? <StripeCallback nextPage={(e)=>{handleCall()}}/>:activeTab == "platformTitle" || activeTab == "platformLogo"?
                            <CompanyLogo nextPage={(e)=>{handleCall()}} />: ""
                            }
                        </>
                    :
                    <div className='layout_section'>
                        <div>
                            <Topbar />
                            <div className='sidebar'>
                                <Sidebar />
                            </div>
                        </div>

                        <div className='main_section'>
                            <div className='content_section'>{children}</div>
                        </div>
                    </div>

                :
                <div>
                    <Login />
                </div>
            }
        </Root>
    )
}

const Root = styled.section`
height: 100%;
.layout_section{
    background-color: #070c27;
    display: flex;
    height: 100%;
    /* width: 100%; */
    *::-webkit-scrollbar {
  display: none;
}
    .sidebar{
        width: 240px;
        padding: 20px 10px 20px 20px;
        border-right: 1px solid #3b3b3b;
        gap: 60px;
        position: sticky;
        overflow-x: scroll;
        height: 100vh;
        z-index: 999;
        top: 0px;
        background: #070c27;
        ::-webkit-scrollbar{
            display: none;
        }
        @media(max-width: 1000px){
            display:none;
        }

    }
    .main_section{
        width: 82%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0px auto;
        position: relative;
        margin-top: 15px;
        .top_bar{
            width: auto;
        }
        .content_section {
            flex: 1;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 10px;
            /* margin-top: 10px; */
            padding-top: 75px;
        }
        @media(max-width: 1000px){
            width: 95%;
        }
    }
}


`
