import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersDataAction } from '../../redux/admin/action';
import { TopBuyerSellerStyle, TopSellerBuyerSettings } from '../Style/TopBuyerSellerStyle';
import Slider from 'react-slick';
import DashTopLoader from '../Loader/DashTopLoader';
import URLS from '../../utils/urls';
import styled from 'styled-components';

export default function TopUserRoyalty() {

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
    <Root>
    <div className="parent_container">
    <h3>Top #20 Royalty Earner</h3>

    <Slider {...TopSellerBuyerSettings}>
      {loader? [...Array(6)].map((i,ix) => 
          <DashTopLoader key={ix}/>
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
  </Root>
  )
}

const Root = styled.section`

@media(max-width:650px){
  width: 95%;
}

width: 49%;
flex:1;

button.slick-arrow.slick-next {
    position: absolute;
    top: 0;
    margin-top: -25px;
    margin-right: 10px;
}
button.slick-arrow.slick-prev {
    position: absolute;
    top: 0;
    left: unset;
    right: 10px;
    margin-top: -25px;
}
.slick-next:before, .slick-prev:before {
    font-size: 25px;
    line-height: 1;
    opacity: .75;
    color: #fff;
}

.parent_container{
  border: 1px solid grey;
  padding: 20px 20px 50px 20px;
  border-radius: 35px;
  h3{
    padding: 5px 0px 40px 5px;
  }
  .child {
          .img_div {
            display: flex;
            justify-content: center;
            position: relative;
            transition: all 0.5s;
            :hover{
                transform: translateY(5px);
              }
            .rankOf{
              background-color: #ff555f8f;
              width: fit-content;
              position: absolute;
              top: 0;
              left: 0;
              margin-left: 10px;
              margin-top: 0px;
              border-radius: 5px;
              padding: 1px;

            }
            img {
              width: 75px;
              height: 75px;
              border-radius: 35%;
              object-fit: cover;
              margin-bottom: 10px;
              cursor: pointer;
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
              text-transform: uppercase;
              font-weight: 500;

            }
            .amount{
              font-size: 12px;
            }

          }
        }
}

`
