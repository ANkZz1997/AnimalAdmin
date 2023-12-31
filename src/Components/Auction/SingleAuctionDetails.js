import React, { useEffect, useState } from 'react';
import {
  Dimmer,
  Dropdown,
  Icon,
  Loader,
  Menu,
  Tab,
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import URLS from '../../utils/urls';
import { usersDataAction } from '../../redux/admin/action';
import LoaderCSS from '../Loader';
import { Link, useNavigate } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import Clock from '../Cards/Counter';
import BidDetails from '../Bids/BidDetails';
import Goerli from '../../Assets/Goerli.png';
import polygon from '../../Assets/polygon.svg';
import bnb from '../../Assets/bnb.svg'
import BackButton from '../Model/BackButton';
import axios from 'axios';

function AuctionDetails({ details }) {
  const [auctionData, setAuctionData] = useState('');
  const [minterdetails, setMinterDetails] = useState();
  const [deadline, setDeadline] = useState();
  const [loader, setLoader] = useState(true);
  // const [netData,setNetData] = useState();
  const nevigate = useNavigate();


  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const dispatch = useDispatch();
  const netData = useSelector((state)=>state?.persistReducer?.platformChains)

  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ];


  const callBack = (data) => {
    setLoader(false);
    setMinterDetails(data?.records[0]);
  };

//   const GetNetworks = async()=>{
//     try{
//         const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_NETWORKS}`)
//         console.log("res---",res.data.data)
//         setNetData(res.data?.data)

//     }catch(err){
//         console.log(err)
//     }
// }

  const  getMinterDetail = (minterId)=>{
    if(minterId){
    const obj = { id: minterId };
    dispatch(
      usersDataAction(
        {
          page: 1,
          limit: 9,
          sorting: 'createdAt',
          order: 'DESC',
        },
        obj,
        callBack,
      ),
    );
    }
  }

  useEffect(() => {
    // setLoader(true)
    if (details) {
      setAuctionData(details);
      setDeadline(details?.endTime);
    }
  }, [details]);

  useEffect(()=>{
    // setLoader(true)
    getMinterDetail(auctionData.nft?.minter)
  },[auctionData])

  console.log("minterdetails?.firstName",minterdetails?.firstName)

  return (
    <div>
      {loader ? (
        // <LoaderCSS />
        <></>
      ) : (
        <Root>
          <div className="action_bar">
            <div ><BackButton/></div>
            {/* <Menu compact>
              <Dropdown text="Action" options={options} simple item />
            </Menu> */}
          </div>

          <div className="nft_box">
            <div className="heading">
              <h1>{auctionData?.nft?.name}</h1>
              <div className="owner_details">
                <div>
                  <span>User</span>
                  {/* <Link href="/loginOtp" as={'/asd'}> */}
                    <Link to={`/user/userdetails/${auctionData?.user?.id}`}>
                    <h3>
                      <img alt='img'
                        src={
                          auctionData?.user?.avatar
                            ? `${IMAGE_END_POINT}${auctionData?.user?.avatar}`
                            : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        }
                      />{' '}
                      {auctionData?.user?.firstName
                        ? auctionData?.user?.firstName
                        : 'Unnamed User'}
                      {/* {auctionData?.user?.lastName}{' '} */}
                    </h3>
                  </Link>
                  {/* </Link> */}
                </div>

                <div>
                  <span>Minter</span>

                  <Link to={`/user/userdetails/${auctionData?.nft?.minter}`}>
                    <h3>
                      <img
                        src={
                          minterdetails?.avatar
                            ? `${IMAGE_END_POINT}${minterdetails?.avatar}`
                            : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        }
                      />{' '}
                      {minterdetails?.firstName
                        ? minterdetails?.firstName
                        : 'Unnamed Minter'}
                      {/* {minterdetails?.lastName}{' '} */}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
            <div className="image_box">
            <span className='chain_id'>{auctionData?.nft?.chainId=="5"?<img src={Goerli} className="chain_img"/>:(auctionData?.nft?.chainId=="97"?<img src={bnb}  className="chain_img"/>:
      (auctionData?.nft?.chainId=="80001"?<img src={polygon}  className="chain_img"/>:""))}</span>
              <img
                src={
                  auctionData?.nft?.media
                    ? `${IMAGE_END_POINT}${auctionData?.nft?.media}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
                className="image"
                onClick={()=>{nevigate(`/nfts/nftdetails/${auctionData?.nft?.id}`)}}
              />
              <p className='views_p'>{auctionData?.nft?.views} {auctionData?.nft?.views>1?"views":"view"}</p>

              <div className="nft_highlights">
                <div className="countdown_time">
                  <span>Auction Countdown</span>
                  <h3>{deadline ? <Clock deadline={deadline} /> : ''}</h3>
                </div>

                <div className="bid_details">
                  <Table celled striped>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="3">
                          <Icon name="chess queen" />
                          Bid Placed
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {auctionData.bid && auctionData?.bid?.reverse().map((i) => {
                        return (
                          <Table.Row>
                            <BidDetails userID={i?.user} />
                            {/* </Table.Cell> */}
                            <Table.Cell>
                              {`${moment(i?.updatedAt).format(
                                'DD-MMM-YY (hh:mm A)',
                              )}`}
                            </Table.Cell>
                            <Table.Cell>
                              {i.price ? i.price : 'Attributes'} Eth
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                </div>
              </div>
            </div>

            <div className="content_box">
              <div className="nft_price">
                <span>Base Price</span>
                <h1>{auctionData?.basePrice} ETH</h1>
              </div>
              <div className="details_table">
                <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan="3">
                        <Icon name="align left" />
                        Attributes
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Royalty</Table.Cell>
                      <Table.Cell>{auctionData?.nft?.royalty} %</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Category</Table.Cell>
                      <Table.Cell>{auctionData?.nft?.category}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell collapsing>Chain</Table.Cell>
                    <Table.Cell>
                      {netData && netData?.map((i,ix)=>{
                        return i?.chainId== auctionData?.nft?.chainId ? i.name: ""
                          })}
                    </Table.Cell>
                  </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Collection</Table.Cell>
                      <Table.Cell>
                        {auctionData?.nft?.collection
                          ? auctionData?.nft?.collection
                          : 'N/A'}
                      </Table.Cell>
                    </Table.Row>
                    {auctionData?.nft?.attributes?.map((i) => {
                      return (
                        <Table.Row>
                          <Table.Cell collapsing>
                            {i.propertyType ? i.propertyType : 'Attributes'}
                          </Table.Cell>
                          <Table.Cell>
                            {i.propertyName ? i.propertyName : 'N/A'}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                    <Table.Row>
                      <Table.Cell collapsing>Transfer Count</Table.Cell>
                      <Table.Cell>{auctionData?.nft?.transferCount}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
              <div className="details_table">
                <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan="3">
                        <Icon name=" quote right" /> Description
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{auctionData?.nft?.description}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>

              <div className="details_table">
                <Table celled striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell colSpan="3">
                        <Icon name="align left" /> Details
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Auction ID </Table.Cell>
                      <Table.Cell
                        className="copy_id"
                        onClick={() => {
                          navigator.clipboard.writeText(auctionData?.id);
                          cogoToast.success('Copied to clipboard', {
                            position: 'top-center',
                            hideProgressBar: true,
                            pauseOnHover: false,
                            autoClose: 500,
                          });
                        }}
                      >
                        {auctionData?.id} <Icon name="copy" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Auction Status</Table.Cell>
                      <Table.Cell>{auctionData?.status}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Auction Created At</Table.Cell>
                      <Table.Cell>{`${moment(auctionData?.createdAt).format(
                        'DD-MMM-YY (hh:mm A)',
                      )}`}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
        </Root>
      )}
    </div>
  );
}

export default AuctionDetails;

const Root = styled.section`
  margin-top: 20px;
  color: whitesmoke;
  .action_bar {
    /* text-align: right; */
    display: flex;
    justify-content: space-between;

    .ui.item.simple.dropdown {
      border-radius: 6px;
      color: #fff;
    }
    .ui.compact.menu {
      display: inline-flex;
      background-color: #070c27;
      border-radius: 6px;
      margin: 0px 4px;
      color: white;
      border: 1px solid #ffffff57;
    }
    .menu.transition {
      background: #c7c7c7;
    }
  }
  .nft_box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
    text-transform: capitalize;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    th {
      font-size: 18px;
    }
    .image_box {
      width: 100%;
      flex: 1;
      position: relative;

      p.views_p {
        position: absolute;
        top: 0;
        right: 0;
        margin-right: 11px;
        margin-top: -8px;
}
      .image {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 5px;
        border: 1px solid rgba(34, 36, 38, 0.15);
        padding: 10px;
        :hover{
          opacity: 0.5;
          cursor: pointer;
        }
      }

      span.chain_id{
      position: absolute;
      top: 12px;
      left: 12px;
      /* border-radius: 50%; */
      .chain_img{
        height: 35px;
        width: 35px;
        border: none !important;
        padding: 0px;
        margin: 0px;
        /* border-radius: 50%; */
      }
    }

      .nft_highlights {
        display: flex;
        flex-direction: column;
        justify-content: right;
        /* padding: 10px; */

        .countdown_time {
          /* background-color:red; */
          text-align: center;
          h3 {
            margin-top: 2px;
          }
        }

        .bid_details {
          padding: 5px;
          table.ui.celled.striped.table {
            background: transparent;
            color: #fff;
            border: 1px solid #ffffff57;
            margin-top: 25px;
            /* padding: 5px; */
          }
          .ui.table tr td {
            border: 1px solid #5e5e5e4f;
          }
          th {
            background: #111632;
            color: #fff;
          }
        }
      }
    }
    .content_box {
      flex: 1;
      .nft_price {
        text-align: right;
        margin-bottom: 10px;
        h1 {
          margin-top: 0px;
        }
      }
      .details_table {
        margin-bottom: 20px;
        display: flex;

        table.ui.celled.striped.table {
          background: transparent;
          color: #fff;
          border: 1px solid #ffffff57;
        }
        .ui.table tr td {
          border: 1px solid #5e5e5e4f;
        }
        th {
          background: #111632;
          color: #fff;
        }

        .baseprice_child {
          display: flex;
          h1 {
            margin-top: 0px;
          }
        }
      }
    }
    .copy_id {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.5s;
      i {
        opacity: 0;
        transition: all 0.5s;
      }
      :hover {
        background: #58a76e7d;
        i {
          opacity: 1;
        }
      }
    }
  }
  .heading {
    width: 100%;
    .owner_details {
      display: flex;
      > div {
        flex: 1;
      }
      span {
        opacity: 0.6;
      }
      h3 {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        margin-top: 6px;
        transition: all 0.5s;
        width: fit-content;

        :hover {
          transform: translateX(10px);
          /* color: #131841; */
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }
`;
