import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import { Link } from 'react-router-dom';
import { UserChildCss } from './UserChildCss';

function NftWishlisted(data) {
  const [userDetails, setUserDetails] = useState();
  const [dataLoader, setDataLoader] = useState(true);
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  useEffect(() => {
    setUserDetails(data.data.wishlist);
    setDataLoader(false);
  }, [data]);

  return (
    <UserChildCss>
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
                      <tr key={ix}>
                          <td data-label="NFT Details" className="nft_cell">
                        <Link to={`/nfts/nftdetails/${i?.id}`}>
                            {/* <div><img src={`${IMAGE_END_POINT}${i?.media}`} />{' '} */}
                              <h5>{i?.name}</h5>
                            {/* </div> */}
                          </Link>
                          </td>
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
    </UserChildCss>
  );
}

export default NftWishlisted;
