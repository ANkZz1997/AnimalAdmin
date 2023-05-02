import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
export default function FilterBarKYC({ sort, order, searchText, checkStatus, setView }) {

  const nevigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get("search");
  const [search, setSearch] = useState(redirect);

  const handleNevigate = (search)=>{
    nevigate(`/kyc?search=${search}`)
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("search");
    console.log("redirect",redirect,search)
       
    if (redirect) {
      searchText(redirect);
    }
  }, [window.location.search]);

  console.log("search",search)

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
              setSearch(e.target.value);
            }}
            onKeyPress={keyPressed}
          />
          <button
            className="search_btn"
            type="submit"
            onChange={() => {
              searchText(search);
              handleNevigate(search);
            }}
          >
            <Icon name="search" />
          </button>
        </div>

        <div className="filter_bar_child">
          {/* <Icon
            name="list"
            className={view == 'list' && 'active'}
            onClick={() => {
              setView('list');
            }}
          />
          <Icon
            name="grid layout"
            className={view == 'grid' && 'active'}
            onClick={() => {
              setView('grid');
            }}
          /> */}
          <select
            name="Sort"
            onChange={(e) => {
              sort(e.target.value);
            }}
          >
            <option value="createdAt">Created At</option>
            <option value="firstName">Name</option>
            {/* <option value="royalty">Royalty</option> */}
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
          <select onChange={(e)=>{checkStatus(e.target.value)}}>
            <option value={""}>All KYC</option>
            <option value={"APPROVED"}>Approved</option>
            <option value={"REJECTED"}>Rejected</option>
            <option value={"PENDING"}>Pending</option>
          </select>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section `

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
      flex-wrap: wrap;
      align-items: center;
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
