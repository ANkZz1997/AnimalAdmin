import React, { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

function TopSeller() {
  const elementRef = useRef(null);
  // const [arrowDisable, setArrowDisable] = useState(true);
  // const [arrowDisable2,setArrowDisable2] = useState(false);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  return (
    <Root>
      <div className="parent_container">
        <div className="head">
          <div>
            <h3>Top Sellers</h3>{' '}
          </div>

          <div>
            <button
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 25, 150, -10);
              }}
            >
              {/* <Icon name="chevron circle left" /> */}
            </button>
            <button
              onClick={() => {
                handleHorizantalScroll(elementRef.current, 25, 150, 10);
              }}
            >
              {/* <Icon name="chevron circle right" /> */}
            </button>
          </div>
        </div>
        <div className="top_sellers" ref={elementRef}>
          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>

          <div className="child">
            <div className="img_div">
              <img src="https://react.semantic-ui.com/images/avatar/large/matthew.png"></img>
            </div>
            <div className="data_div">
              <h3>@user1</h3>
              <h5>34,00,000 Rs</h5>
              <h5>12 NFTs</h5>
            </div>
          </div>
        </div>
      </div>
    </Root>
  );
}

export default TopSeller;

const Root = styled.section`
  .parent_container {
    background-color: #343950;
    padding: 15px;
    height: 235px;
    border-radius: 10px;

    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      > div {
        button {
          background-color: transparent;
          border: none;
          font-size: 25px;
          color: #000;

          :hover {
            color: #070c27;
          }
        }
      }
    }

    .top_sellers {
      display: -webkit-box;
      position: relative;
      overflow-x: scroll;

      ::-webkit-scrollbar {
        display: none;
      }

      .child {
        height: 160px;
        width: 25%;
        margin-bottom: 10px;

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
          h5,
          h5 {
            text-align: center;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
`;
