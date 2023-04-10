import React, { useEffect, useState } from 'react';
import { Dimmer, Dropdown, Icon, Loader, Menu, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { usersDataAction } from '../../redux/admin/action';
import LoaderCSS from '../Loader';
import URLS from '../../utils/urls';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
import Goerli from '../../Assets/Goerli.png';
import polygon from '../../Assets/polygon.svg';
import bnb from '../../Assets/bnb.svg'
import BackButton from '../Model/BackButton';


function MarketplaceDetails({ details }) {
  const [marketplaceData, SetMarketplaceData] = useState('');
  const [loader, Setloader] = useState(true);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [minterdetails, setMinterDetails] = useState();

  const minterId = marketplaceData?.nft?.minter;

  const dispatch = useDispatch();

  const callBack = (data) => {
    setMinterDetails(data.records[0]);
    Setloader(false);
  };

  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ];

  useEffect(() => {
    SetMarketplaceData(details);
    const obj = [{ id: minterId }];

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
  }, [details, minterId]);

  return (
    <div>
      {loader ? (
        <LoaderCSS />
      ) : (
        <Root>
          <div className="action_bar">
            {/* <Link to={"/marketplace"}> */}
              <div><BackButton/></div>
            {/* </Link> */}
            <Menu compact>
              <Dropdown text="Action" options={options} simple item />
            </Menu>
          </div>

          <div className="nft_box">
            <div className="heading">
              <h1>{marketplaceData?.nft?.name}</h1>
              <div className="owner_details">
                <div>
                  <span>User</span>
                    {/* <Link
                      href="/userdetails/[userid]"
                      as={`/userdetails/${marketplaceData?.user?.id}`}
                    > */}
                    <Link to={`/user/userdetails/${marketplaceData?.user?.minter}`}>
                      <h3>
                        <img
                          src={
                            marketplaceData?.user?.avatar
                              ? `${IMAGE_END_POINT}${marketplaceData?.user?.avatar}`
                              : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                          }
                        />{' '}
                        {marketplaceData?.user?.firstName
                          ? marketplaceData?.user?.firstName
                          : 'Unnamed User'}{' '}
                        {marketplaceData?.user?.lastName}{' '}
                      </h3>
                    </Link>
                </div>

                <div>
                  <span>Minter</span>

                  {/* <Link
                    href="/userdetails/[userid]"
                    as={`/userdetails/${marketplaceData?.nft?.minter}`}
                  > */}
                  <Link to={`/user/userdetails/${marketplaceData?.nft?.minter}`}>
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
                        : 'Unnamed Minter'}{' '}
                      {minterdetails?.lastName}{' '}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
            <div className="image_box">
            <span className='chain_id'>{marketplaceData?.nft?.chainId=="5"?<img src={Goerli} className="chain_img"/>:(marketplaceData?.nft?.chainId=="97"?<img src={bnb}  className="chain_img"/>:
      (marketplaceData?.nft?.chainId=="80001"?<img src={polygon}  className="chain_img"/>:""))}</span>
              <img src={`${IMAGE_END_POINT}${marketplaceData?.nft?.media}`} />

              {/* <div className="nft_highlights">
           <div className="countdown_time">
             <span>History</span>
             <h3>{deadline ? <Clock deadline={deadline} /> : ''}</h3>
           </div>
         </div> */}
            </div>

            <div className="content_box">
              <div className="nft_price">
                <span>Price</span>
                <h1>{marketplaceData?.price} ETH</h1>
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
                      <Table.Cell>{marketplaceData?.nft?.royalty} %</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Category</Table.Cell>
                      <Table.Cell>{marketplaceData?.nft?.category}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell collapsing>Chain</Table.Cell>
                    <Table.Cell>{marketplaceData?.nft?.chainId=="5"?"Goerli":(marketplaceData?.nft?.chainId=="97"?"BNB":(marketplaceData?.nft?.chainId=="80001"?"Polygon":"None"))}</Table.Cell>
                  </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Collection</Table.Cell>
                      <Table.Cell>
                        {marketplaceData?.nft?.collection
                          ? marketplaceData?.nft?.collection
                          : 'N/A'}
                      </Table.Cell>
                    </Table.Row>
                    {marketplaceData?.nft?.attributes?.map((i) => {
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
                      <Table.Cell>
                        {marketplaceData?.nft?.transferCount}
                      </Table.Cell>
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
                      <Table.Cell>
                        {marketplaceData?.nft?.description}
                      </Table.Cell>
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
                          navigator.clipboard.writeText(marketplaceData?.id);
                          cogoToast.success('Copied to clipboard', {
                            position: 'top-center',
                            hideProgressBar: true,
                            pauseOnHover: false,
                            autoClose: 500,
                          });
                        }}
                      >
                        {marketplaceData?.id} <Icon name="copy" />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Status</Table.Cell>
                      <Table.Cell>{marketplaceData?.status}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Created At</Table.Cell>
                      <Table.Cell>{`${moment(marketplaceData?.createdAt).format(
                        'DD-MMM-YY (hh:mm A)',
                      )}`}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>Updated At</Table.Cell>
                      <Table.Cell>{`${moment(marketplaceData?.updatedAt).format(
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

export default MarketplaceDetails;

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
      img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 5px;
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
        transition: all 0.7s;
        width: fit-content;
        :hover {
          transform: translateX(10px);
          /* color:#63e6c4; */
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
