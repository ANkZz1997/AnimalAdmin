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
import { getChainsListAction, preLoginAction } from '../../redux/admin/action'
import LoaderCSS from '../Loader'
import StripeCallback from '../PreLoginSettings/StripeCallback'
import CompanyLogo from '../PreLoginSettings/CompanyLogo'
import { stopLoading } from '../../redux/common/action'


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
            if (val[i] === "") {
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
            dispatch(getChainsListAction());
        }else{
            dispatch(stopLoading());
        }
    }, [userCheck])

    console.log('checkErr',userCheck)

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
                        <div className='sidebar'>
                            <Sidebar />
                        </div>
                        <div className='main_section'>
                            <div className='profile_top_bar'><Topbar/></div>
                            <div className='content_section'>{children}</div>
                        </div>
                    </div>

                    // <div className='layout_section'>
                    //     <div>
                    //         <Topbar/>
                    //         <div className='sidebar'>
                    //             <Sidebar />
                    //         </div>
                    //     </div>

                    //     <div className='main_section'>
                    //         <div className='content_section'>{children}</div>
                    //     </div>
                    // </div>

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

.layout_section {
    display: flex;
    width:100%;
    background-color: #070c27;
    .sidebar {
        flex: 0 240px;
        height: 100vh;
        position: sticky;
        top: 0px;
        background: #070c27;
        padding: 20px 10px 20px 20px;
        border-right: 1px solid #3b3b3b;
        overflow-x: scroll;
        ::-webkit-scrollbar{
            display: none;
        }
        @media(max-width: 1000px){
            display:none;
        }
    }
    .main_section {
        flex: 1;
        position: relative;
        display: block;
        width: calc(100% - 240px);
        .profile_top_bar {
            position: sticky;
            top: 0px;
            z-index:9;
            /* box-shadow: 4px 0px 9px 0px #b3a6a6; */
           
        }
        .content_section{
            width:100%;
            padding:20px;
            min-height: 100vh;
        }
    }
}

`
