import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usersDataAction } from '../../redux/admin/action';
import UserListCard from '../Cards/UserListCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBar from './FilterBar';
import TableLoader from '../Loader/TableLoader';

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
    const [verifiedUser, setVerifieduser] = useState("")

    const dataLimit = 16;

    const dispatch = useDispatch();
  
    const callBack = (data) => {
      setuserData(data);
      setTotalPage(data?.totalCount);
      setLoader(false);
    };

    const searchSortUserFunction = ()=>{
     
      setuserData('');
      if(verifiedUser){
        var verifyUserObj = {
          "kycVerified": verifiedUser
        };
      }
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
          {or : objData, ...verifyUserObj},
          callBack,
        ),
      );
    }

    useEffect(() => {
      setLoader(true);
      searchSortUserFunction()
      }, [activePage, sort, order,searchTextUser,verifiedUser]);

      // useEffect(()=>{
      //   setLoader(true);
      //   searchSortUserFunction(1)
      // }, [searchTextUser])


  console.log("verifiedUser",verifiedUser)
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
              setActivePage(1)
            }}
            view={view}
            setView={(e) => {
              setView(e);
            }}
            verifiedUser = {(e)=>{
              setVerifieduser(e)
            }}
          />
         
          <table>
          <thead>
            <tr>
              <th className="username_style">User Details</th>
              <th className="created_on">Created On</th>
              {/* <th className="account_heading">Account Type</th> */}
              <th className="last_login">Last Login Time</th>

              <th className="account_heading">Verification</th>
              <th className="status">Status</th>
            </tr>
          </thead>
          {loader? <TableLoader num={5}/> :
            <UserListCard data={userData?.records} />
          }
        </table>
          
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

  color: whitesmoke;
  table {
    width: 100%;
    text-align: left;
    td {
      padding: 5px;
    }

    .user_details {
      a{
        display: flex;
      align-items: center;
      gap: 20px;
      width: 100%;
      cursor: pointer;
      text-transform: capitalize;

      :hover {
        background: rgb(17 22 50) !important;
        color: #fff !important;
      }
      .user_img {
        display: flex;
        align-items: center;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .user_name {
        width: 100%;

        h2 {
          /* color: #fff; */
          font-weight: 400;
          margin: 0px;
          font-size: 16px;
          width: 180px;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 5px;
          svg{
            color: #58a1ef;
          }
        }
        h3 {
          /* color: #fff; */
          font-weight: 400;
          font-size: 14px;
          word-break: break-all;
          margin: 0px;
        }
      }
    }

      }
    
    @media (max-width: 575px) {
      td,
      th {
        border: 1px solid #ccc;
        padding: 0.625em;
        text-align: right;
      }
      thead {
        border: none;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        text-align: right;
      }
      tr {
        border-bottom: 2px solid #ddd;
        display: block;
        margin-bottom: 0.8em;
      }
      td {
        border-bottom: 1px solid #ddd;
        display: block;
      }
      td::before {
        content: attr(data-label);
        float: left;
        font-weight: 400;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        text-align: left;
      }
      .user_details {
        gap: 0px;

        .user_name {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }
      }
    }
  }

`
