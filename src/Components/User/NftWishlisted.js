import React, { useEffect, useState } from 'react';
import { Dimmer, Loader, Table, TableBody, TableCell } from 'semantic-ui-react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';

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
                  <Table celled>
                    <TableBody>
                      <Table.Row>
                        {userDetails?.map((i, ix) => {
                          return (
                            // <Link
                            //   href="/nftdetails/[nftdetails]"
                            //   as={`/nftdetails/${i.id}`}
                            // >
                              <TableCell className="table_cell">
                                <h3 className="img_section">
                                  <img src={`${IMAGE_END_POINT}${i.media}`} />
                                </h3>
                                <div className="tabel_content">
                                  <h3>{i.name}</h3>
                                  <h3>{i?.category}</h3>
                                  <h3>Royalty {i.royalty}%</h3>
                                  <h3>{i.status}</h3>
                                </div>
                              </TableCell>
                            // </Link>
                          );
                        })}
                      </Table.Row>
                    </TableBody>
                  </Table>
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
        color: whitesmoke;
      }

      table {
        border: transparent !important;
        @media (max-width: 767px) {
          display: block;
        }
      }

      .table_cell {
        cursor: pointer;
        background-color: rgb(17 22 50);
        display: grid;
        grid-template-columns: 130px auto;
        align-items: center;
        :hover {
          background-color: rgb(42 49 92);
        }
        @media (max-width: 767px) {
          display: grid !important;
          grid-template-columns: 200px auto;
          gap: 15px;
        }

        @media (max-width: 510px) {
          grid-template-columns: 150px auto;
          gap: 5px;
        }
        @media (max-width: 415px) {
          grid-template-columns: 100px auto;
          gap: 5px;
        }

        .tabel_content {
          display: flex;
          gap: 10px;

          @media (max-width: 767px) {
            flex-direction: column;
          }
        }
        h3 {
          color: whitesmoke;
          text-transform: capitalize;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 90%;

          @media (max-width: 550px) {
            flex-direction: column;
          }

          @media (max-width: 510px) {
            width: 70%;
          }
        }
        .img_section {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          img {
            height: 70px;
            width: 60px;
            object-fit: cover;
            object-position: top;

            @media (max-width: 767px) {
              height: 100%;
              width: 100%;
              object-fit: cover;
              aspect-ratio: 16/15;
              border-radius: 16px;
              padding: 5px;
              object-position: top center;
            }
            @media (max-width: 510px) {
              height: 100%;
              width: 100%;
              object-fit: cover;
              aspect-ratio: 16/15;
              border-radius: 16px;
            }
            @media (max-width: 450px) {
              height: 100%;
              width: 100%;
              object-fit: cover;
              aspect-ratio: 16/15;
              border-radius: 16px;
            }
          }
        }
      }
    }
  }
`;
