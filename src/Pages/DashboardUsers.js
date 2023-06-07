import React from 'react'
import UserListCard from '../Components/Cards/UserListCard'
import TableLoader from '../Components/Loader/TableLoader'
import styled from 'styled-components'

export default function DashboardUsers({data}) {
  return (
    <Root>  
        <table>
        <thead>
        <tr>
            <th className="username_style">User Details</th>
            <th className="created_on">Created On</th>
            {/* <th className="account_heading">Account Type</th> */}
            <th className="last_login">Last Login Time</th>

            <th className="account_heading">Verification</th>
            <th className="status">Status</th>
        </tr>
        </thead>
            <UserListCard data={data} />
        </table>
  </Root>
  )
}

const Root = styled.section`

width: 100%;
  h1 {
    color: white;
  }

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
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .user_name {
        width: 100%;

        h2 {
          /* color: #fff; */
          font-weight: 400;
          margin: 0px;
          font-size: 16px;
          width: 180px;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 5px;
          svg{
            color: #58a1ef;
          }
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

`

