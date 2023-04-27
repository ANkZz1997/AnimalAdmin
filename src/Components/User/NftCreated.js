import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import LoaderCSS from '../Loader';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';

function NftCreated({ items, nftList }) {
  const [nfts, setNfts] = useState('');
  const [dataLoader, setDataLoader] = useState(true);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  useEffect(() => {
    setNfts(nftList);
    setDataLoader(false);
  }, [nftList]);

  console.log("createdcreated",nftList)
  return (
    <Root>
      <div className="overview">
        <div className="table_title">NFT Created</div>
        <div className="overview_section">
          {nftList?.records?.length > 0 ? (
            <>
              {dataLoader ? (
               <LoaderCSS/>
              ) : (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>NFT Details</th>
                        <th>Created On</th>
                        <th>Royality</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nfts.records && nfts?.records?.map((i) => {
                        return (
                          <tr>
                           <Link to={`/nfts/nftdetails/${i?.id}`}>
                              <td data-label="NFT Details" className="nft_cell">
                                <div>
                                  <img src={`${IMAGE_END_POINT}${i.media}`} />
                                  <h5>{i.name}</h5>
                                </div>
                              </td>
                            </Link>
                            {/* <td> <h3>{i.name}</h3></td> */}
                            <td data-label="Date/Time">
                              <h4>
                                <h4>{`${moment(i?.createdAt).format(
                                  'DD-MMM-YY (hh:mm A)',
                                )}`}</h4>
                              </h4>
                            </td>
                            <td data-label="Royality">
                              <h4>Royalty {i.royalty}%</h4>
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
              )}
            </>
          ) : (
            <h2>No NFT Created</h2>
          )}
        </div>
      </div>
    </Root>
  );
}

export default NftCreated;

const Root = styled.section`
  * {
    margin: 0;
    padding: 0;
  }
  .overview {
    border-radius: 10px;
    /* padding: 10px; */
    margin-top: 20px;
    background-color: rgb(17 22 50);
    h2 {
      text-align: center;
      color: whitesmoke;
    }

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

      table {
        width: 100%;
        padding: 10px;
        text-align: left;
        h4,
        h5 {
          text-transform: capitalize;
        }
        .nft_cell {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 10px;
          img {
            height: 30px;
            width: 30px;
          }
        }
        td {
          padding: 5px;
        }
        th {
          font-size: 18px;
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
