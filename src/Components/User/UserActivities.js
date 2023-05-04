import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import URLS from '../../utils/urls';
import { userActivitiesActions } from '../../redux/admin/action';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import { Link } from 'react-router-dom';
import { UserChildCss } from './UserChildCss';
import DateRange from '../Dashboard/DateRange';
import {AiOutlineCloseCircle} from 'react-icons/ai'




function UserActivities({ ids }) {
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [userActivity, setUserActivity] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [loader, setLoader] = useState(true);
  const [datePopup, setDatePopup] = useState(false);
  const [selected,setSelected] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [rawStart, setRawStart] = useState();
  const [rawEnd, setRawEnd] = useState()

  const dataLimit = 10;
  const dispatch = useDispatch();
  const callBack2 = (data) => {
    console.log('userActivity----', data);
    setUserActivity(data?.records);
    setTotalPage(data?.totalCount);
    setLoader(false);
  };

  const onChange = (ranges) => {
    setRawStart(ranges?.startDate);
    setRawEnd(ranges?.endDate);
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
    setRawStart();
    setRawEnd();
  }

  const userActivities = (activePage) => {
    const obj = { user: ids,
    };
    if(selected){
      obj['type']=selected;
    }
    if(startDate && endDate){
      obj['createdAt'] = { ">=" : moment(rawStart).startOf("day").valueOf(), "<=" : moment(rawEnd).endOf("day").valueOf() };
    }
    setLoader(true);
    dispatch(
      userActivitiesActions(
        {
          page: activePage,
          limit: dataLimit,
          sorting: 'createdAt',
          order: 'DESC',
        },
        callBack2,
        obj,
      ),
    );
  };

  useEffect(() => {
    setLoader(false);
    userActivities(activePage);
  }, [activePage,rawStart, rawEnd]);
  useEffect(() => {
    setLoader(false);
    userActivities(1);
  }, [selected]);

  console.log("Dataaaaaaaa",startDate, endDate, selected)

  return (
    <UserChildCss>
      <div className="overview">
        <div className="table_title">Activities {startDate?<h3>{`${startDate} To ${endDate}`}<button onClick={()=>{clearFunction()}}>Clear</button></h3>:""}</div>
        <div className='activity_filter'>
          <select className='select_type' onChange={(e)=>{setSelected(e.target.value)}}>
            <option value="">All Type</option>
            <option value="ADDTOMARKET">Added To MarketPlace</option>
            <option value="CREATE">NFT Created</option>
            <option value="BUY">NFT Bought</option>
            <option value="SOLD">NFT Sold</option>
            <option value="MARKFAV">Marked Favourite</option>
            <option value="UNMARKFAV">Unmarked Favourite</option>
            <option value="REMOVEFROMMARKET">Removed From MarketPlace</option>
            <option value="UPDATEPRICE">Price Updated</option>
            <option value="BID">Placed Bid</option>
            <option value="INTENT">Created Payment Intent</option>
            <option value="VERIFIED">Payment Intent Verified</option>
          </select>
          <div className="date_range">
            <button onClick={() => setDatePopup(true)}>Select Date </button>
            <div
              className={
                datePopup ? 'date_popup_active' : 'date_popup_notactive'
              }
            >
              <div className="date_main_div">
                  <button className='cncl_btn'  onClick={() => {setDatePopup(false);clearFunction()}}>
                    <AiOutlineCloseCircle/>
                  </button>
                  <button className='sav_btn' onClick={() => setDatePopup(false)}>
                    Save
                  </button>
                <DateRange onChange={onChange}/>
              </div>
            </div>
          </div>
        </div>

        <div className="overview_section">
          {loader ? (
            <div className="loader_parent">
              <LoaderCSS />
            </div>
          ) : userActivity?.length>0?
            <table>
              <thead>
                <tr>
                  <th>Date/Time</th>
                  <th>Type</th>
                  <th>NFT Details</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {userActivity && userActivity?.map((i) => {
                  return (
                    <tr>
                       <td data-label="Date & Time">
                        <h4>{`${moment(i?.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`}</h4>
                      </td>

                      <td data-label="Type">
                        <h4>{i.type}</h4>
                      </td>
                      
                      
                        <td data-label="NFT Details" className="nft_cell">
                          {' '}
                          {i.type == 'LOGIN' ? (
                            '---'
                          ) : (i.type == "INTENT"?<h5>Payment Initiated</h5>:(i.type == "VERIFIED"?<h5>Payment Successfull</h5>:
                            <Link to={`/nfts/nftdetails/${i?.nft?.id}`}>
                              {/* <div><img src={`${IMAGE_END_POINT}${i.nft?.media}`}/>{' '} */}
                                <h4>{i.nft?.name}</h4>
                              {/* </div> */}
                             </Link>
                          )
              
                          )}{' '}
                        </td>
                      <td data-label="Price">
                        {' '}
                        {i.type == 'LOGIN' ? (
                          '---'
                        ) : (
                          <h4>
                            {i.marketplace
                              ? `${i.marketplace?.price}Eth`
                              : (i.bid?.price?`${i.bid?.price}Eth`:(i.type=="INTENT"|| i.type == "VERIFIED"?`${i.payload?.amount}Rs`:"---"))}{' '}
                          </h4>
                        )}{' '}
                      </td> 
                     
                    </tr>
                  );
                })}
              </tbody>
            </table>:
            <h2>No Data</h2>
          }
        </div>
      </div>
      {userActivity?.length==0?"": 
        <PaginationCode
          active={activePage}
          activePage={(e) => {
            setActivePage(e);
          }}
          totalPage={totalPage}
          limit={dataLimit}
        />
      }
    </UserChildCss>
  );
}

export default UserActivities;

