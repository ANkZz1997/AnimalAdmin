import React, { useEffect, useState } from 'react';
import { usersDataAction, usersDataParamsAction } from '../../src/redux/admin/action';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import styled from 'styled-components';
import FilterBar from '../Components/User/FilterBar';
import LoaderCSS from '../Components/Loader';
import UserListCard from '../Components/Cards/UserListCard';
import BackButton from '../Components/Model/BackButton';
import FilterBarDash from '../Components/Dashboard/DashboardDetails/FilterBarDash';
import TableLoader from '../Components/Loader/TableLoader';
import PaginationCode from '../Components/Pagination';
import { UserListStyle } from '../Components/Style/UserListStyle';

function JoinTodayId() {
  const [userData, setUserData] = useState([]);
  const [loader, SetLoader] = useState(true);
  const [view, setView] = useState('list');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchTextUser, setSearchText] = useState('');
  const startOfDay = moment().startOf('day').valueOf();
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [verifiedUser, setVerifieduser] = useState("")

  const dataLimit = 16;


  const dispatch = useDispatch();

  const callback = (data) => {
    setUserData(data);
    setTotalPage(data?.totalCount);
    SetLoader(false);
  };

  useEffect(() => {
    SetLoader(true)
    if(verifiedUser){
      var verifyUserObj = {
        "kycVerified": verifiedUser
      };
    }
    const objData = [
      { firstName: { contains: searchTextUser } },
      { lastName: { contains: searchTextUser } },
      { email: { contains: searchTextUser } },
      { contact: { contains: searchTextUser } },
    ];
    var param = { createdAt: { '>=': startOfDay } };
    dispatch(
      usersDataAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        {or : objData, ...param, ...verifyUserObj},
        callback,
      ))
  }, [searchTextUser, activePage, dataLimit, sort, order,verifiedUser]);

  console.log("joinedtoday",userData)


  return (
    <UserListStyle>
        <h1 className='head_back'><BackButton/>Joined Today</h1>
          <FilterBarDash
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e);
            }}
            view={view}
            setView={(e) => {
              setView(e);
            }}
            verifiedUser = {(e)=>{
              setVerifieduser(e)
            }}
            userType={"dashboard/joinedtoday/"}
          />

            {/* // <UserListCard data={userData} /> */}
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
            {loader? <TableLoader num={5}/> : view == 'list' && userData?.records?.length > 0 ?
              <UserListCard data={userData?.records}/> : (
                <h1>No Data Here !!</h1>
              )}
            </table>
            <PaginationCode
            active={activePage}
            activePage={(e) => {
              setActivePage(e);
            }}
            totalPage={totalPage}
            limit={dataLimit}
          />
        </UserListStyle>
  );
}

export default JoinTodayId;
