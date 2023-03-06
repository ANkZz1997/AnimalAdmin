import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usersDataParamsAction } from '../../../redux/admin/action';
import UserListCard from '../../Cards/UserListCard';
import LoaderCSS from '../../Loader';
import FilterBar from '../../User/FilterBar';


function DashboardDetailsId() {
  const [userData, setUserData] = useState();
  const [view, setView] = useState('list');
  const [searchTextUser, setSearchText] = useState('');
  const [loader, SetLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const dispatch = useDispatch();

  const callback = (data) => {
    setUserData(data);
    SetLoader(false);
  };

  let {id} = useParams()
  const ids = id

  useEffect(() => {
    const objData = [
      { firstName: { contains: searchTextUser } },
      { lastName: { contains: searchTextUser } },
      { email: { contains: searchTextUser } },
      { contact: { contains: searchTextUser } },
    ];
    const params = {
      status: ids,
    };

    dispatch(usersDataParamsAction(params, objData, callback));
  }, [ids, searchTextUser]);

  console.log('userData', userData);

  return (
    <Root>
        <h1>{ids} USERS</h1>
        
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
          ) : view == 'list' && userData?.records?.length > 0 ? (
            <UserListCard data={userData?.records} />
          ) : (
            <h1>No Data Here !!</h1>
          )}
        
        {/* </Link> */}
        </Root>
  );
}

export default DashboardDetailsId;

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
      /* color: #000; */
      white-space: nowrap;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  /* .user_img {
    height: 100px;
    width: 100px;
    margin: auto;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  } */
`;
