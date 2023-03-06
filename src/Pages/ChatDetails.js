import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserChatDetails from '../Components/ChatSupport/UserChatDetails';

function UserChatDetailsId() {
 let {id} = useParams()
console.log('ididid',id)
  return (
    <>
        <UserChatDetails id={id} />
    </>
  );
}

export default UserChatDetailsId;