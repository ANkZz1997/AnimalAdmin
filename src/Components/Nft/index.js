import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { nftDataAction } from '../../redux/admin/action';
import FilterBar from './FilterBar';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import NftCard from '../Cards/NftCard';
import URLS from '../../utils/urls';
import axios from 'axios';
import { CardLoader } from '../Loader/CardLoader';


export default function NftsData() {
  const [nfts, setNfts] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [chainNumber,setChainNumber] = useState("");
  const [mintedNft,setMintedNft] = useState()
  // const [netLogo,setNetLogo] = useState('')

  const dataLimit = 20;
  const netLogo = useSelector((state)=>state?.persistReducer?.platformChains)

  const dispatch = useDispatch();

  const callBack = (data) => {
    setNfts(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  const searchSorftNftFunction = (activePage)=>{
    let userData = {}
    if(chainNumber){
      userData =  {
        "chainId": chainNumber
      }
     }
     if(mintedNft){
      userData["minted"] = mintedNft == 'true' ? true :false
   }else{
    userData["minted"] = ''
   }
    
    const obj = {search: searchText}
    
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
        obj,
        callBack,
      ),
    );
  }

  useEffect(() => {
     setLoader(true);
     searchSorftNftFunction(activePage);
  }, [activePage, sort, order,chainNumber,searchText, mintedNft]);

  //  useEffect(() => {
  //   setLoader(true);
  //   setActivePage(1)
  //   searchSorftNftFunction(activePage);
  // }, [searchText]);

  
  console.log("mintedNft",mintedNft)

  return (
        <Root>
          <h1>Total NFTs</h1>
          <FilterBar
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
            <div className="grid_tiles">
              <CardLoader/>
            </div>
          ) : (
            <div className="grid_tiles">
              {nfts.records && 
                nfts?.records?.map((i, ix) => {
                  return (
                    <div key={ix}>
                     <NftCard data={i} logo={netLogo} />
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
