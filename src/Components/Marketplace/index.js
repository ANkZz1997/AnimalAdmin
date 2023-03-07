import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { marketPlaceAction } from '../../redux/admin/action';
import URLS from '../../utils/urls';
import MarketplaceCard from '../Cards/MarketplaceCard';
import LoaderCSS from '../Loader';
import PaginationCode from '../Pagination';
import FilterBarM from './FilterBar';


export default function MarketPlaceData() {
  const [marketData, setMarketData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const dataLimit = 20;

  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const dispatch = useDispatch();

  const callBack = (data) => {
    setMarketData(data);
    setTotalPage(data.totalCount);
    setLoader(false);
  };

  useEffect(() => {
    const data = {"populate": ["user","nft"]}
    const nftObj = [
      // { user: { contains: searchText } },
      // { nft.category: { contains: searchText } },
      { status: { contains: searchText } },
      { price: { contains: searchText } },
    ];
    dispatch(
      marketPlaceAction(
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

  return (
    <Root>
        {/* <Card.Group className="card_main"> */}
       
          <h1>NFTs In Marketplace Are {marketData?.totalCount}</h1>
          <FilterBarM
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
            <div className="grid_tile">
              {marketData?.records.map((i, ix) => {
                return (
                  <div key={ix}>
                    <MarketplaceCard data={i} />
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

const Root = styled.section`
color: whitesmoke;
  .grid_tile {
    gap: 15px;
    width: 100%;
    min-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    /* gap: 10px; */
    > div {
      width: 100%;
    }
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
