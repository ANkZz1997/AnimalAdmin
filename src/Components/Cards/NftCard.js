import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';

export default function NftCard(data) {
  const [items, setItems] = useState({});
  const [user, setUser] = useState();
  const [getLogo,setGetLogo] = useState([]);

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  useEffect(() => {
    setGetLogo(data?.logo)
    if (data.data) {
      setItems(data.data);
      setUser(data.data.user);
    };
  }, [data]);


  return (
    <Root>
      <div className="card_section">
      <Link to={`/nfts/nftdetails/${items?.id}`}>

      {/* <span className='chain_id'> */}
      <div className="image_style">

       <div className='top_bar'>

            {getLogo && getLogo?.map((i,ix)=>{
            if(i?.chainId==items.chainId){
                return <img key={ix} src={`${IMAGE_END_POINT}${i?.logo}`}/>
            }
            })}
          {/* </span> */}
            {items?.status == 'PORTFOLIO' ? (
              ''
            ) : (
              <span className="status">{items?.status}</span>
            )}
        </div>

            <img src={`${IMAGE_END_POINT}${items?.media}`} />
        </div>
          
        </Link>
        <div className="card_details">
          <div className="content_user">
          <Link to={`/user/userdetails/${items?.user?.id}`}>
              <img
                src={
                  user?.avatar
                    ? `${IMAGE_END_POINT}${user?.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
              ></img>
            </Link>
            <h5 className="user_name">
            <Link to={`/user/userdetails/${items?.user?.id}`}>
              {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Unnamed User'}
            </Link>
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
      .top_bar{
        display: flex;
        justify-content: absolute;
        position: absolute;
        width: 100%;
        backdrop-filter: blur(10px);
        align-items: center;
        justify-content: space-between;

        p{
          background: #070c27;
          /* height: 100%; */
        }

        img{
        height: 30px;
        width: 30px;
        /* border-radius: 50%; */
      }
      }
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
    span.chain_id{
      position: absolute;
      border-radius: 50%;
      img{
        height: 30px;
        width: 30px;
        border-radius: 50%;
      }
    }
  }
`;
