import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Dropdown, Icon, Menu, Table } from 'semantic-ui-react';
import URLS from '../../utils/urls';
import { toast } from 'react-toastify';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import Goerli from '../../Assets/Goerli.png';
import polygon from '../../Assets/polygon.svg';
import bnb from '../../Assets/bnb.svg'
import BackButton from '../Model/BackButton';


export default function NftDetails({ details, activity }) {
  const [nftdata, setNftData] = useState({});
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ];

  useEffect(() => {
    if (details) {
      setNftData(details);
    }
  }, [details]);
console.log('nftdata cc' ,  )
  return (
    <div>
      <Root>
        <div className="action_bar">
          <Link to={"/nfts"}>
            <div><BackButton/></div>
          </Link>
          <Menu compact>
            <Dropdown text="Action" options={options} simple item />
          </Menu>
        </div>

        <div className="nft_box">
          <div className="heading">
            <h1>{nftdata?.name}</h1>
            <div className="owner_details">
              <div>
                <span>User</span>
                <Link to={`/user/userdetails/${nftdata?.user?.id}`}>
                  {/* <Link
                    href="/userdetails/[userid]"
                    as={`/userdetails/${nftdata?.user?.id}`}
                  > */}
                    <h3>
                      <img
                        src={
                          nftdata?.user?.avatar
                            ? `${IMAGE_END_POINT}${nftdata?.user?.avatar}`
                            : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        }
                      />{' '}
                      {nftdata?.user?.firstName
                        ? nftdata?.user?.firstName
                        : 'Unnamed User'}{' '}
                      {nftdata?.user?.lastName}{' '}
                    </h3>
                  </Link>
              </div>
              <div>
                <span>Minter</span>
                <Link to={`/user/userdetails/${nftdata?.minter?.id}`}>

                {/* <Link
                  href="/userdetails/[userid]"
                  as={`/userdetails/${nftdata?.minter?.id}`}
                > */}
                  <h3>
                    <img
                      src={
                        nftdata?.minter?.avatar
                          ? `${IMAGE_END_POINT}${nftdata?.minter?.avatar}`
                          : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                      }
                    />{' '}
                    {nftdata?.minter?.firstName
                      ? nftdata?.minter?.firstName
                      : 'Unnamed Minter'}{' '}
                    {nftdata?.minter?.lastName}{' '}
                  </h3>
                </Link>
              </div>
            </div>
          </div>
          <div className="image_box">
          <span className='chain_id'>{nftdata?.chainId=="5"?<img src={Goerli} className="chain_img"/>:(nftdata?.chainId=="97"?<img src={bnb}  className="chain_img"/>:
      (nftdata?.chainId=="80001"?<img src={polygon}  className="chain_img"/>:""))}</span>
            <img src={`${IMAGE_END_POINT}${nftdata?.media?.id}`} />
          </div>
          <div className="content_box">
            <div className="details_table">
              <Table celled striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <Icon name="align left" /> Attributes
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Royalty</Table.Cell>
                    <Table.Cell>{nftdata?.royalty} %</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Category</Table.Cell>
                    <Table.Cell>{nftdata?.category}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Chain</Table.Cell>
                    <Table.Cell>{nftdata?.chainId=="5"?"Goerli":(nftdata?.chainId=="97"?"BNB":(nftdata?.chainId=="80001"?"Polygon":"None"))}</Table.Cell>
                  </Table.Row>
                  {/* {nftdata?.attributes?.map((i) => {
                    return (
                      <Table.Row>
                        <Table.Cell collapsing>{i.propertyType? i.propertyType:"No Attributes"}</Table.Cell>
                        <Table.Cell>{i.propertyName}</Table.Cell>
                      </Table.Row>
                    );
                  })} */}


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
                    <Table.Cell>{nftdata?.description}</Table.Cell>
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
                    <Table.Cell>ID </Table.Cell>
                    <Table.Cell
                      className="copy_id"
                      onClick={() => {
                        navigator.clipboard.writeText(nftdata?.id);
                        cogoToast.success('Copied to clipboard', {
                          position: 'top-center',
                          hideProgressBar: true,
                          pauseOnHover: false,
                          autoClose: 500,
                        });
                      }}
                    >
                      {nftdata?.id} <Icon name="copy" />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Status</Table.Cell>
                    <Table.Cell>{nftdata?.status}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Created At</Table.Cell>
                    <Table.Cell>{`${moment(nftdata?.createdAt).format(
                      'DD-MMM-YY (hh:mm A)',
                    )}`}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>Last Update</Table.Cell>
                    <Table.Cell>{`${moment(nftdata?.updatedAt).format(
                      'DD-MMM-YY (hh:mm A)',
                    )}`}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            <div className="details_activity">
              <table>
                <caption>Activity</caption>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Price</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {activity?.map((i, ix) => {
                    return (
                      <tr>
                        <td>{i.type}</td>
                        <td>{`${moment(i?.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`}</td>
                        {/* <td>MarketPlace</td> */}
                        <td>
                          {i.type == 'SOLD' ||
                          i.type == 'BUY' ||
                          i.type == 'ADDTOMARKET'
                            ? i.marketplace.price
                            : i.type == 'BID'
                            ? i.bid.price
                            : '-'}
                          Eth
                        </td>

                        {/* <Link
                          href="/userdetails/[userid]"
                          as={`/userdetails/${i.user?.id}`}
                        > */}
                        <Link to={`/user/userdetails/${i.user?.id}`}>
                          <td className="user_cell">{i.user.username}</td>
                        </Link>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Root>
    </div>
  );
}

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
      flex: 1;
      position: relative;
      img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 20px;
        border: 1px solid rgba(34, 36, 38, 0.15);
        padding: 10px;
      }
      span.chain_id{
      position: absolute;
      top: 12px;
      left: 12px;
      /* border-radius: 50%; */
      .chain_img{
        height: 35px;
        width: 35px;
        padding: 0px;
        margin: 0px;
        border: none !important;
        /* border-radius: 50%; */
      }
    }
   
    }
    .content_box {
      flex: 1;
      .details_table {
        margin-bottom: 20px;
        /* Tabel style */
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
      }

      .details_activity {
        margin-bottom: 20px;
        table {
          caption {
            /* margin: 5px; */
            padding: 5px;
          }
          width: 100%;
          text-align: left;
          background: transparent;
          color: #fff;
          border: 1px solid #ffffff57;
        }
        tr td {
          border: 1px solid #5e5e5e4f;
          padding: 10px;
        }
        th {
          background: #111632;
          color: #fff;
          padding: 10px;
        }

        .user_cell {
          cursor: pointer;
          :hover {
            background-color: grey;
            color: black;
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
          /* color: #131841; */
          transform: translateX(10px);
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
