import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { FilterBarStyle } from '../Style/filterbar.style';
import axios from 'axios';
import URLS from '../../utils/urls';
export default function FilterBarA({ sort, order, searchText, chainNumber }) {

  const [search, setSearch] = useState('');
  const [netName, setNetName] = useState();

  const GetNetworks = async()=>{

    try{
        const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`)
        console.log("res---",res.data.data)
        setNetName(res.data?.data)

    }catch(err){
        console.log(err)
    }
}

useEffect(()=>{
  GetNetworks();
},[])

  
  return (
    <FilterBarStyle>
      <div className="filter_bar">
        <div className="search_bar">
          <input
            className="search_child"
            type="Search"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="search_btn"
            type="submit"
            onClick={() => {
              searchText(search);
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
            {/* <option value="name">Name</option> */}
            <option value="endTime">End Time</option>
            <option value="basePrice">Base Price</option>
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
