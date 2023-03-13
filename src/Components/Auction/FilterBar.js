import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { FilterBarStyle } from '../Style/filterbar.style';
export default function FilterBarA({ sort, order, searchText, chainNumber }) {

  const [search, setSearch] = useState('');
  
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
            <option value="name">Name</option>
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
            <option value={5}>Goerli</option>
            <option value={97}>BNB</option>
            <option value={80001}>Polygon</option>
          </select>
        </div>
      </div>
    </FilterBarStyle>
  );
}
