import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';

export default function NftCard(data) {
  const [items, setItems] = useState({});
  const [user, setUser] = useState();

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  const getUserDetails = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_USER_DETAILS}${id}`, axiosConfig)
        .then((res) => {
          setUser(res?.data?.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data.data) {
      setItems(data.data);
      getUserDetails(data.data.user);
    }
  }, [data]);

  console.log("ITem",items)

  return (
    <Root>
      <div className="card_section">
        {items?.status == 'PORTFOLIO' ? (
          ''
        ) : (
          <span className="status">{items?.status}</span>
        )}
        <Link to={`/user/nftdetails/${items?.id}`}>

          <div className="image_style">
            <img src={`${IMAGE_END_POINT}${items?.media}`} />
          </div>
        </Link>
        <div className="card_details">
          <div className="content_user">
          <Link to={`/user/userdetails/${items?.user}`}>
              <img
                src={
                  user?.avatar
                    ? `${IMAGE_END_POINT}${user?.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
              ></img>
            </Link>
            <h5 className="user_name">
              {user?.username ? user.username : 'Unnamed User'}
            </h5>
          </div>
          <div>
            <h3 className="nft_name">{items?.name}</h3>
            <h5>{`${moment(items?.createdAt).format('DD-MMM-YY')}`}</h5>

            <div className="royalty_div">
              <h5>{items?.category}</h5>
              <h5>Royalty {items?.royalty}%</h5>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}
const Root = styled.section`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: all 0.4s;
  cursor: pointer;
  color: whitesmoke;

  :hover {
    box-shadow: rgb(255 255 255 / 43%) 0px 0px 8px 0px;
  }
  padding: 0px;
  margin: 0px;
  border-radius: 6px;
  background: #111632;
  /* height: 350px; */
  position: relative;
  overflow: hidden;

  .card_section {
    .image_style {
      cursor: pointer;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        object-fit: cover;
        transition: all 0.7s;
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        object-position: top;

        :hover {
          transform: scale(1.1);
        }
      }
    }

    .card_details {
      padding: 10px;
      * {
        margin: 0px;
        text-transform: capitalize;
      }

      .nft_name {
        margin-top: 10px;
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .content_user {
        display: flex;
        max-width: 200px;
        align-items: center;
        gap: 10px;
        width: fit-content;
        transition: 0.6s;
        :hover {
          transform: translateX(10px);
          color: white;
        }

        img {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user_name {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .royalty_div {
          margin: -24px auto 0px;
          position: relative;
          z-index: 9;
          width: fit-content;
          background: #000000bd;
          padding: 3px;
          border-radius: 4px;
          box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
          font-weight: bolder;
          font-size: 16px;
          color: white;
        }
      }
    }

    .royalty_div {
      display: flex;
      justify-content: space-between;
    }

    span.status {
      position: absolute;
      background: #131841;
      color: white;
      right: 0;
      padding: 2px;
    }
  }
`;
