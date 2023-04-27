import React from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';

function NftSold({ data }) {
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  console.log('data', data);

  return (
    <Root>
      <div className="overview">
        <div className="table_title">NFT Sold</div>

        <div className="overview_section">
          {data && data?.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>NFT Details</th>
                  <th>Category</th>
                  <th>Sold On</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data && data?.map((i) => {
                  return (
                    <tr>
                      {/* <Link
                        href="/nftdetails/[nftdetails]"
                        as={`/nftdetails/${i?.nft.id}`}
                      > */}
                      <Link to={`/nfts/nftdetails/${i?.nft.id}`}>
                        <td data-label="NFT Details" className="nft_cell">
                          <div>
                            <img src={`${IMAGE_END_POINT}${i.nft.media}`} />{' '}
                            <h5>{i.nft.name}</h5>
                          </div>
                        </td>
                      </Link>
                      <td data-label="Category" className="cate_cell">
                        <h4>{i.nft.category}</h4>
                      </td>
                      <td data-label="Date/Time">
                        <h4>{`${moment(i.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`}</h4>
                      </td>
                      <td data-label="Price">
                        <h4>{i.marketplace.price}Eth</h4>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2>No NFT Sold</h2>
          )}
        </div>
      </div>
    </Root>
  );
}

export default NftSold;

const Root = styled.section`
color: whitesmoke;
  .overview {
    border-radius: 10px;
    margin-top: 20px;
    background-color: rgb(17 22 50);

    .table_title {
      margin-top: 10px;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 25px;
      font-weight: 900;
      font-family: emoji;
      padding: 10px;
      padding-left: 30px;
      color: whitesmoke;
    }

    .overview_section {
      background-color: rgb(17 22 50);
      padding: 10px;

      h2 {
        text-align: center;
      }

      table {
        padding: 10px;
        width: 100%;
        text-align: left;
        h4,
        h5 {
          text-transform: capitalize;
        }

        .nft_cell {
          display: flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          cursor: pointer;
          width: 100%;
          :hover {
            background-color: rgb(42 49 92);
          }
        }
        img {
          height: 30px;
          width: 30px;
        }

        th {
          font-size: 18px;
          padding: 5px;
        }

        td {
          padding: 5px;
        }

        @media (max-width: 575px) {
          td,
          th {
            border: 1px solid #ccc;
            padding: 0.625em;
            text-align: right;
          }
          thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
            text-align: right;
          }
          tr {
            border-bottom: 2px solid #ddd;
            display: block;
            margin-bottom: 0.8em;
          }
          td {
            border-bottom: 1px solid #ddd;
            display: block;
          }
          td::before {
            content: attr(data-label);
            float: left;
            font-weight: 400;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            text-align: left;
          }
          .nft_cell {
            justify-content: space-between;
          }
        }
      }
    }
  }
`;
