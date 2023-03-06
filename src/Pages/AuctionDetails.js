import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoaderCSS from '../Components/Loader';
import AuctionDetails from '../Components/Auction/SingleAuctionDetails';
import URLS from '../utils/urls';

function AuctionDetailsId() {
  const [auctionData, setAuctionData] = useState({});
  const [loader, setLoader] = useState(true);
  let {id} = useParams()
  const ids = id

  const getDetails = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_AUCTION_DETAILS}${ids}`, axiosConfig)
        .then((res) => {
          setAuctionData(res.data.data);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, [ids]);

  return (
      <>
        {loader ? <LoaderCSS /> : <AuctionDetails details={auctionData} />}
      </>
  );
}

export default AuctionDetailsId;
