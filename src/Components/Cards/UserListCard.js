import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';


export default function UserListCard({ data }) {
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  console.log("Imageendpint",ImgEndPoint)

  return (
    <Root>
      <table>
        <thead>
          <tr>
            <th className="username_style">User Details</th>
            <th className="created_on">Created On</th>
            <th className="account_heading">Account Type</th>
            <th className="account_heading">Verification</th>
            <th className="status">Status</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.map((i, ix) => {
            return (
              <tr className="table_data" key={ix}>
                  <td className="user_details">
                <Link to={`/user/userdetails/${i?.id}`}>

                    <div className="user_img">
                      <img
                        src={
                          i?.avatar
                            ? `${ImgEndPoint}${i.avatar}`
                            : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        }
                        alt="user"
                      />
                    </div>
                    <div className="user_name">
                      <h2>
                        {i?.firstName ? i.firstName : 'Unnamed'}{' '}
                        {i?.lastName ? i.lastName : 'User'}
                      </h2>
                      <h3>{i?.email ? i.email : 'N/A'}</h3>
                    </div>
                </Link>

                  </td>

                <td data-label="Created On" className="date">{`${moment(
                  i?.createdAt,
                ).format('DD-MMM-YY')}`}</td>
                <td data-label="Account Type" className="account_type">
                  {' '}
                  {i?.type}
                </td>
                <td data-label="Verification" className="status">
                  {i?.kycVerified ? 'Verified' : 'Pending'}
                </td>
                <td data-label="Status" className="status">
                  {i?.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Root>
  );
}

const Root = styled.section`
    color: whitesmoke;
  table {
    width: 100%;
    text-align: left;
    td {
      padding: 5px;
    }

    .user_details {
      a{
        display: flex;
      align-items: center;
      gap: 20px;
      width: 100%;
      cursor: pointer;
      text-transform: capitalize;

      :hover {
        background: rgb(17 22 50) !important;
        color: #fff !important;
      }
      .user_img {
        display: flex;
        align-items: center;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .user_name {
        width: 100%;

        h2 {
          /* color: #fff; */
          font-weight: 600;
          margin: 0px;
          font-size: 18px;
          width: 180px;
          word-break: break-all;
        }
        h3 {
          /* color: #fff; */
          font-weight: 400;
          font-size: 14px;
          word-break: break-all;
          margin: 0px;
        }
      }
    }

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
      .user_details {
        gap: 0px;

        .user_name {
          display: flex;
          align-items: flex-end;
          flex-direction: column;
        }
      }
    }
  }
`;
