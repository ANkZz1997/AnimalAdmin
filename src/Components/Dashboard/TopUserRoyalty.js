import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TopBuyerSellerStyle, TopSellerBuyerSettings } from '../Style/TopBuyerSellerStyle';
import Slider from 'react-slick';
import DashTopLoader from '../Loader/DashTopLoader';
import URLS from '../../utils/urls';
import axios from 'axios';

export default function TopUserRoyalty({data}) {

  const [userData, setuserData] = useState('');
  const [loader, setLoader] = useState(true);
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const nevigate = useNavigate();

  const getTopRoyalty = async ()=>{
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_TOP_ROYLTY}`)
      if(res?.status === 200){
        setuserData(res?.data?.data)
        setLoader(false);
      }

    }catch(err){
      console.log(err)
    }

  }

  useEffect(()=>{
      setLoader(true);
      getTopRoyalty();
  },[])

  console.log("userData11111", userData)

  return (
    <TopBuyerSellerStyle>
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
              onClick={()=>{nevigate(`/user/userdetails/${i?._id}`)}}
              />
              <p className='rankOf'>#{ix+1}</p>
          </div>
          <div className="data_div">
            <p>{i?.firstName? i.firstName:"N/A UserName"}</p>
            <p className='amount'>{i?.totalPrice} Eth</p>
            {/* <p>12 NFTs</p> */}
        </div>
          </div>
        )
      })
      }
    </Slider>
     
    </div>
  </TopBuyerSellerStyle>
  )
}
