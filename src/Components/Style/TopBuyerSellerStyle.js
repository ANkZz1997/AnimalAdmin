import styled from "styled-components";

export const TopBuyerSellerStyle = styled.section`

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
  padding: 15px 20px;
  /* border-radius: 20px; */
  h3{
    padding: 0px 0px 10px 5px;
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
              width: 50px;
              height: 50px;
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

export const TopSellerBuyerSettings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1650,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: false,
          // dots: true
        }
      },
        {
            breakpoint: 1500,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false,
              // dots: true
            }
          },
      // {
      //   breakpoint: 1250,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 2,
      //     infinite: false,
      //     // dots: true
      //   }
      // },
      // {
      //   breakpoint: 730,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //     initialSlide: 2
      //   }
      // },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };