import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, Icon, Loader, Table } from 'semantic-ui-react';
import styled from 'styled-components';
import URLS from '../../utils/urls';
import LoaderCSS from '../Loader';
import BackButton from '../Model/BackButton';

function UserChatDetails({ id }) {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [input, setInput] = useState('');
  const [userDetails, setUserDetails] = useState();
  const [chatDescription, setChatDescription] = useState();
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [loader, setLoader] = useState(true);

  const handelConversation = async (id) => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_CONVERSATION}${id}`, axiosConfig)
        .then((res) => {
          // setMessage(res.data.data[0])
          if (res.data.data[0]) {
            handelAddMessage(res.data.data[0].conversation);
            setChatDescription(res.data.data[0].description);
            getUserDetails(res.data.data[0].user);
            socketConnection(res.data.data[0].user);
            // setSocketRoomId(res.data.data[0].user)

            setLoader(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const postConversation = async () => {
    const data = {
      dispute: id,
      message: input,
    };
    if (input.length > 0) {
      try {
        let axiosConfig = {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const res = await axios.post(
          `${URLS.EXCHANGE.ADMIN.POST_CONVERSATION}`,
          data,
          axiosConfig,
        );
        if (res) {
          const newData = [
            ...message,
            {
              id: 4,
              sender: 'user',
              text: input,
            },
          ];
          setMessage(newData);
          setInput('');
          // scrollToBottom();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handelAddMessage = (socketMessageUpdate) => {
    const newData = [
      ...message,
      ...socketMessageUpdate.map((i, ix) => {
        return {
          id: ix + 1,
          sender: i.response == true ? 'user' : 'admin',
          text: i.message,
        };
      }),
    ];
    setMessage(newData);
    // scrollToBottom();
  };

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
          //   getNftDetails();
          //   setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      postConversation();
    }
  };

  const socketConnection = (id) => {
    const roomid = { user: id };
    console.log('roomid', typeof roomid);
    // console.log(socket);
    console.log('connecting to socket');
    const socket = window.io.sails.connect('http://nft.sdnatech.com:8080');
    socket.headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.post('/socket/joinUserRoom', roomid);
    socket.on('message', (r) => {
      console.log('socketMessage', roomid);
      setNewMessage(r);
    });
  };

  useEffect(() => {
    handelConversation(id);
    socketConnection();
  }, [id]);

  useEffect(() => {
    console.log('message ---------------------------');
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    if (newMessage) {
      const newObj = {
        id: message.length,
        sender: newMessage.response == true ? 'user' : 'admin',
        text: newMessage.message,
      };
      setMessage([...message, newObj]);
    }
  }, [newMessage]);

  console.log('message', message);

  return (
    <Root>
      <div className="main_div">
        <Link to={`/chatsupport/`}>
          <BackButton/>
        </Link>

        <div className="user_details">
          {/* <Link
            href="/userdetails/[userid]"
            as={`/userdetails/${userDetails?.id}`}
          > */}
            <img
              src={
                userDetails?.avatar
                  ? `${IMAGE_END_POINT}${userDetails?.avatar}`
                  : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
              }
            />
          {/* </Link> */}
          <h2>
            {userDetails?.firstName
              ? `${userDetails.firstName} ${userDetails.lastName}`
              : 'Unnamed User'}
          </h2>
        </div>
        <div className="description">
          <h3>Description: </h3> <h4>{chatDescription}</h4>
        </div>
        {loader ? (
          <LoaderCSS />
        ) : (
          <div className="chat_box">
            {message?.map((message, ix) => (
              <div
                key={ix}
                className={`message ${
                  message.sender === 'user' ? 'user-message' : 'other-message'
                }`}
                ref={messagesEndRef}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}

        <div className="input_div">
          {/* <button className="attach_button">
            <Icon name="attach"></Icon>
          </button> */}
          <input
            className="input_message"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyPress={keyPressed}
          />
          <button className="send_btn" onClick={postConversation} type="submit">
            {' '}
            <Icon name="send" />
          </button>
        </div>
      </div>
    </Root>
  );
}

export default UserChatDetails;

const Root = styled.section`
color: whitesmoke;
  *:focus {
    outline: 0 !important;
  }

  .main_div {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 83vh;
    
    .user_details {
      display: flex;
      align-items: center;
      height: 8%;
      margin-top: 5px;
      img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 5px;
        object-fit: cover;
        transition: all 0.5s;
        cursor: pointer;
        :hover {
          transform: scale(1.1);
        }
      }
      h2 {
        margin: 0;
      }
    }
    .description {
      display: flex;
      align-items: baseline;
      padding: 5px;
      h4,
      h3 {
        margin: 0;
        padding: 5px;
        text-transform: capitalize;
      }
    }

    .chat_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: scroll;
      background: #070c27;
      padding: 10px;
      /* height: 70vh; */
      padding: 5px;
      border: 1px solid #fff;
      flex: 1;
      ::-webkit-scrollbar {
        width: 0px;
      }
      .message {
        display: flex;
        align-items: center;
        margin: 10px;
        padding: 10px;
        border-radius: 10px;
        max-width: 100%;
        word-break: break-all;
      }
      .user-message {
        display: flex;
        align-items: center;
        align-self: flex-end;
        background-color: #091787;
        font-size: 16px;
        box-shadow: rgb(255 255 255 / 16%) 0px 3px 6px,
          rgb(138 138 138 / 23%) 0px 3px 6px;
      }
      .other-message {
        display: flex;
        align-items: center;
        align-self: flex-start;
        background-color: #500171;
        font-size: 16px;
        box-shadow: rgb(255 255 255 / 16%) 0px 3px 6px,
          rgb(138 138 138 / 23%) 0px 3px 6px;
      }
    }

    .input_div {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      height: 40px;
      align-items: stretch;
      margin-top: 5px;
      input.input_message {
        width: 100%;
        background: transparent;
        padding-left: 4px;
        border: 1px solid #fff;
        color: #fff;
        font-size: 18px;
      }
      button.send_btn {
        width: 50px;
        padding: 4px;
        cursor: pointer;
        font-size: 18px;
        border-radius: 5px;
      }
      /* button.attach_button {
        width: 50px;
        height: 50px;
        padding:4px;
        cursor: pointer;
        font-size: 18px;
        border-radius: 5px;
        height: 100%;
      } */
    }
  }
`;
