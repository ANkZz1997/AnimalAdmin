import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Table, TableBody } from 'semantic-ui-react';
import styled from 'styled-components';

function Overview(data) {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setUserDetails(data.data);
  }, [data]);

  console.log("userDetailsuserDetails",userDetails)
  return (
    <Root>
      <div className="overview">
        <div className="table_title">User Details</div>
        <div className="overview_section">
          <table>
            <tbody>
              <tr className="row_1">
                <td>
                  <p>Full Name</p>{' '}
                </td>
                <td>
                  <h4 className='h4_fullname'>{`${
                    userDetails?.firstName ? userDetails.firstName : 'N/A'
                  } ${
                    userDetails?.lastName ? userDetails.lastName : ''
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Username</p>
                </td>
                <td>
                  {' '}
                  <h4>
                    @{`${userDetails?.username ? userDetails.username : 'N/A'}`}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Contact</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.contact ? userDetails.contact : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Last Login IP</p>
                </td>
                <td>
                  <h4>{
                    userDetails?.lastLoginIP}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Email</p>
                </td>
                <td>
                  <h4>{`${userDetails?.email ? userDetails.email : 'N/A'}`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Created On</p>
                </td>
                <td>
                  <h4>
                    {`${
                      userDetails?.createdAt
                        ? `${moment(userDetails.createdAt).format(
                            'DD-MMM-YY (hh:mm A)',
                          )}`
                        : 'N/A'
                    }`}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>User Id</p>
                </td>
                <td>
                  <h4>{`${userDetails?.id ? userDetails.id : 'N/A'}`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>User Status</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.status ? userDetails.status : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              {userDetails?.socialAccountType?
              <>
                <tr>
                <td>
                  <p>Social Account Type</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.socialAccountType
                  }`}</h4>
                </td>
                </tr>
                <tr>
                <td>
                  <p>Social Id</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.socialId ? userDetails.socialId : 'N/A'
                  }`}</h4>
                </td>
                </tr>
              </>
                :
                ""
            }
             
              <tr>
                <td>
                  <p>Wallet Address</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.wallet ? userDetails.wallet.address : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Wallet Id</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.wallet ? userDetails.wallet.id : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Wallet Created On</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.wallet
                      ? `${moment(userDetails.wallet.createdAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`
                      : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Wallet Updated On</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.wallet
                      ? `${moment(userDetails.wallet.updatedAt).format(
                          'DD-MMM-YY (hh:mm A)',
                        )}`
                      : 'N/A'
                  }`}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Wallet User</p>
                </td>
                <td>
                  <h4>{`${
                    userDetails?.wallet ? userDetails.wallet.user : 'N/A'
                  }`}</h4>
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
      font-weight: 500;
      /* font-family: emoji; */
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
          p {
            /* flex: 1; */
            font-size: 16px;
            color: rgb(140, 124, 240);
          }

          h4 {
            /* flex: 2; */
            color: whitesmoke;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            /* text-transform: capitalize; */
          }
          h4.h4_fullname{
            text-transform: capitalize;
          }
        }
      }
    }
  }
`;
