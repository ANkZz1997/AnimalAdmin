import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { kycUserData } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import KycUsers from './KycUsers';

function KycDetails() {
  const [kycData, setKycData] = useState();
  const [docs, setDocs] = useState('');
  const [action, setAction] = useState('');
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const callBack = (data) => {
    setKycData(data);
    setLoader(false);
    // setLoading(data);
  };

  const kycActionApprove = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_APPROVE}${id}`, axiosConfig)
        .then((res) => {
          console.log(res)
        });
    } catch (err) {
      console.log(err);
    }
  };

  const kycActionReject = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.KYC_ACTION_REJECT}${id}`, axiosConfig)
        .then((res) => {
          console.log(res);

        });
    } catch (err) {
      console.log(err);
    }
  };

  const handelAction = (e, f) => {
    if (e == 'Approve') {
      kycActionApprove(f);
      callData();
    } else if (e == 'Rejected') {
      kycActionReject(f);
      callData();
    }
  };

  const callData = () => {
    dispatch(
      kycUserData(
        {
          page: 1,
          limit: 100,
          sorting: 'createdAt',
          order: 'DESC',
        },
        callBack,
      ),
    );
  };

  useEffect(() => {
    handelAction()
    callData();
  }, [kycData]);

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
                {kycData?.records.map((i, ix) => {
                  return (
                    <tr>
                      <KycUsers items={i} indx={ix} />
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
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;

      .img_div {
        position: relative;
        height: 80%;
        width: 80%;

        img {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }

        .btn {
          margin-right: 0px;
          position: absolute;
          right: 0;
          margin-top: -5px;
          margin-right: -5px;
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
