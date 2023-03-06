import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MarketplaceDetails from '../Components/Marketplace/SingleMarketDetails';
import URLS from '../utils/urls';

function MarketplaceDetailsId() {
  const [marketdata, setMarketData] = useState({});
  const [loader, setLoader] = useState(true);
    let {id} = useParams();
    const ids = id;

  const getDetails = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(
          `${URLS.EXCHANGE.ADMIN.GET_MARKETPLACE_DETAILS}${ids}`,
          axiosConfig,
        )
        .then((res) => {
          setMarketData(res.data.data);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails();
  }, [ids]);
console.log("idmarket",ids)
  return (
    <>
        <MarketplaceDetails details={marketdata} />
    </>
  );
}

export default MarketplaceDetailsId;
