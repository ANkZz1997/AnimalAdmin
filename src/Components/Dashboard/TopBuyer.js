import React, { useRef } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import Slider from 'react-slick';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usersDataAction } from '../../redux/admin/action';
import { useEffect } from 'react';
import URLS from '../../utils/urls';
import DashTopLoader from '../Loader/DashTopLoader';
import { TopBuyerSellerStyle, TopSellerBuyerSettings } from '../Style/TopBuyerSellerStyle';
import { useNavigate } from 'react-router-dom';


function TopBuyer() {
  const [userData, setuserData] = useState('');
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const searchTextUser = "";
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const nevigate = useNavigate();

  const callBack = (data) => {
    setuserData(data?.records);
    setLoader(false);
  };

  const searchSortUserFunction = ()=>{
     
    const objData = [
      { firstName: { contains: searchTextUser} },
      { lastName: { contains: searchTextUser } },
      { email: { contains: searchTextUser } },
      { username: { contains: searchTextUser } },
    ];
    dispatch(
      usersDataAction(
        {
          page: 1,
          limit: 20,
          sorting: "createdAt",
          order: "DESC",
        },
        {or : objData},
        callBack,
      ),
    );
  }

  useEffect(()=>{
    setLoader(true);
    searchSortUserFunction();
  },[])

  return (
    <TopBuyerSellerStyle>
      <div className="parent_container">
      <h3>Top Buyers</h3>

      <Slider {...TopSellerBuyerSettings}>
        {loader? [...Array(10)].map((i,ix) => 
            <DashTopLoader/>
        )
        : 
         userData && userData?.map((i,ix)=>{
          return(
            <div className="child" key={ix}>
            <div className="img_div" >
            <img
                src={
                  i?.avatar
                    ? `${ImgEndPoint}${i.avatar}`
                    : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                }
                alt="user"
                onClick={()=>{nevigate(`/user/userdetails/${i?.id}`)}}
                />
                <p className='rankOf'>#{ix+1}</p>
            </div>
            <div className="data_div">
              <p>{i?.firstName? i.firstName:"N/A UserName"}</p>
              <p className='amount'>34,000 Rs</p>
              {/* <p>12 NFTs</p> */}
          </div>
            </div>
          )
        })
        }
      </Slider>
       
      </div>
    </TopBuyerSellerStyle>
  );
}

export default TopBuyer;

