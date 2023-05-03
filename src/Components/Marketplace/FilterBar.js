import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { FilterBarStyle } from '../Style/filterbar.style';
import axios from 'axios';
import URLS from '../../utils/urls';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function FilterBarM({ sort, order, searchText,chainNumber }) {
  // const [netName, setNetName] = useState();
  const nevigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("searchNft");
  const [search, setSearch] = useState(redirect);

  const handleNevigate = (search)=>{
    nevigate(`/marketplace?searchNft=${search}`)
  }
  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      searchText(search);
      handleNevigate(search)
    }
  };

  const netName = useSelector((state)=>state?.persistReducer?.platformChains)

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
    console.log("redirect",redirect,search)
    if (redirect) {
      searchText(redirect);
    }
  }, [window.location.search]);


// useEffect(()=>{
//   GetNetworks();
// },[])

  return (
    <FilterBarStyle>
      <div className="filter_bar">
        <div className="search_bar">
          <input
            className="search_child"
            type="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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
            <option value="price">Price</option>
            <option value="status">Status</option>
            {/* <option value="category">Category</option> */}
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
          <select onChange={(e)=>{chainNumber(e.target.value)}}>
          <option value={""}>All Chains</option>
            {netName?.map((i)=>{
              return(
                <>
                <option value={i.chainId}>{i?.name}</option>
                </>
              )
            })}
          </select>
        </div>
      </div>
    </FilterBarStyle>
  );
}
