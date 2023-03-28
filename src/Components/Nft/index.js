import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { nftDataAction } from '../../redux/admin/action';
import FilterBar from './FilterBar';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import NftCard from '../Cards/NftCard';


export default function NftsData() {
  const [nfts, setNfts] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [chainNumber,setChainNumber] = useState("");

  const dataLimit = 20;

  const dispatch = useDispatch();

  const callBack = (data) => {
    setNfts(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  useEffect(() => {
     if(chainNumber){
      var userData =  {
        "populate": ["user"],
        "chainId": chainNumber
      }
     }else{
      var userData =  {
        "populate": ["user"],
      }
     }
  
     setLoader(true);
    const Obj = [
      { name: { contains: searchText } },
      { category: { contains: searchText } },
      { id: { contains: searchText } },
      // { contact: { contains: searchText} },
    ];

    const nftObj = {or:Obj}
    
    setNfts('');
    dispatch(
        nftDataAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        userData,
        nftObj,
        callBack,
      ),
    );
  }, [activePage, sort, order, searchText,chainNumber]);

  // console.log("Number",chainNumber)

  return (
        <Root>
          <h1>NFTs Total Count - {nfts?.totalCount}</h1>
          <FilterBar
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e);
            }}
            chainNumber = {(e)=>{
              setChainNumber(e);
            }}
          />

          {loader ? (
            <LoaderCSS />
          ) : (
            <div className="grid_tiles">
              {
                nfts?.records?.map((i, ix) => {
                  return (
                    <div key={ix}>
                      <NftCard data={i} />
                    </div>
                  );
                })
              }
            </div>
          )}

          {/* Loader skelton */}
          {/* {loading ? (
            <div className="grid_tile">
              {Array(10)
                .fill(0, 0, 8)
                .map((_) => (
                  <div className="nft_card loading_box">
                    <div className="nft_card_image_wrapper">
                      <div className="nft_card_image skeleton"></div>
                      <div className="user_image skeleton"></div>
                    </div>
                    <h2 className="skeleton"></h2>
                  </div>
                ))}
            </div>
          ) : (
            ''
          )} */}

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
  h1 {
    color: white;
  }
  .grid_tiles {
    gap: 20px;
    width: 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    position: relative /* gap: 10px; */ > div {
      width: 100%;
    }

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
