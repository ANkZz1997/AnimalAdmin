import React, { useEffect, useState } from 'react';
import moment from 'moment';
import URLS from '../../utils/urls';
import { Link } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';

export default function UserListCard({ data }) {
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  return (
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
                        {i?.kycVerified ? <MdVerified/> : ""}
                        
                      </h2>
                      <h3>{i?.email ? i.email : 'N/A'}</h3>
                    </div>
                </Link>

                  </td>

                <td data-label="Created On" className="date">{`${moment(
                  i?.createdAt,
                ).format('DD-MMM-YY')}`}</td>
                <td data-label="Last Login" className="last_login">
                {`${moment(
                  i?.lastLoggedInTime,
                ).format('DD-MMM-YY (MM:HH A)')}`}
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
  );
}

