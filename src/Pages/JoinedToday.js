import React, { useEffect, useState } from 'react';
import { usersDataParamsAction } from '../../src/redux/admin/action';
import { useDispatch } from 'react-redux';
import moment from 'moment/moment';
import styled from 'styled-components';
import FilterBar from '../Components/User/FilterBar';
import LoaderCSS from '../Components/Loader';
import UserListCard from '../Components/Cards/UserListCard';

function JoinTodayId() {
  const [userData, setUserData] = useState([]);
  const [loader, SetLoader] = useState(true);
  const [view, setView] = useState('list');
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchTextUser, setSearchText] = useState('');
  const startOfDay = moment().startOf('day').valueOf();


  const dispatch = useDispatch();

  const callback = (data) => {
    setUserData(data.records);
    SetLoader(false);
  };

  useEffect(() => {
    const objData = [
      { firstName: { contains: '' } },
      { lastName: { contains: '' } },
    ];
    const params = { createdAt: { '>=': startOfDay } };
    dispatch(usersDataParamsAction(params, objData, callback));
  }, []);

  console.log('createTime', userData.length > 0);
  return (
    <Root>
        <h1>Joined Today</h1>

       
          <FilterBar
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
          />

          {loader ? (
            <LoaderCSS />
          ) : view == 'list' && userData?.length > 0 ? (
            <UserListCard data={userData} />
          ) : (
            <h1>No Data Here !!</h1>
          )}
        
        </Root>
  );
}

export default JoinTodayId;

const Root = styled.section`
  width: 100%;
  overflow: hidden;
  color: whitesmoke;

  .user_section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
  }

  .card_box {
    background: #111632;
    border-radius: 10px;
    padding: 10px;
    * {
      margin: 0px;
    }
    h1 {
      margin: 0px;
      font-size: 18px;
    }
    h3 {
      white-space: nowrap;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
