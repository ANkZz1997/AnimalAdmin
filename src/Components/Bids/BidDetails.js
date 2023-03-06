import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Loader, Tab, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import URLS from '../../utils/urls';

function BidDetails({ userID }) {
  const [userDetails, setUserDetails] = useState(' ');
  const [loader, setLoader] = useState(true);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  const getUserDetails = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_USER_DETAILS}${userID}`, axiosConfig)
        .then((res) => {
          setUserDetails(res.data.data);
          // setLoader(false);
          // getNftDetails();
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails(userID);
    setLoader(false);
  }, [userID]);

  return (
    <Root>
      
        <Table.Cell collapsing className="bid_user_data">
          <img
            src={
              userDetails?.avatar
                ? `${IMAGE_END_POINT}${userDetails?.avatar}`
                : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
            }
          />
        </Table.Cell>
      
      <Table.Cell className="user_name">
        <div className="username_div">
        <Link to={`/user/userdetails/${userDetails?.id}`}  >
          <h4>
            {userDetails?.username ? userDetails?.username : '@NoUserName'}
          </h4>
          </Link>
        </div>
        {/* {userDetails?.username} */}
      </Table.Cell>
    </Root>
  );
}

export default BidDetails;

const Root = styled.section`
  width: 100%;
  > td:nth-child(1) {
    width: 75px;
    min-width: 75px;
  }
  > td:nth-child(2) {
    width: 100%;
  }
  .bid_user_data {
    img {
      border-radius: 50% !important;
      width: 50px !important;
      height: 50px;
      object-fit: cover !important;
      transition: all 0.5s;
    }
    :hover {
      background-color: #111632;
      cursor: pointer;
      /* transform: translateX(10px); */
    }
  }
  .user_name {
    vertical-align: middle;

    .username_div {
      word-wrap: break-word;
      word-break: break-all;
    }
  }
`;
