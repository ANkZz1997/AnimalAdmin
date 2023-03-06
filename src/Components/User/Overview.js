import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, TableBody } from 'semantic-ui-react';
import styled from 'styled-components';

function Overview(data) {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setUserDetails(data.data);
  }, [data]);

  return (
    <Root>
      <div className="overview">
        <div className="table_title">User Details</div>
        <div className="overview_section">
          <table>
            <tbody>
              <tr className="row_1">
                <td>
                  <p2>Full Name</p2>{' '}
                </td>
                <td>
                  <h3>{`${
                    userDetails?.firstName ? userDetails.firstName : 'N/A'
                  } ${
                    userDetails?.lastName ? userDetails.lastName : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Username</p2>
                </td>
                <td>
                  {' '}
                  <h3>
                    @{`${userDetails?.username ? userDetails.username : 'N/A'}`}
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Contact</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.contact ? userDetails.contact : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Email</p2>
                </td>
                <td>
                  <h3>{`${userDetails?.email ? userDetails.email : 'N/A'}`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Created On</p2>
                </td>
                <td>
                  <h3>
                    {`${
                      userDetails?.createdAt
                        ? `${moment(userDetails.createdAt).format(
                            'DD-MMM-YY (hh:mm A)',
                          )}`
                        : 'N/A'
                    }`}
                  </h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>User Id</p2>
                </td>
                <td>
                  <h3>{`${userDetails?.id ? userDetails.id : 'N/A'}`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>User Status</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.status ? userDetails.status : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Social Account Type</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.socialAccountType
                      ? userDetails.socialAccountType
                      : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Social Id</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.socialId ? userDetails.socialId : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Wallet Address</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.wallet ? userDetails.wallet.address : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Wallet Id</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.wallet ? userDetails.wallet.id : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Wallet Created On</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.wallet
                      ? `${moment(userDetails.wallet.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`
                      : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Wallet Updated On</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.wallet
                      ? `${moment(userDetails.wallet.updatedAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`
                      : 'N/A'
                  }`}</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p2>Wallet User</p2>
                </td>
                <td>
                  <h3>{`${
                    userDetails?.wallet ? userDetails.wallet.user : 'N/A'
                  }`}</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Root>
  );
}

export default Overview;

const Root = styled.section`
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

      table {
        width: 100%;
        padding: 10px;
        td {
          padding: 5px;
          p2 {
            /* flex: 1; */
            font-size: 16px;
            color: rgb(140, 124, 240);
          }

          h3 {
            /* flex: 2; */
            color: whitesmoke;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }
      }
    }
  }
`;
