import React, { useEffect, useState } from 'react'
import { FaUser, FaUserCheck, FaUserClock, FaUserSlash, FaUserTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { checkUserAction } from '../../redux/admin/action';
import LoaderCSS from '../Loader';
import DateRange from './DateRange';
import NftTransactionChart from './NftTransactionChart';
import TopBuyer from './TopBuyer';
import TopSeller from './TopSeller';
import cogoToast from 'cogo-toast';
import axios from 'axios';
import URLS from '../../utils/urls';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import RevenueGenerated from './RevenueGenerated';

export default function DashboardData() {
    const [dashboardData,setDashboardData] = useState('')
    const [loader, setLoader] = useState(true);
    const [datePopup, setDatePopup] = useState(false);
    const [startDate, setStartDate] = useState('Start Date');
    const [endDate, setEndDate] = useState(' End Date');
    const dispatch = useDispatch();
    const nevigate = useNavigate();


    const onChange = (ranges) => {
        const newDateStart = String(ranges.startDate).split(' ');
        const newDateEnd = String(ranges.endDate).split(' ');
        const formateDateStart = `${newDateStart[1]}-${newDateStart[2]}-${newDateStart[3]}`;
        const formateDateEnd = `${newDateEnd[1]}-${newDateEnd[2]}-${newDateEnd[3]}`;
        setStartDate(formateDateStart);
        setEndDate(formateDateEnd);
      };

    const clearFunction =()=>{
    setStartDate();
    setEndDate();
  }

    const getDashboardDetails = async()=>{
      try{
        const res = await axios.post(`${URLS.EXCHANGE.ADMIN.GET_DASHBOARD}`,{})
        if(res.status === 200){
          setDashboardData(res.data?.data)
          setLoader(false);
        }else if(res.status === 500){
          dispatch(checkUserAction(false));
          localStorage.setItem('token', "");
          cogoToast.warn('Session Expired');
        }
      }catch(err){
          cogoToast.error("Something Went Wrong",err.message)
      }
    }

    useEffect(() => {
        setLoader(true);
        getDashboardDetails()
    }, []);
    

  return (
    <Root>
        <h1>Dashboard</h1>

        <div className="box-div">
            <div>
            </div>
            <div className="card_parent">
              <div className="card_1" onClick={()=>{nevigate("/user?type=alluser")}}>
                  <div>
                    Total NFT Users
                    {loader ? (
                      <LoaderCSS />
                    ) : (
                      <h2>{dashboardData?.totalUsers}</h2>
                    )}
                  </div>
                  <div>
                    <FaUser/>
                  </div>
              </div>
                <div className="card_1" onClick={()=>{nevigate("/user?type=NEW")}}>
                  <div>
                    New NFT Users
                    {loader ? (
                      <LoaderCSS />
                    ) : (
                      <h2>{dashboardData?.newUserCount}</h2>
                    )}
                  </div>
                  <div>
                    <FaUserCheck />
                  </div>
              </div>

              <div className="card_1" onClick={()=>{nevigate("/user?type=joinedtoday")}}>

                  <div>
                    Joined Today
                    {loader ? (
                      <LoaderCSS />
                    ) : (
                      <h2>{dashboardData?.todayUser}</h2>
                    )}
                  </div>
                  <div>
                    <FaUserClock/>
                  </div>
              </div>
              <div className="card_1" onClick={()=>{nevigate("/user?type=BLOCKED")}}>

                  <div>
                    Blocked Users
                    {loader ? (
                      <LoaderCSS />
                    ) : (
                      <h2>{dashboardData?.blockedUserCount}</h2>
                    )}
                  </div>
                  <div>
                    <FaUserSlash/>
                  </div>
              </div>
              <div className="card_1 last" onClick={()=>{nevigate("/user?type=INACTIVE")}}>
                  <div>
                    Inactive Users
                    {loader ? (
                      <LoaderCSS />
                    ) : (
                      <h2>{dashboardData?.inactiveUser}</h2>
                    )}
                  </div>
                  <div>
                    <FaUserTimes/>
                  </div>
              </div>
            </div>
          </div>

          <div className="date_range">
            <button onClick={() => setDatePopup(true)}>Select Date </button>
            <div>
              {
                startDate? <h3>{`${startDate} To ${endDate}`}</h3>: <h3>Select Date Range</h3>
              }
              
            </div>
            <div
              className={
                datePopup ? 'date_popup_active' : 'date_popup_notactive'
              }
            >
              <div className="date_main_div">
                <button className="cncl_btn" onClick={() => {setDatePopup(false);clearFunction()}}>
                <AiOutlineCloseCircle/>
                </button>
                <button className='sav_btn' onClick={() => setDatePopup(false)}>
                    Save
                  </button>
                <DateRange onChange={onChange} />
              </div>
            </div>
          </div>
          
          <div className="dashboard_body">
            <div className="body_front">
              <div className="top_bar">
                  <TopSeller />
                  <TopBuyer />
              </div>

              <div className="mid_bar">
                <div className="nft_transaction">
                  <NftTransactionChart />
                </div>
                <div className="nft_transaction">
                  <NftTransactionChart />
                </div>
                <div className="nft_transaction">
                  <NftTransactionChart />
                </div>
                <div className="nft_transaction">
                  <NftTransactionChart />
                </div>
                <div></div>
              </div>
            </div>

            <div className="body_side">
                <RevenueGenerated/>
            </div>
          </div>

    </Root>

  )
}

const Root = styled.section`
    color: whitesmoke;
.card_parent {
    display: flex;
    justify-content:space-around;
    width: 100%;
    align-items: center;
    box-shadow: 0 1px 0px 0 #4c4c4c, 0 0 0 1px #3c3c3e;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 20px;
    color: whitesmoke;

    > a:last-child {
      border-right: none;
    }

    .card_1 {
      transition: all 1s;
      width: 20%;
      display: flex;
      justify-content: space-around;
      border-right: 1px solid grey;
      padding-top: 15px;
      padding-bottom: 15px;
      padding-left: 5px;
      padding-right: 5px;
      cursor: pointer;
      > div:first-child {
        h2 {
          margin: 0;
          padding: 0;
        }
      }

      > div:last-child {
        border-radius: 50%;
        border: 3px solid white;
        /* padding: 15px; */
        display: flex;
        align-items: center;
        height: 50px;
        width: 50px;
        justify-content: center;
        svg{
            font-size: 25px;
        }
      }
      :hover {
        transform: scale(1.1);
      }
    }
    .card_1.last{
      border-right: 0;
    }
  }

  .dashboard_body {
    display: flex;
    gap: 10px;
    .body_front {
      width: 75%;
      gap: 20px;
      .top_bar {
        display: flex;
        gap: 15px;
        align-items: center;
        flex-direction: column;
      
      }
      .mid_bar {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 10px;
        .nft_transaction {
          width: 49.2%;
        }
      }
    }

    .body_side {
      min-width: 25%;
      /* border: 1px solid grey; */
      border-radius: 20px;

      .sidebar_content {
        display: flex;
        flex-direction: column;
        position: sticky;
        gap: 10px;
        top: 0px;
      }
    }
  }


  .date_range {
    display: flex;
    justify-content: space-around;
    transition: all 1s;
    margin: 20px;
    align-items: center;

    button {
      padding: 5px;
      border-radius: 5px;
      background-color: whitesmoke;
      cursor: pointer;

    }
    .date_popup_active {
      position: fixed;
      top: 0px;
      right: 0;
      z-index: 9999;
      backdrop-filter: blur(6px);
      color: black;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;

      .date_main_div {
        position: relative;

         .cncl_btn{
          position: absolute;
          right: 0;
          margin-top: -30px;
          margin-right: -10px;
          border-radius: 50%;
          height: fit-content;
          padding: 0px;
          background: transparent;
          color: white;
          border: none;
          :hover{
            color: #9b5050fc;
          }
          svg{
            font-size: 30px;
          }
        }
        .sav_btn{
          position: absolute;
          bottom: 0;
          margin-bottom: -34px;
          right: 0;
          border: none;
          cursor: pointer;
          padding: 7px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .date_popup_notactive {
      content-visibility: hidden;
    }
  }

`
