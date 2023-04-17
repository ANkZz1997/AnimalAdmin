import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { kycUserData } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import moment from 'moment';
import { configAxios } from '../../utils/https';

function KycDetails() {
  const [kycData, setKycData] = useState([]);
  const [docs, setDocs] = useState('');
  const [action, setAction] = useState('');
  const [loader, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoader, setImgLoader] = useState(true);
  const [docName,setDocName] = useState();

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const dispatch = useDispatch();

  const callBack = (data) => {
    console.log("datadata", data)
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
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_APPROVE}${id}`, configAxios)
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
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_REJECT}${id}`, configAxios)
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

  const callData = () => {
    var userData = {
      "populate": ["user"],
    }
    dispatch(
      kycUserData(
        {
          page: 1,
          limit: 100,
          sorting: 'createdAt',
          order: 'DESC',
        },
        userData,
        callBack,
      ),
    );
  };

  useEffect(() => {
    // handelAction()
    callData();
  }, []);

  console.log("kycData", kycData)

  return (
    <Root>
      <div className="main_div">

        <h1>KYC Details Page</h1>
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
              {kycData?.map((i, ix) => {
                return (
                  <tr key={ix}>
                    <td>{ix + 1}</td>
                    <td>@{i?.user?.username}</td>
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
                          setDocName(i?.identityProof?"Identity Proof":"")
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
                          setDocName(i?.addressProof?"Address Proof":"")
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
                  close
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
          margin-top: -5px;
          margin-right: -5px;
          top:0;
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
