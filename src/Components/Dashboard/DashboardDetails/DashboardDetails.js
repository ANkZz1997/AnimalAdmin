import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usersDataAction} from '../../../redux/admin/action';
import UserListCard from '../../Cards/UserListCard';
import BackButton from '../../Model/BackButton';
import TableLoader from '../../Loader/TableLoader';
import FilterBarDash from './FilterBarDash';
import PaginationCode from '../../Pagination';
import { UserListStyle } from '../../Style/UserListStyle';


function DashboardDetailsId() {
  const [userData, setUserData] = useState();
  const [view, setView] = useState('list');
  const [searchTextUser, setSearchText] = useState('');
  const [loader, SetLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
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

  let {id} = useParams()
  const ids = id

  useEffect(() => {
    SetLoader(true);
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
    var param = {
      "status": ids,
    };
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
    // dispatch(usersDataParamsAction(params, objData, callback));
  }, [ids, searchTextUser, activePage, dataLimit, sort, order, verifiedUser]);

  console.log('userData', userData);

  return (
    <UserListStyle>
        <h1 className='head_back'><BackButton/>{ids} USERS</h1>
        
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
            userType={`/dashboard/dashboarddetails/${ids}`}
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

export default DashboardDetailsId;

