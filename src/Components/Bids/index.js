import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { bidsAction } from '../../redux/admin/action';
import FilterBarB from './FilterBar';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import URLS from '../../utils/urls';
import { Link, useNavigate } from 'react-router-dom';
import TableLoader from '../Loader/TableLoader';

export default function BidsData() {
  const [bidsData, setBidsData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const nevigate = useNavigate();
  const netData = useSelector((state)=>state?.persistReducer?.platformChains)

  const dataLimit = 40;

  const dispatch = useDispatch();
  const callBack = (data) => {
    setBidsData(data?.records);
    setTotalPage(data?.totalCount)
    setLoader(false);
  };

  const searchSortBidsData = () =>{
    // const nftObj = [
    //   { auction: { contains: searchText } },
    //   // { name: { contains: searchText } },
    //   // { price: { contains: searchText} },
    //   // { user: { contains: searchText} },
    // ];
    const obj = {search:searchText}
    setBidsData([]);
    dispatch(
      bidsAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        obj,
        callBack,
      ),
    );
  }

  useEffect(() => {
    setLoader(true);
    searchSortBidsData()
  }, [activePage, sort, order, searchText]);

  // useEffect(() => {
  //   setLoader(true);
  //   searchSortBidsData(1)
  // }, [searchText]);


  return (
    <Root>
          <h1>Bids On NFTs</h1>
          <FilterBarB
            sort={(e) => {
              setSort(e);
            }}
            order={(e) => {
              setOrder(e);
            }}
            searchText={(e) => {
              setSearchText(e.trim());
              setActivePage(1)
            }}
          />
          
            <div className="card_box">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>NFT Details</th>
                    <th>Chain</th>
                    <th>Base Price</th>
                    <th>Bid Created On</th>
                    <th>Max Bid</th>
                  </tr>
                </thead>
                {loader? <TableLoader num = {6}/>:
                  <tbody>
                    {bidsData && bidsData?.map((i, ix) => {
                      return (
                        <tr key={ix}>
                          {/* <Link
                            href="/auctiondetails/[auctiondetails]"
                            as={`/auctiondetails/${i?.auction?.id}`}
                            key={ix}
                          > */}
                            {activePage == 1 ? <td data-label="S.No">{ix + 1}</td>:<td>{ix + 40 * (activePage -1) + 1}</td>}
                            <td className="nft_img">
                            {/* <Link to={`/auction/auctiondetails/${i?.auction?.id}`}> */}
                              <div className="nft_div" onClick={()=>{nevigate(`/auction/auctiondetails/${i?.auction?.id}`)}}>
                                <img alt='img'
                                  src={`${IMAGE_END_POINT}${i?.auction?.nft?.media}`}
                                ></img>{' '}
                                {i?.auction?.nft?.name}
                              </div>
                              {/* </Link> */}
                            </td>
                          
                          <td data-label="Chain">
                            {netData && netData?.map((j)=>{
                              if(j.chainId == i.auction.chainId){
                                return j.name;
                              }
                            })}
                          </td>
                          
                          <td data-label="Base Price">
                            {i?.auction?.basePrice}Eth
                          </td>
                          <td data-label="Bidded On">{`${moment(
                            i?.createdAt,
                          ).format('DD-MMM-YY (hh:mm A)')}`}</td>
                          <td data-label="Bid Price">{i?.price}Eth</td>
                        </tr>
                      );
                    })}
                  </tbody>
                }
              </table>
              {bidsData?.length === 0 && !loader? <h1 className='no_data'>No Data Found</h1>:"" }
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
const Root = styled.section`
  .no_data{
    text-align: center;
  }
  color: whitesmoke;
  .nft_img {
    text-transform: capitalize;
    :hover {
      background: rgb(17 22 50) !important;
      color: #fff !important;
      cursor: pointer;
    }
    .nft_div {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-left: 10px;
      img {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        object-fit: cover;
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
      .nft_div {
        justify-content: space-between;
      }
    }
  }
`;
