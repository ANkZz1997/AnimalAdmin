import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URLS from '../../utils/urls';


function UserInfo({ id }) {
  const [userDetails, setUserDetails] = useState();
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;

  const getUserDetails = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_USER_DETAILS}${id}`, axiosConfig)
        .then((res) => {
          setUserDetails(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails(id);
  }, [id]);

  return (
    // <Link href="/userdetails/[userid]" as={`/userdetails/${userDetails?.id}`}>
      <td className="user_img_table" data-label="User">
        <Link to={`/user/userdetails/${userDetails?.id}`}>

            <div className="user_image_name">
            <img
                src={
                userDetails?.avatar
                    ? `${IMAGE_END_POINT}${userDetails?.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
            />
            {userDetails?.firstName
                ? `${userDetails.firstName} ${userDetails.lastName}`
                : 'Unnamed User'}
            </div>
        </Link>
      </td>
  );
}

export default UserInfo;
