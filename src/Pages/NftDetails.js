import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoaderCSS from '../Components/Loader';
import NftDetails from '../Components/Nft/SingleNftDetails';
import { userActivitiesActions } from '../redux/admin/action';
import URLS from '../utils/urls';

function NftDetailsId() {
  const [nftdata, setNftData] = useState({});
  const [loader, setLoader] = useState(true);
  let {id} = useParams()
  const ids = id
  const [userActivity, setUserActivity] = useState();

  const callBack2 = (data) => {
    setUserActivity(data?.records);
  };
  const dispatch = useDispatch();

  const getDetails = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_NFT_DETAILS}${ids}`, axiosConfig)
        .then((res) => {
          setNftData(res.data.data);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const userActivities = () => {
    const obj = { nft: ids };
    dispatch(userActivitiesActions(
        {
            page: 1,
            limit: 20,
            sorting: 'createdAt',
            order: 'DESC',
          },
        callBack2, obj));
  };

  useEffect(() => {
    getDetails();
    userActivities();
  }, [id]);

  // console.log('nftdata pp ', nftdata , userActivity);

  return (
   <>
        {loader ? (
          <LoaderCSS />
        ) : (
          <NftDetails details={nftdata} activity={userActivity} />
        )}
    </>
  );
}

export default NftDetailsId;
