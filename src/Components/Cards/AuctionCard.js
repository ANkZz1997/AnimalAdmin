import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import URLS from '../../utils/urls';
import Clock from './Counter';
import { Link } from 'react-router-dom';
import Goerli from '../../Assets/Goerli.png';
import polygon from '../../Assets/polygon.svg';
import bnb from '../../Assets/bnb.svg'

export default function AuctionCard(data) {
  const [items, setItems] = useState();
  const [user, setUser] = useState();
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  const deadline = data?.data?.endTime;

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
      <div className="user_section">
      <span className='chain_id'>{items?.nft?.chainId=="5"?<img src={Goerli}/>:(items?.nft?.chainId=="97"?<img src={bnb}/>:
      (items?.nft?.chainId=="80001"?<img src={polygon}/>:""))}</span>
        <div className="img_section">
          {/* <Link
            href="/auctiondetails/[auctiondetails]"
            as={`/auctiondetails/${items?.id}`}
          > */}
          <Link to={`/auction/auctiondetails/${items?.id}`}>
            <img src={`${IMAGE_END_POINT}${items?.nft?.media}`} />
          </Link>
        </div>
        <div className="count_down">
          <Clock deadline={deadline} />
        </div>
        <div className="content_section1">
          {/* <Link href="/userdetails/[userid]" as={`/userdetails/${user?.id}`}> */}
          <Link to={`/user/userdetails/${user?.id}`}>

            <div className="content_user">
              <img
                src={
                  user?.avatar
                    ? `${IMAGE_END_POINT}${user?.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
              ></img>
              <h5>{user?.username ? user.username : 'Unnamed User'}</h5>
            </div>
          </Link>
          <h3 className="nft_name">
            {items?.nft?.name ? items.nft.name : 'No Name'}
          </h3>
          <h4>Base Price : {items?.basePrice} Eth</h4>
        </div>
      </div>
    </Root>
  );
}

const Root = styled.section`

  

  .user_section {
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
    span.chain_id{
      position: absolute;
      border-radius: 50%;
      img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }
    .img_section {
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

    .count_down {
      margin: -24px auto 0px;
      position: relative;
      z-index: 1;
      width: fit-content;
      background: #000000bd;
      padding: 3px;
      border-radius: 4px;
      box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
      font-weight: bolder;
      font-size: 16px;
      color: white;
    }
    .content_section1 {
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
  }
`;
