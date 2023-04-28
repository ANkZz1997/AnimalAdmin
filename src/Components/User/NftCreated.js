import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import LoaderCSS from '../Loader';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';
import { UserChildCss } from './UserChildCss';

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
    <UserChildCss>
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
                        <th>NFT Name</th>
                        <th>Created On</th>
                        <th>Royality</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nfts.records && nfts?.records?.map((i,ix) => {
                        return (
                          <tr key={ix}>
                              <td data-label="NFT Details">
                           <Link to={`/nfts/nftdetails/${i?.id}`}>
                                {/* <div> */}
                                  {/* <img src={`${IMAGE_END_POINT}${i.media}`} /> */}
                                  <h4>{i.name}</h4>
                                {/* </div> */}
                            </Link>
                              </td>
                            {/* <td> <h3>{i.name}</h3></td> */}
                            <td data-label="Date/Time">
                                <h4>{`${moment(i?.createdAt).format(
                                  'DD-MMM-YY',
                                )}`}</h4>
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
              )}
            </>
          ) : (
            <h2>No NFT Created</h2>
          )}
        </div>
      </div>
    </UserChildCss>
  );
}

export default NftCreated;

