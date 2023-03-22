import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import PaginationCode from '../Pagination';
import LoaderCSS from '../Loader';
import URLS from '../../utils/urls';
import UserInfo from './UserInfo';
import FilterBarB from './FilterBar';
import { Link } from 'react-router-dom';

function ChatSupport() {
  const [disputeData, setDisputeData] = useState([]);
  const [disputeTopic, setDisputeTopic] = useState([]);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dataLimit = 20;

  const getDisputeList = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      // let searchObj = [{user:{contains:searchText}}]
      await axios
        .get(
          `${URLS.EXCHANGE.ADMIN.GET_DISPUTE_LIST}page=${activePage}&limit=${dataLimit}&sort=${sort}&order=${order}`,
          axiosConfig,
          // {or:searchObj}
        )
        .then((res) => {
          setDisputeData(res.data.data.records);
          setTotalPage(res.data.data.totalCount);
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getTopic = async () => {
    try {
      let axiosConfig = {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios
        .get(`${URLS.EXCHANGE.ADMIN.GET_DISPUTE_TOPIC}`, axiosConfig)
        .then((res) => {
          if (res) {
            const newData = [];
            for (let i = 0; i < Object.keys(res.data.data).length; i++) {
              newData.push({
                id: Object.values(res.data.data)[i],
                title: Object.keys(res.data.data)[i],
              });
            }
            setDisputeTopic(newData);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const checkTopic = (id) => {
    return disputeTopic.filter((i) => i.id == id)[0]?.title;
  };
  useEffect(() => {
    getDisputeList();
    getTopic();
  }, [activePage, sort, order, searchText]);

  return (
        <Root>
          <div>
            <div>
              <h1>Chat Support Table</h1>
            </div>

            <div>
              <FilterBarB
                sort={(e) => {
                  setSort(e);
                }}
                order={(e) => {
                  setOrder(e);
                }}
                searchText={(e) => {
                  setSearchText(e);
                }}
              />
            </div>

            <div className="chatrequest_table">
              {loader ? (
                <LoaderCSS />
              ) : (
                <table celled>
                  <thead>
                    <tr>
                      <th> S.No</th>
                      <th> User Info</th>
                      {/* <th> Created On</th> */}

                      <th> Last Update</th>
                      {/* <th> Description</th> */}
                      <th> Related To</th>
                      <th> Query Status</th>
                      <th> View Chat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disputeData?.map((i, ix) => {
                      return (
                        <tr key={ix}>
                          <td className="s_no" data-label="S.No">
                            {ix + 1}
                          </td>
                          <UserInfo id={i?.user} />
                          {/* <td> {`${moment(1675757417520).format(
                              'DD-MMM-YY (hh:mm A)',
                            )}`}</td> */}
                          <td data-label="Updated At">{`${moment(
                            i?.updatedAt,
                          ).format('DD-MMM-YY (hh:mm A)')}`}</td>
                          {/* <td>{i?.description}</td> */}
                          <td data-label="About">
                            {checkTopic(i?.relatedItemType)}
                          </td>
                          {/* <td>{i?.relatedItem}</td> */}
                          <td data-label="Status">{i?.status}</td>
                          {/* <Link
                            href="/userchatdetails/[userchatdetails]"
                            as={`/userchatdetails/${i.id}`}
                          > */}
                                <td className="chat_link">
                            <Link to={`/chatsupport/userchatdetails/${i?.id}`}>
                                    <div>Click To Chat</div>
                            </Link>

                                </td>
                          {/* </Link> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <PaginationCode
            active={activePage}
            activePage={(e) => {
              setActivePage(e);
            }}
            totalPage={totalPage}
            limit={dataLimit}
          />
        </Root>
  );
}

export default ChatSupport;

const Root = styled.section`
color: whitesmoke;
  .user_image_name {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
    img {
      height: 25px;
      width: 25px;
      border-radius: 50%;
    }
  }
  .user_img_table {
    /* display: flex; */
    cursor: pointer;
    :hover {
      background: rgb(17 22 50) !important;
      color: #fff !important;
    }
    img {
      transition: all 0.5s;
      :hover {
        transform: scale(1.2);
      }
    }
  }
  .chat_link {
    cursor: pointer;
    padding: 0;
    :hover {
      background: rgb(17 22 50) !important;
      color: #fff !important;
    }
    a{
      >div{
        height: 42px;
        display: flex;
        justify-content: left;
        align-items: center;
        padding-left: 5px;

        @media(max-width: 700px){
          justify-content: center;
        }
    }
    }
  
  }

  table {
    /* border: 1px solid #ccc; */
    border-collapse: collapse;
    margin: 0;
    padding: 0;
    width: 100%;
    table-layout: auto;

    td,
    th {
      border: 1px solid #ccc;
      padding: 0.625em;
      text-align: left;
    }

    @media (max-width: 700px) {
      table {
        border: hidden;
      }

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
        font-weight: bold;
        text-transform: uppercase;
        display: flex;
        align-items: center;
      }
      td:last-child {
        border-bottom: 0;
      }
      .chat_link {
        text-align: center;
      }

      .user_image_name {
        width: 100%;
        display: flex;
        justify-content: end;
      }
      .user_img_table {
        display: flex;
      }
    }
  }
`;
