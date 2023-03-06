import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatSupport from '../Components/ChatSupport';

function UserChatDetailsId() {
 
  // let {id} = useParams()

  return (
    <>
      <ChatSupport/>
    </>
  );
}

export default UserChatDetailsId;
