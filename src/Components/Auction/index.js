import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { auctionsAction } from '../../redux/admin/action';
import AuctionCard from '../Cards/AuctionCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBarA from './FilterBar';
import axios from 'axios';
import URLS from '../../utils/urls';


function AuctionsData() {
  const [auctionData, setAuctionData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [chainNumber,setChainNumber] = useState("");
  // const [netLogo,setNetLogo] = useState('')
  const [auctionStatus, setAuctionStatus] = useState();


  const dataLimit = 20;

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
    setAuctionData(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  const searchSortAuctionData = (activePage) =>{

    let data =  { }
    if(chainNumber){
        data["chainId"] = chainNumber
     }
    const obj = {search:searchText, status:auctionStatus};
    setAuctionData([]);
    dispatch(
      auctionsAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        data,
        obj,
        callBack,
      ),
    );
  }

  // useEffect(()=>{
  //   GetNetworks();
  // },[])

  useEffect(() => {
    setLoader(true);
    searchSortAuctionData(activePage)
  }, [activePage, sort, order, chainNumber,auctionStatus]);

  useEffect(() => {
    setLoader(true);
    setActivePage(1)
    searchSortAuctionData(activePage)
  }, [searchText]);

  console.log("auctionStatus",auctionStatus)

  return (
    <Root>
        {/* <Card.Group> */}
      
          <h1>NFTs In Auction</h1>

          <FilterBarA
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e.trim());
            }}
            chainNumber = {(e)=>{
              setChainNumber(e);
            }}
            auctionStatus = {(e)=>{
              setAuctionStatus(e);
            }}
          />

          {loader ? (
            <LoaderCSS />
          ) : (
            <div className="card_box">
              {auctionData.records &&
              auctionData?.records?.map((i, ix) => {
                return (
                  <div key={ix}>
                    <AuctionCard data={i} logo={netLogo}/>
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

export default AuctionsData;


const Root = styled.section`

    color: whitesmoke;
  width: 100%;
  .card_box {
    display: grid;
    min-width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;

    .search_loader {
      position: absolute;
      height: dis;
      height: 50vh;
      width: 80%;
      .ui.dimmer {
        background-color: transparent;
      }
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
