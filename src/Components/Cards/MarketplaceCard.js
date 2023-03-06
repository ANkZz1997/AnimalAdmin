import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';


export default function MarketplaceCard(data) {
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
          setUser(res.data.data);
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

  return (
    <Root>
      <div className="card_section">
        {items?.status == 'PORTFOLIO' ? (
          ''
        ) : (
          <span className="status">{items?.status}</span>
        )}
        {/* <Link
          href="/marketplacedetails/[marketplacedetails]"
          as={`/marketplacedetails/${items?.id}`}
        > */}
        <Link to={`/user/marketplacedetails/${items?.id}`}>
          <div className="image_style">
            <img src={`${IMAGE_END_POINT}${items?.nft?.media}`} />
          </div>
        </Link>
        <div className="card_details">
          <div className="content_user">
            {/* <Link href="/userdetails/[userid]" as={`/userdetails/${user?.id}`}> */}
            <Link to={`/user/userdetails/${user?.id}`}>
              <img
                src={
                  user?.avatar
                    ? `${IMAGE_END_POINT}${user?.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
              ></img>
            </Link>

            <h5>{user?.username ? user.username : 'Unnamed User'}</h5>
          </div>
          <div>
            <h3 className="nft_name">{items?.nft?.name}</h3>
            <h5>{`${moment(items?.createdAt).format('DD-MMM-YY')}`}</h5>

            <div className="royalty_div">
              <h5>Price : {items?.price} Eth</h5>
              <h5>Royalty {items?.nft?.royalty}%</h5>
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

  :hover {
    box-shadow: rgb(255 255 255 / 43%) 0px 0px 8px 0px;
  }
  padding: 0px;
  margin: 0px;
  border-radius: 6px;
  background: #111632;
  /* height: 360px; */
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
        object-position: top;
        aspect-ratio: 1;
        :hover {
          transform: scale(1.1);
        }
      }
    }

    .card_details {
      /* color: black; */
      padding: 10px;
      * {
        margin: 0px;
        text-transform: capitalize;
      }

      .nft_name {
        margin-top: 10px;
        max-width: 202px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .content_user {
        display: flex;
        max-width: 200px;
        align-items: center;
        gap: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
