import React from 'react';
import Slider from 'react-slick';
import { useState } from 'react';
import { useEffect } from 'react';
import URLS from '../../utils/urls';
import DashTopLoader from '../Loader/DashTopLoader';
import { TopBuyerSellerStyle, TopSellerBuyerSettings } from '../Style/TopBuyerSellerStyle';
import { useNavigate } from 'react-router-dom';


function TopSeller({data}) {
  const [userData, setuserData] = useState('');
  const [loader, setLoader] = useState(true);
  const ImgEndPoint = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const nevigate = useNavigate();

  useEffect(()=>{
    if(data){
      setLoader(false)
      setuserData(data)
    }
  },[data])
 
  return (
    <TopBuyerSellerStyle>
      <div className="parent_container">
        <h3>Top #20 Sellers</h3>
        <Slider {...TopSellerBuyerSettings}>
        {loader? [...Array(6)].map((i,ix) => 
            <DashTopLoader key={ix}/>
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

export default TopSeller;
