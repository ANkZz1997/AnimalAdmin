import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import { Link } from 'react-router-dom';

function NftWishlisted(data) {
  const [userDetails, setUserDetails] = useState();
  const [dataLoader, setDataLoader] = useState(true);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  useEffect(() => {
    setUserDetails(data.data.wishlist);
    setDataLoader(false);
  }, [data]);

  return (
    <Root>
      <div className="overview">
        <div className="table_title">NFT Wishlisted</div>
        <div className="overview_section">
          <>
            {userDetails?.length > 0 ? (
              dataLoader ? (
               <LoaderCSS/>
              ) : (
                <>
                  <table>
                  <thead>
                    <tr>
                      <th>NFT Details</th>
                      <th>Category</th>
                      <th>Royality</th>
                      <th>Status</th>
                    </tr>
                </thead>
                    <tbody>
                        {userDetails && userDetails?.map((i, ix) => {
                          return (
                      <tr>
                        <Link to={`/nfts/nftdetails/${i?.id}`}>
                          <td data-label="NFT Details" className="nft_cell">
                            <div>
                              {' '}
                              <img src={`${IMAGE_END_POINT}${i?.media}`} />{' '}
                              <h5>{i?.name}</h5>
                            </div>
                          </td>
                          </Link>
                          <td data-label="Category" className="cate_cell">
                            <h4>{i?.category}</h4>
                          </td>
                          <td data-label="Royality">
                            <h4>{i.royalty}%</h4>
                          </td>
                          <td data-label="Status">
                            <h4>{i.status}</h4>
                          </td>
                      </tr>

                          );
                        })}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h2>Nothing In The Wishlist</h2>
            )}
          </>
        </div>
      </div>
    </Root>
  );
}

export default NftWishlisted;

const Root = styled.section`
color: whitesmoke;
  * {
    margin: 0;
    padding: 0;
  }
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
  }`;
