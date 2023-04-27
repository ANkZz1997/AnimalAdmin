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
    <Root>
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
                  <th>Type</th>
                  <th>NFT Details</th>
                  <th>Price</th>
                  <th>Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {userActivity && userActivity?.map((i) => {
                  return (
                    <tr>
                      <td data-label="Type">
                        <h4>{i.type}</h4>
                      </td>
                      
                      
                        <td data-label="NFT Details" className="nft_cell">
                          {' '}
                          {i.type == 'LOGIN' ? (
                            '---'
                          ) : (i.type == "INTENT"?<h5>Payment Initiated</h5>:(i.type == "VERIFIED"?<h5>Payment Successfull</h5>:
                            <Link to={`/nfts/nftdetails/${i?.nft?.id}`}>
                              <div>
                                <img
                                  src={`${IMAGE_END_POINT}${i.nft?.media}`}
                                />{' '}
                                <h5>{i.nft?.name}</h5>
                              </div>
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
                      <td data-label="Date & Time">
                        <h4>{`${moment(i?.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`}</h4>
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
    </Root>
  );
}

export default UserActivities;

const Root = styled.section`
color: whitesmoke;
  * {
    margin: 0;
    padding: 0;
  }
  h2 {
        text-align: center;
      }
  .loader_parent {
    height: 100%;
  }
  .table_title {
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 25px;
    font-weight: 900;
    font-family: emoji;
    padding: 10px;
    padding-left: 30px;
    color: whitesmoke;
  }

  .overview {
    border-radius: 10px;
    margin-top: 20px;
    padding: 10px;
    background-color: rgb(17 22 50);

    table {
      padding: 10px;
      width: 100%;
      text-align: left;
      th {
        font-size: 20px;
        padding: 5px;
        padding-bottom: 5px;
      }

      td {
        padding: 5px;
      }

      .nft_cell {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        img {
          height: 30px;
          width: 30px;
        }
        h5 {
          text-transform: capitalize;
        }
      }

      @media (max-width: 575px) {
        td,
        th {
          border: 1px solid #ccc;
          padding: 0.625em;
          text-align: right;
        }
        thead {
          border: none;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          text-align: right;
        }
        tr {
          border-bottom: 2px solid #ddd;
          display: block;
          margin-bottom: 0.8em;
        }
        td {
          border-bottom: 1px solid #ddd;
          display: block;
        }
        td::before {
          content: attr(data-label);
          float: left;
          font-weight: 400;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          text-align: left;
        }
        .nft_cell {
          justify-content: space-between;
        }
      }
    }
  }
`;
