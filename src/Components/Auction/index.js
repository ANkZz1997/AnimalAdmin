import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { auctionsAction } from '../../redux/admin/action';
import AuctionCard from '../Cards/AuctionCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBarA from './FilterBar';


function AuctionsData() {
  const [auctionData, setAuctionData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const dataLimit = 20;

  const dispatch = useDispatch();

  const callBack = (data) => {
    setAuctionData(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  useEffect(() => {
    const data = {"populate": ["user","nft"]}
    const nftObj = [
      { endTime: { contains: searchText } },
      { id: { contains: searchText } },
      { status: { contains: searchText } },
      { user: { contains: searchText } },
    ];
    setAuctionData([]);
    dispatch(
      auctionsAction(
        {
          page: activePage,
          limit: dataLimit,
          sorting: sort,
          order: order,
        },
        data,
        nftObj,
        callBack,
      ),
    );
  }, [activePage, sort, order, searchText]);

  console.log("auctiondata",auctionData)

  return (
    <Root>
        {/* <Card.Group> */}
      
          <h1>NFTs In Auction Are {auctionData?.totalCount}</h1>

          <FilterBarA
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

          {loader ? (
            <LoaderCSS />
          ) : (
            <div className="card_box">
              {auctionData?.records?.map((i, ix) => {
                return (
                  <div key={ix}>
                    <AuctionCard data={i} />
                  </div>
                );
              })}
            </div>
          )}
        
        {/* </Card.Group> */}
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

export default AuctionsData;


const Root = styled.section`

    color: whitesmoke;
  width: 100%;
  .card_box {
    display: grid;
    min-width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    @media (max-width: 1536px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media (max-width: 1300px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 770px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 510px) {
      grid-template-columns: 1fr;
    }
  }
`;
