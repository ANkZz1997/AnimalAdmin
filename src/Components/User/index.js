import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { usersDataAction } from '../../redux/admin/action';
import UserListCard from '../Cards/UserListCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBar from './FilterBar';
import TableLoader from '../Loader/TableLoader';
import { UserListStyle } from '../Style/UserListStyle';
import moment from 'moment';

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
    const startOfDay = moment().startOf('day').valueOf();
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get("type");

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

      if(redirect && redirect !== "alluser"){
        if(redirect === "joinedtoday"){
          var userType = { createdAt: { '>=': startOfDay } }
        }else{
          var userType = {
            "status":redirect
          }
        }
      }else{
      }
      
      dispatch(
        usersDataAction(
          {
            page: activePage,
            limit: dataLimit,
            sorting: sort,
            order: order,
          },
          {or : objData, ...verifyUserObj, ...userType},
          callBack,
        ),
      );
    }

    useEffect(() => {
      setLoader(true);
      searchSortUserFunction()
      }, [activePage, sort, order,searchTextUser,verifiedUser]);

  return (
    <UserListStyle>
          <h1>{redirect==="joinedtoday"?"Joined Today": redirect ==="alluser"?"All":redirect} NFT Users </h1>
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
            userTypeRedirect = {redirect}
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
        {userData?.records?.length === 0 && !loader? <h1 className='no_data'>No Data Found</h1>:"" }
          
          <PaginationCode
            active={activePage}
            activePage={(e) => {
              setActivePage(e);
            }}
            totalPage={totalPage}
            limit={dataLimit}
          />
        </UserListStyle>
  )
}

