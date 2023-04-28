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

function UserActivities({ ids }) {
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [userActivity, setUserActivity] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [loader, setLoader] = useState(true);
  const dataLimit = 10;
  const dispatch = useDispatch();
  const callBack2 = (data) => {
    console.log('userActivity----', data);
    setUserActivity(data?.records);
    setTotalPage(data?.totalCount);
    setLoader(false);
  };

  const userActivities = () => {
    const obj = { user: ids };
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
    userActivities();
  }, [activePage]);

  console.log("Dataaaaaaaa",userActivity?.length)

  return (
    <UserChildCss>
      <div className="overview">
        <div className="table_title">Activities</div>

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

