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


function TopSeller() {
  const [userData, setuserData] = useState('');
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const searchTextUser = "";
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;


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
    setLoader(true)
    searchSortUserFunction();
  },[])
  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          // dots: true
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Root>
      <div className="parent_container">
        <h3>Top Sellers</h3>
        <Slider {...settings}>
        {loader? [...Array(10)].map((i,ix) => 
            <DashTopLoader/>
        )
        : 
         userData && userData?.map((i,ix)=>{
          return(
              <div className="child" key={ix}>
                <div className="img_div">
                <img
                    src={
                      i?.avatar
                        ? `${ImgEndPoint}${i.avatar}`
                        : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                    }
                    alt="user"/>
                </div>
                <div className="data_div">
                  <p>@{i.username? i.username:"N/A UserName"}</p>
                  <h5>34,00,000 Rs</h5>
                  {/* <p>12 NFTs</p> */}
              </div>
            </div>
          )
        })
        }
      </Slider>
      </div>
    </Root>
  );
}

export default TopSeller;

const Root = styled.section`
width: 49%;
.parent_container{
  /* background-color: #343950; */
  border: 1px solid grey;
  padding: 20px 25px;
  border-radius: 20px;
  h3{
    padding: 0px 0px 10px 5px;
  }
  .child {
          .img_div {
            display: flex;
            justify-content: center;
            img {
              width: 70%;
              border-radius: 50%;
              object-fit: cover;
              margin-bottom: 10px;
            }
          }
          .data_div {
            display: flex;
            justify-content: center;
            flex-direction: column;
            h3,
            h3,
            p,
            h5 {
              text-align: center;
              margin: 0;
              padding: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            p{
              padding: 0px 3px;
            }
          }
        }
}
`;
