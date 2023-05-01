import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { FilterBarStyle } from '../Style/filterbar.style';
import { useNavigate } from 'react-router-dom';


export default function FilterBarB({ sort, order, searchText }) {
  const nevigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("");
  const [search, setSearch] = useState(redirect);

  const handleNevigate = (search)=>{
    nevigate(`/bids?search=${search}`)
  }
  
  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      searchText(search);
      handleNevigate(search)
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("search");
    console.log("redirect",redirect,search)
    if (redirect) {
      searchText(redirect);
    }
  }, [window.location.search]);

  useEffect(()=>{
    if(search != null){
      setTimeout(() => {
        searchText(search);
        handleNevigate(search)
      }, 1500);
    }
  },[search])

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
            <option value="updatedAt">Updated At</option>
            {/* <option value="status">Status</option> */}
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
        </div>
      </div>
    </FilterBarStyle>
  );
}
