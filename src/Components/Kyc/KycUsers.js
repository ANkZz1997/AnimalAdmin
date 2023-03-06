import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useState } from 'react';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';

function KycUsers({ items, indx }) {
  const [kycData, setKycData] = useState();
  const [userDetails, setUserDetails] = useState();
  const [docs, setDocs] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [imgLoader, setImgLoader] = useState(true);
  const [loader,SetLoader] = useState(true)

  const getUserDetails = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_USER_DETAILS}${id}`, axiosConfig)
        .then((res) => {
          setUserDetails(res.data.data);
          SetLoader(false)
          //   getNftDetails();
          //   setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // SetLoader(true)
    setKycData(items);
    getUserDetails(items?.user);
  }, [items]);

  console.log('docs', docs.length);

  return (
    <>
      <td scope="row" className="s_no" data-label="S.No">
        {indx + 1}
      </td>
      <td className="user_name" data-label="User">
        @{userDetails?.username}
      </td>
      <td className="kyc_date" data-label="KYC Date">
        {moment(kycData?.createdAt).format('DD - MMM - YYYY')}
      </td>
      <td data-label="ID Proof" className="docs">
        <button
          className="btn2"
          value={kycData?.identityProof}
          onClick={(e) => {
            setDocs(e.target.value);
            setIsOpen(!isOpen);
            setImgLoader(false);
          }}
        >
          View Doc
        </button>
      </td>
      <td data-label="Address Proof" className="docs">
        <button
          className="btn2"
          data-label="Address"
          value={kycData?.addressProof}
          onClick={(e) => {
            setDocs(e.target.value);
            setIsOpen(!isOpen);
            setImgLoader(false);
          }}
        >
          View Doc
        </button>
      </td>

      <td data-label="Remarks">
        {kycData?.remarks ? kycData.remarks : 'No Remarks'}
      </td>
      <td
        data-label="Status"
        className={
          kycData?.status == 'APPROVED'
            ? 'approve_status'
            : kycData?.status == 'REJECTED'
            ? 'reject_status'
            : 'pending_status'
        }
      >
        {kycData?.status}
      </td>
      <div className={isOpen ? 'img_popup ' : 'img_popup active'}>
        {!imgLoader ? (
          docs.length > 0 ? (
            <div className="img_div">
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
          <LoaderCSS/>
        )}
      </div>
    </>
  );
}

export default KycUsers;
