import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import BackButton from '../Model/BackButton';
import NftCreated from './NftCreated';
import NftPurchased from './NftPurchased';
import NftSold from './NftSold';
import NftWishlisted from './NftWishlisted';
import Overview from './Overview';
import UserActivities from './UserActivities';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import ConfirmDialogue from '../Model/ConfirmDialogue';
import moment from 'moment';
import { MdVerified } from 'react-icons/md';


function UserDetails({ userDetails, nfts, userActivity, ids }) {
  const [activeTab, setActiveTab] = useState('overview');
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const soldData = userActivity?.filter((s) => s.type == 'SOLD');
  const buyData = userActivity?.filter((s) => s.type == 'BUY');
  const [detailsUser, setDetailsUser] = useState(userDetails)
  const [confirmPopup,setConfirmPopup] = useState(false);


  const postStatus = async (userStatus)=>{
    try{
      const data = {
        id: ids,
        status:userStatus
      }
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_USER_STATUS}`,data)
      setConfirmPopup(false)
      setDetailsUser({...userDetails, status: res?.data.data[0].status })
      cogoToast.success(`USER ${res?.data.data[0].status == "ACTIVE"?"UNBLOCKED":"BLOCKED"}`)

    }catch(error){
      console.log(error)
    }
  }

  const handleBlock =()=>{
    if(detailsUser?.status == "BLOCKED"){
    postStatus("ACTIVE");
    }else{
    postStatus("BLOCKED");
    }
  }

  console.log('userStatus', detailsUser.wishlist);

  return (
    <Root>
      <ConfirmDialogue show={confirmPopup} handleClick={(e)=>{setConfirmPopup(e)}} setDefault={()=>{("")}}>
        <h3 className='popup_title'>Are You Sure You Want {detailsUser?.status == "BLOCKED"?"Unblock":"Block"} This User ?</h3>

        <button className='confirm_btn' onClick={()=>{handleBlock()}}>Yes</button> 
        
        <button className='confirm_btn' onClick={()=>{ setConfirmPopup(false)}}>No</button>

      </ConfirmDialogue>
      <div className="main_title">
        {/* <Link to={`/user`}> */}
          <BackButton/>
        {/* </Link> */}
        <h1>View User Profile</h1>
      </div>
      <div className="image_section">
        <div className='action_div'>
          <button className={detailsUser?.status=="BLOCKED"?'action_btn no':'action_btn'} onClick={()=>{setConfirmPopup(true)}}>
          {detailsUser?.status=="BLOCKED"?"Unblock":"Block"}</button>
          {/* <button className='action_btn' onClick={()=>{handleInactive()}}>
            {detailsUser?.status=="INACTIVE"?"Active":"InActive"}</button> */}
        </div>
        <img
          src={
            detailsUser.avatar
              ? `${IMAGE_END_POINT}${detailsUser.avatar}`
              : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
          }
          size="medium"
          // centered
          className="image_style"
        />

        <div className="details">
          {/* <h2>Status: {userDetails?.status}</h2> */}
          <h2>
            {`${detailsUser?.firstName ? detailsUser.firstName : 'N/A'} ${
              detailsUser?.lastName ? detailsUser.lastName : ''
            }`}{detailsUser.kycVerified?<MdVerified/>:""}
          </h2>
          <h4>
            Active On {detailsUser?.lastLoggedInTime?`${moment(detailsUser?.lastLoggedInTime).format('DD-MMM-YY (hh:mm A)')}`
            :"---"}</h4>

          <div className="nft_data">
            { detailsUser && detailsUser?.networks?.map((i,ix)=>{
              return(
                <div key={ix} className="nft">
                  <div><h1> {i.amount==0? `00.00`:Number(i.amount).toFixed(6)} </h1><h3>Eth</h3> </div>
                  <h5>{i.name}</h5>
                </div>
              )
            })}
                <div className="nft">
                  <div><h1> {detailsUser?.wallet?.amount? detailsUser?.wallet?.amount/100: `00.00`} </h1><h3>Rs</h3> </div>
                  <h5>Fiat Wallet</h5>
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
          {/* Created {`(${userActivity?.filter((s) => s.type == 'CREATE').length || '0'})`} */}
          Created {`(${detailsUser?.createdCount})`}
          
        </button>
        <button
          onClick={() => setActiveTab('purchased')}
          className={activeTab === 'purchased' ? 'active' : ''}
        >
          {/* Purchased {`(${userActivity?.filter((s) => s.type == 'BUY').length || '0'})`}  */}
          Purchased  {`(${detailsUser?.purchasedCount})`}

        </button>
        <button
          onClick={() => setActiveTab('sold')}
          className={activeTab === 'sold' ? 'active' : ''}
        >
          {/* Sold {`(${userActivity?.filter((s) => s.type == 'SOLD').length || '0'})`} */}
          Sold {`(${detailsUser?.soldCount})`}
          
        </button>
        <button
          onClick={() => setActiveTab('wishlisted')}
          className={activeTab === 'wishlisted' ? 'active' : ''}
        >
          {/* Wishlist {`(${detailsUser?.wishlist?.length})`} */}
          Wishlist {`(${detailsUser?.favCount})`}
          
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={activeTab === 'activities' ? 'active' : ''}
        >
          Activities
        </button>
      </div>

      {activeTab === 'overview' ? (
        <Overview data={detailsUser} />
      ) : activeTab === 'created' ? (
        <NftCreated items={detailsUser} nftList={nfts} />
      ) : activeTab === 'purchased' ? (
        <NftPurchased data={buyData} ids={ids} />
      ) : activeTab === 'sold' ? (
        <NftSold data={soldData} />
      ) : activeTab === 'wishlisted' ? (
        <NftWishlisted data={detailsUser} />
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
.popup_title{
  margin: 20px 0px;
}
.confirm_btn{
  height: 30px;
  width: 35px;
  background-color: #424d8d;
  border: none;
  color: white;
  margin: 5px;
  :hover{
    background-color: #1c2b7f;
  }
}
  * {
    padding: 0;
    margin: 0;
    /* color: #fff; */
  }

  .main_title {
    padding: 10px;
    display: flex;
  }

  .image_section {
    padding: 20px;
    border-radius: 10px;
    display: flex;
    width: 100%;
    background-color: rgb(17 22 50);
    position: relative;
    gap: 10px;

    .action_div{
      position: absolute;
      right: 0;
      .action_btn{
        background-color: transparent;
        border: 2px solid #c15656;
        padding: 4px;
        margin: 0px 9px;
        color: #da5454;
        border-radius: 10px;
        font-weight: 700;
        :hover{
          background-color: #680b1e
        }
      }
      .action_btn.no{
        background-color: transparent;
        border: 2px solid green;
        padding: 4px;
        margin: 0px 9px;
        color: green;
        border-radius: 10px;
        font-weight: 700;
        :hover{
          background-color: #61a261
        }
      }
  
    }


    @media (max-width: 768px) {
      flex-direction: column;
    }

    h2 {
      /* font-family: cursive; */
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
        display: flex;
        align-items: center;
        gap: 5px;
        svg{
          color: #58a1ef;
        }
      }
    }

    .nft_data {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      h5 {
        color: rgb(140, 124, 240);
        text-align: center;
      }

      .nft {
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90px;
        /* width: 140px; */
        margin: 25px 5px 5px 5px;
        border: 0.5px dashed grey;

        >div{
          display: flex;
          align-items: baseline;
          gap: 5px;

          h1 {
            font-size: 40px;
            color: black;
            color: whitesmoke;
          }
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

