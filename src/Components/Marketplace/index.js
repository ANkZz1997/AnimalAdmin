import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { marketPlaceAction } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import MarketplaceCard from '../Cards/MarketplaceCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBarM from './FilterBar';
import axios from 'axios';
import { CardLoader } from '../Loader/CardLoader';


export default function MarketPlaceData() {
  const [marketData, setMarketData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [chainNumber,setChainNumber] = useState("");
  const [mintedNft,setMintedNft] = useState()

  // const [netLogo,setNetLogo] = useState('')


  const dataLimit = 20;

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  const netLogo = useSelector((state)=>state?.persistReducer?.platformChains)

//   const GetNetworks = async()=>{
//     try{
//         const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`)
//         console.log("res---",res.data.data)
//         setNetLogo(res.data?.data)

//     }catch(err){
//         console.log(err)
//     }
// }
  const dispatch = useDispatch();

  const callBack = (data) => {
    setMarketData(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  const searchSortMarketData = ()=>{
let data = {};   
    if(chainNumber){
      data = {
        "chainId": chainNumber
      }
     }
     if(mintedNft){
       data["minted"] = mintedNft == 'true' ? true :false
    }else{
      data["minted"] = ''
    }
    
    const obj = {search: searchText}
    dispatch(
      marketPlaceAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        data,
        obj,
        // minObj,
        callBack,
      ),
    );
  }

  // useEffect(()=>{
  //   GetNetworks();
  // },[])


  useEffect(() => {
    setLoader(true);
    searchSortMarketData()
  }, [activePage, sort, order, chainNumber,searchText, mintedNft]);

  
  // useEffect(() => {
  //   setLoader(true);
  //   searchSortMarketData(1)
  // }, [searchText, chainNumber]);

  return (
    <Root>
        {/* <Card.Group className="card_main"> */}
       
          <h1>NFTs In Marketplace</h1>
          <FilterBarM
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e.trim());
              setActivePage(1)
            }}
            chainNumber = {(e)=>{
              setChainNumber(e);
            }}
            mintedNft = {(e)=>{
              setMintedNft(e);
            }}
          />
          {loader ? (
            <div className="grid_tile">
              <CardLoader/>
            </div>
          ) : (
            <div className="grid_tile">
              {marketData.records && marketData?.records?.map((i, ix) => {
                return (
                  <div key={ix}>
                    <MarketplaceCard data={i} logo={netLogo} />
                  </div>
                );
              })}
            </div>
          )}
      
        {/* </Card.Group> */}
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

const Root = styled.section`
color: whitesmoke;
  .grid_tile {
    gap: 15px;
    width: 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    /* gap: 10px; */
    > div {
      width: 100%;
    }
    @media (max-width: 1536px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (max-width: 1300px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 770px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 510px) {
      grid-template-columns: 1fr;
    }
  }
`;
