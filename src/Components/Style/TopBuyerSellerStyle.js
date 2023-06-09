import styled from "styled-components";

export const TopBuyerSellerStyle = styled.section`

width: 100%;

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
  padding: 20px 25px;
  border-radius: 20px;
  h3{
    padding: 0px 0px 10px 5px;
  }
  .child {
          .img_div {
            display: flex;
            justify-content: center;
            position: relative;
            .rankOf{
              background-color: #ff555f;
              width: fit-content;
              position: absolute;
              top: 0;
              left: 0;
              margin-left: 5px;
              margin-top: 0px;
              border-radius: 5px;
              padding: 2px;
            }
            img {
              width: 65%;
              border-radius: 35%;
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
    slidesToShow: 10,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1500,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 4,
              infinite: false,
              // dots: true
            }
          },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: false,
          // dots: true
        }
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };