import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import NftCreated from './NftCreated';
import NftPurchased from './NftPurchased';
import NftSold from './NftSold';
import NftWishlisted from './NftWishlisted';
import Overview from './Overview';
import UserActivities from './UserActivities';

function UserDetails({ userDetails, nfts, userActivity, ids }) {
  const [activeTab, setActiveTab] = useState('overview');
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const soldData = userActivity?.filter((s) => s.type == 'SOLD');
  const buyData = userActivity?.filter((s) => s.type == 'BUY');

  // console.log('userActivity', userActivity);

  return (
    <Root>
      <div className="main_title">
        <h1>View User Profile</h1>
      </div>
      <div className="image_section">
        <img
          src={
            userDetails.avatar
              ? `${IMAGE_END_POINT}${userDetails.avatar}`
              : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
          }
          size="medium"
          centered
          className="image_style"
        />

        <div className="details">
          {/* <h2>Status: {userDetails?.status}</h2> */}
          <h2>
            {`${userDetails?.firstName ? userDetails.firstName : 'N/A'} ${
              userDetails?.lastName ? userDetails.lastName : 'N/A'
            }`}
          </h2>
          <h4>@{`${userDetails?.username ? userDetails.username : 'N/A'}`}</h4>

          <div className="nft_data">
            <div className="nft">
              <h1>{nfts?.records?.length || '0'}</h1>
              <h5>NFT Created</h5>
            </div>
            <div className="nft">
              <h1>
                {userActivity?.filter((s) => s.type == 'SOLD').length || '0'}
              </h1>
              <h5>NFT Sold</h5>
            </div>
            <div className="nft">
              <h1>
                {userActivity?.filter((s) => s.type == 'BUY').length || '0'}
              </h1>
              <h5>NFT Purchased</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="btns">
        <button
          onClick={() => setActiveTab('overview')}
          className={activeTab === 'overview' ? 'active' : ''}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('created')}
          className={activeTab === 'created' ? 'active' : ''}
        >
          Created
        </button>
        <button
          onClick={() => setActiveTab('purchased')}
          className={activeTab === 'purchased' ? 'active' : ''}
        >
          Purchased
        </button>
        <button
          onClick={() => setActiveTab('sold')}
          className={activeTab === 'sold' ? 'active' : ''}
        >
          Sold
        </button>
        <button
          onClick={() => setActiveTab('wishlisted')}
          className={activeTab === 'wishlisted' ? 'active' : ''}
        >
          Wishlist
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={activeTab === 'activities' ? 'active' : ''}
        >
          Activities
        </button>
      </div>

      {activeTab === 'overview' ? (
        <Overview data={userDetails} />
      ) : activeTab === 'created' ? (
        <NftCreated items={userDetails} nftList={nfts} />
      ) : activeTab === 'purchased' ? (
        <NftPurchased data={buyData} ids={ids} />
      ) : activeTab === 'sold' ? (
        <NftSold data={soldData} />
      ) : activeTab === 'wishlisted' ? (
        <NftWishlisted data={userDetails} />
      ) : activeTab === 'activities' ? (
        <UserActivities data={userActivity} ids={ids} />
      ) : (
        ''
      )}
    </Root>
  );
}

export default UserDetails;

const Root = styled.section`
color: whitesmoke;
  * {
    padding: 0;
    margin: 0;
    /* color: #fff; */
  }

  .main_title {
    padding: 10px;
  }

  .image_section {
    padding: 20px;
    border-radius: 10px;
    display: flex;
    width: 100%;
    background-color: rgb(17 22 50);
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    h2 {
      font-family: cursive;
      color: whitesmoke;
    }
    img {
      object-fit: cover;
      width: 200px;
      height: 200px;
      object-position: center;
      border-radius: 10px;
    }

    .details {
      padding-top: 10px;
      padding-bottom: 10px;
      height: 100%;

      h4 {
        color: rgb(140, 124, 240);
      }

      h2 {
        text-transform: capitalize;
        color: whitesmoke;
      }
    }

    .nft_data {
      display: flex;
      h5 {
        color: rgb(140, 124, 240);
        text-align: center;
      }

      .nft {
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90px;
        width: 140px;
        margin: 25px 5px 5px 5px;
        border: 0.5px dashed grey;

        h1 {
          font-size: 40px;
          color: black;
          color: whitesmoke;
        }
      }
    }
  }

  .btns {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;

    button {
      background: none;
      color: whitesmoke;
      font-size: 20px;
      border: none;
      font-family: math;
      margin: 10px;
      padding: 10px;
      border-bottom: 2px solid;
      border-color: transparent;
      :hover {
        border-color: green;
        color: green;
      }
    }
    button.active {
      border-color: green;
    }
  }
`;

