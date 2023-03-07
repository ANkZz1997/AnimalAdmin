import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import SingleUserDetail from '../Components/User/SingleUserDetail';
import { useParams } from 'react-router-dom';
import LoaderCSS from '../Components/Loader';
import { nftDataAction, userActivitiesActions } from '../redux/admin/action';
import URLS from '../utils/urls';

function UserDetailsId() {
  const [userDetails, setUserDetails] = useState({});
  const [userActivity, setUserActivity] = useState();
  const [loader, setLoader] = useState(true);
  const [nfts, setNfts] = useState('');
  let {id} = useParams()
  const ids = id
  const dispatch = useDispatch();
  const callBack = (data) => {
    setNfts(data);
  };

  const callBack2 = (data) => {
    setUserActivity(data?.records);
  };

  const getUserDetails = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_USER_DETAILS}${ids}`, axiosConfig)
        .then((res) => {
          setUserDetails(res?.data?.data);
          getNftDetails();
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  const getNftDetails = () => {
    const data ={}
    const nftObj = [{ user: ids }];
    dispatch(
      nftDataAction(
        {
          page: 1,
          limit: 100,
          sorting: 'createdAt',
          order: 'DESC',
        },
        data,
        nftObj,
        callBack,
      ),
    );
  };

  const userActivities = () => {
    const obj = { user: ids };
    dispatch(
      userActivitiesActions(
        {
          page: 1,
          limit: 100,
          sorting: 'createdAt',
          order: 'DESC',
        },
        callBack2,
        obj,
      ),
    );
  };

  useEffect(() => {
    getUserDetails();
    userActivities();
  }, [ids]);

  console.log('userActivity', ids);

  return (
   <>
        {loader ? (
          <LoaderCSS />
        ) : (
          <SingleUserDetail
            userDetails={userDetails}
            nfts={nfts}
            userActivity={userActivity}
            ids={ids}
          />
        )}
   </>
  );
  
}

export default UserDetailsId;
