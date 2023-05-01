import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { kycUserData } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import moment from 'moment';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import FilterBarKYC from './FilterBarKYC';
import PaginationCode from '../Pagination';
import { useNavigate } from 'react-router-dom';

function KycDetails() {
  const [kycData, setKycData] = useState([]);
  const [docs, setDocs] = useState('');
  const [action, setAction] = useState('');
  const [loader, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoader, setImgLoader] = useState(true);
  const [docName,setDocName] = useState();
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchTextUser, setSearchText] = useState('');
  const [view, setView] = useState('list');
  const [checkStatus, setCheckStatus] = useState('')

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const dispatch = useDispatch();
  const nevigate = useNavigate()

  const dataLimit = 15;

  const callBack = (data) => {
    console.log("datadata", data)
    setTotalPage(data?.totalCount)
    setKycData(data.records);
    setLoader(false);
    // setLoading(data);
  };

  const kycActionApprove = async (id) => {
    // let userData = {
    //   "populate": ["user"],
    // }
    try {
      
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_APPROVE}${id}`)
        .then((res) => {
          const newData = kycData.map((i, ix) => {
            if (i.id == id) {
              return {...i,status:"APPROVED"}
            } else {
              return i
            }
          })
          setKycData(newData)
        });
    } catch (err) {
      console.log(err);
    }
  };

  const kycActionReject = async (id) => {
    // let userData = {
    //   "populate": ["user"],
    // }
    try {
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_REJECT}${id}`)
        .then((res) => {
          console.log(res);
          const newData = kycData.map((i, ix) => {
            if (i.id == id) {
              return {...i,status:"REJECTED"}
            } else {
              return i
            }
          })
          setKycData(newData)
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handelAction = (e, f) => {
    if (e == 'Approve') {
      kycActionApprove(f);
      // callData();
    } else if (e == 'Rejected') {
      kycActionReject(f);
      // callData();
    }
  };

  const callData = (activePage) => {
    var userData = {
      "populate": ["user"],
    }
 
    const obj = {search: searchTextUser, status: checkStatus}

    dispatch(
      kycUserData(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        {...userData,...obj},
        callBack,
      ),
    );
  };

  useEffect(() => {
    setLoader(true);
    callData(activePage);
  }, [activePage,searchTextUser, sort, order, checkStatus]);

  useEffect(() => {
    setLoader(true);
    callData(1);
  }, [searchTextUser]);

  console.log("kycData", checkStatus)

  return (
    <Root>
      <div className="main_div">

        <h1>User KYC</h1>

        <FilterBarKYC
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e.trim());
            }}
            view={view}
            setView={(e) => {
              setView(e);
            }}
            checkStatus = {(e)=>{
              setCheckStatus(e);
            }}
          />

        {loader ? (
          <LoaderCSS />
        ) : (
          <table>
            <caption>List Of Candidates Requested For KYC</caption>
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">User Name</th>
                <th scope="col">KYC Date</th>
                <th scope="col">Identity</th>
                <th scope="col">Address</th>
                <th scope="col">Remarks</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kycData && kycData?.map((i, ix) => {
                return (
                  <tr key={ix}>
                    <td>{ix + 1}</td>
                    <td className='nev_user' onClick={()=>{nevigate(`/user/userdetails/${i?.user?.id}`)}}>{i?.user?.firstName}{" "}{i?.user?.lastName}</td>
                    <td className="kyc_date" data-label="KYC Date">
                      {moment(i?.createdAt).format('DD - MMM - YYYY')}
                    </td>

                    <td data-label="ID Proof" className="docs">
                      <button
                        className="btn2"
                        value={i?.identityProof}
                        onClick={(e) => {
                          setDocs(e.target.value);
                          setIsOpen(!isOpen);
                          setImgLoader(false);
                          setDocName(i?.identityProofDocType.name)
                        }}
                      >
                        View Doc
                      </button>
                    </td>
                    <td data-label="Address Proof" className="docs">
                      <button
                        className="btn2"
                        data-label="Address"
                        value={i?.addressProof}
                        onClick={(e) => {
                          setDocs(e.target.value);
                          setIsOpen(!isOpen);
                          setImgLoader(false);
                          setDocName(i?.addressProofDocType?.name)
                        }}
                      >
                        View Doc
                      </button>
                    </td>
                    <td data-label="Remarks">
                      {i?.remarks ? i.remarks : 'No Remarks'}
                    </td>

                    <td data-label="Status"
                      className={
                        i?.status == 'APPROVED'
                          ? 'approve_status'
                          : i?.status == 'REJECTED'
                            ? 'reject_status'
                            : 'pending_status'
                      }
                    >
                      {i?.status}
                    </td>

                    <td className="select_cell">
                      <select
                        name="kyc_actions"
                        id="actions"
                        onClick={(e) => handelAction(e.target.value, i.id)}
                      >
                        <option value="">Actions</option>
                        <option value="Approve">Approve</option>
                        <option value="Rejected">Reject</option>
                      </select>
                    </td>
                  </tr>

                  
                );
              })}
            </tbody>
          </table>
        )}
        <div className={isOpen ? 'img_popup ' : 'img_popup active'}>
          {!imgLoader ? (
            docs.length > 0 ? (
              <div className="img_div">
                <h2>Document: {docName}</h2>
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="btn"
                >
                  <AiOutlineCloseCircle/>
                </button>

                <img src={`${IMAGE_END_POINT}${docs}`}></img>
              </div>
            ) : (
              <div className="noimg_div">
                <h1>No Image</h1>
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  Back
                </button>
              </div>
            )
          ) : (
            <LoaderCSS />
          )}
        </div>
      </div>
      <PaginationCode
            active={activePage}
            activePage={(e) => {
              setActivePage(e);
            }}
            totalPage={totalPage}
            limit={dataLimit}
          />
    </Root>
  );
}

export default KycDetails;

const Root = styled.section`
    color: whitesmoke;
  .main_div {
    table {
      border: 1px solid #ccc;
      border-collapse: collapse;
      margin: 0;
      padding: 0;
      width: 100%;
      table-layout: auto;
      .docs {
        padding: 0;
        .btn2 {
          text-align: left;
          padding: 10px;
          color: #ffffffcc;
          outline: none;
          border: none;
          width: 100%;
          transition: 0.5s;
          cursor: pointer;
          background-color: #070c27;
          :hover {
            background-color: #6b6767;
          }
        }
      }
      .approve_status {
        background-color: #67e1676b;
      }
      .reject_status {
        background-color: #ca32327a;
      }
      .pending_status {
        background-color: #cdcd297a;
      }
      .select_cell {
        padding: 0;
        select {
          border: none;
          padding: 10px;
          outline: none;
          background-color: #070c27;
          color: #ffffffcc;
        }
      }

      td,
      th {
        border: 1px solid #ccc;
        padding: 0.625em;
        text-align: left;
        text-transform: capitalize;
      }
      .nev_user{
        cursor: pointer;
        :hover{
          background-color: grey;
        }
      }
      .user_name {
        word-break: break-all;
      }

      @media (max-width: 700px) {
        border: hidden;
        tbody {
          border: hidden;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        td,
        th {
          /* border: 1px solid #ccc; */
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
        }
        td {
          border-bottom: 1px solid #ddd;
          display: block;
        }

        td::before {
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
        }
        td:last-child {
          border-bottom: 1px solid #ddd;
        }
        .docs {
          padding: 0.625em;
          .btn2 {
            text-align: center;
          }
        }
      }
    }
    .img_popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;

      .img_div {
        position: relative;
        height: 70%;
        width: 70%;
        background: #070c2773;;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: column;
        align-items: center;
        border: 1px solid;

        img {
          object-fit: contain;
          height: 80%;
          width: 80%;
          padding: 10px;
        }

        .btn {
          margin-right: 0px;
          position: absolute;
          right: 0;
          margin-top: -4px;
          margin-right: -5px;
          top:0;
          background-color: transparent;
          font-size: 30px;
          border: none;
          color: white;
        }
      }
      .noimg_div {
        display: flex;
        gap: 5px;

        button {
          border-radius: 50%;
          padding: 10px;
          :hover {
            background-color: orange;
          }
        }
      }
    }
    .img_popup.active {
      display: none;
    }
  }
`;
