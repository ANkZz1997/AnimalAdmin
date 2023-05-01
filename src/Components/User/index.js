import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usersDataAction } from '../../redux/admin/action';
import UserListCard from '../Cards/UserListCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBar from './FilterBar';

export default function Userlist() {

    const [userData, setuserData] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [sort, setSort] = useState('createdAt');
    const [order, setOrder] = useState('DESC');
    const [activePage, setActivePage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchTextUser, setSearchText] = useState('');
    const [view, setView] = useState('list');

    const dataLimit = 16;

    const dispatch = useDispatch();
  
    const callBack = (data) => {
      setuserData(data);
      setTotalPage(data?.totalCount);
      setLoader(false);
    };

    const searchSortUserFunction = (activePage)=>{
     
      setuserData('');
      const objData = [
        { firstName: { contains: searchTextUser} },
        { lastName: { contains: searchTextUser } },
        { email: { contains: searchTextUser } },
        { username: { contains: searchTextUser } },
      ];
      dispatch(
        usersDataAction(
          {
            page: activePage,
            limit: dataLimit,
            sorting: sort,
            order: order,
          },
          objData,
          callBack,
        ),
      );
    }

    useEffect(() => {
      setLoader(true);
      searchSortUserFunction(activePage)
      }, [activePage, sort, order]);

      useEffect(()=>{
        setLoader(true);
        searchSortUserFunction(1)
      }, [searchTextUser])


  console.log("searchTextUser",searchTextUser)
  return (
    <Root>
          <h1> NFT Users </h1>
          <FilterBar
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e.trim());
            }}
            view={view}
            setView={(e) => {
              setView(e);
            }}
          />
          {loader? <LoaderCSS/>:
          <UserListCard data={userData?.records} />
          }
          <PaginationCode
            active={activePage}
            activePage={(e) => {
              setActivePage(e);
            }}
            totalPage={totalPage}
            limit={dataLimit}
          />
        </Root>
  )
}

const Root = styled.section`

width: 100%;
  h1 {
    color: white;
  }
  .user_section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;

    @media (max-width: 1550px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    @media (max-width: 1210px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 711px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 450px) {
      grid-template-columns: 1fr;
    }
  }

`
