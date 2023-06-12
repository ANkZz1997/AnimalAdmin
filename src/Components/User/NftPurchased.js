import React from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';
import { TbH4 } from 'react-icons/tb';
import { UserChildCss } from './UserChildCss';

function NftPurchased({ data }) {
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  console.log('data', data?.length);

  return (
    <UserChildCss>
      <div className="overview">
        <div className="table_title">NFT Purchased</div>

        <div className="overview_section">
          {data?.length ? (
            <table>
              <thead>
                <tr>
                  <th>NFT Details</th>
                  <th>Category</th>
                  <th>Date/Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {data && data?.map((i,ix) => {
                  return (
                    <tr key={ix}>
                      {/* <Link
                        href="/nftdetails/[nftdetails]"
                        as={`/nftdetails/${i?.nft?.id}`}
                      > */}
                        <td data-label="NFT Details" className="nft_cell">
                      <Link to={`/nfts/nftdetails/${i?.nft?.id}`}>
                          {/* <div>*/}
                            {/* <img src={`${IMAGE_END_POINT}${i?.nft?.media}`}/>{' '} */}
                            <h4>{i?.nft?.name}</h4>
                          {/* </div> */}
                      </Link>
                        </td>
                      <td data-label="Category" className="cate_cell">
                        <h4>{i?.nft?.category}</h4>
                      </td>
                      <td data-label="Date/Time">
                        <h4>{`${moment(i?.createdAt).format(
                          'DD-MMM-YY',
                        )}`}</h4>
                      </td>
                      <td data-label="Price">
                        <h4>{i.marketplace?.price}Eth</h4>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2>No NFT Purchased</h2>
          )}
        </div>
      </div>
    </UserChildCss>
  );
}

export default NftPurchased;

