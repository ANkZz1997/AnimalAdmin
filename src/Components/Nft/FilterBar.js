import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function FilterBar({ sort, order, searchText, chainNumber, mintedNft }) {
  // const [netName, setNetName] = useState();
  const nevigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("searchNft");
  const [search, setSearch] = useState(redirect);

  const netName = useSelector((state)=>state?.persistReducer?.platformChains)

  const handleNevigate = (search)=>{
    nevigate(`/nfts?searchNft=${search}`)
  }

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      searchText(search);
      handleNevigate(search)
    }
  };

  useEffect(()=>{
    if(search != null){
      const debounce = setTimeout(() => {
        searchText(search);
        handleNevigate(search)
      }, 1000);

      return ()=>{
        clearTimeout(debounce)
      }
    }
  },[search])
  
//   const GetNetworks = async()=>{
//     try{
//         const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`)
//         console.log("res---",res.data.data)
//         setNetName(res.data?.data)

//     }catch(err){
//         console.log(err)
//     }
// }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("searchNft");
    if (redirect) {
      searchText(redirect);
    }
  }, [window.location.search]);


// useEffect(()=>{
//   GetNetworks();
// },[])

  return (
    <Root>
      <div className="filter_bar">
        <div className="search_bar">
          <input
            className="search_child"
            type="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            onKeyPress={keyPressed}
          />
          <button
            className="search_btn"
            type="submit"
            onClick={() => {
              searchText(search);
              handleNevigate(search)
            }}
          >
            <Icon name="search" />
          </button>
        </div>

        <div className="filter_bar_child">
          <select
            name="Sort"
            onChange={(e) => {
              sort(e.target.value);
            }}
          >
            <option value="createdAt">Created At</option>
            <option value="name">Name</option>
            <option value="royalty">Royalty</option>
            <option value="status">Status</option>
          </select>
          <select
            name="Order"
            onChange={(e) => {
              order(e.target.value);
            }}
          >
            <option value="DESC">Decending</option>
            <option value="ASC">Ascending</option>
          </select>

          <select onChange={(e)=>{
            mintedNft(e.target.value)
          }}>
            <option value="">All NFTs</option>
            <option value='true'>Minted</option>
            <option value='false'>Not Minted</option>

          </select>

          <select onChange={(e)=>{chainNumber(e.target.value)}}>
            <option value={""}>All Chains</option>
            {netName?.map((i,ix)=>{
              return(
                <>
                <option key={ix} value={i.chainId}>{i?.name}</option>
                </>
              )
            })}
          </select>
        </div>
        
      </div>
    </Root>
  );
}

const Root = styled.section`
 padding: 20px 0px;
  .filter_bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 530px) {
      justify-content: end;
    }
    .filter_bar_child {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      i {
        font-size: 28px;
        height: 100%;
        color: #343950;
        cursor: pointer;
      }
      i.active {
        color: #fff;
      }
      select {
        display: inline;
        background-color: #070c27;
        padding: 10px;
        border-radius: 6px;
        margin: 0px 4px;
        color: white;
        border: 1px solid #ffffff57;
      }
    }

    .search_bar {
      width: fit-content;
      border: 1px solid #ffffff42;
      border-radius: 6px;
      overflow: hidden;
      @media (max-width: 530px) {
        width: 100%;
      }
      .search_child {
        background: transparent;
        padding: 10px;
        color: #fff;
        border: none;
        width: calc(100% - 44px);
      }
      .search_btn {
        padding: 10px;
        border: none;
        cursor: pointer;
        width: 44px;
      }
    }
  }

`