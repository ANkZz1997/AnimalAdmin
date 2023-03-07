import React from 'react';
import styled from 'styled-components';

function LoaderCSS() {
  return (
    <Root>
      {/* <div className="loader"></div> */}
      <div className="dots-bars-4"></div>
    </Root>
  );
}

export default LoaderCSS;

const Root = styled.section`
  color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  

  .dots-bars-4 {
    width: 40px;
    height: 20px;
    --c: radial-gradient(farthest-side, currentColor 93%, #0000);
    background: var(--c) 0 0, var(--c) 50% 0, var(--c) 100% 0;
    background-size: 8px 8px;
    background-repeat: no-repeat;
    position: relative;
    animation: db4-0 1s linear infinite alternate;
  }
  .dots-bars-4:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 12px;
    background: currentColor;
    left: 0;
    top: 0;
    animation: db4-1 1s linear infinite alternate,
      db4-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
  }

  @keyframes db4-0 {
    0% {
      background-position: 0 100%, 50% 0, 100% 0;
    }
    8%,
    42% {
      background-position: 0 0, 50% 0, 100% 0;
    }
    50% {
      background-position: 0 0, 50% 100%, 100% 0;
    }
    58%,
    92% {
      background-position: 0 0, 50% 0, 100% 0;
    }
    100% {
      background-position: 0 0, 50% 0, 100% 100%;
    }
  }

  @keyframes db4-1 {
    100% {
      left: calc(100% - 8px);
    }
  }

  @keyframes db4-2 {
    100% {
      top: -0.1px;
    }
  }

  * {
    box-sizing: border-box;
  }

  /* .loader {
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #070c27;
    width: 20px;
    height: 20px;
    -webkit-animation: spin 0.5s linear infinite;
    animation: spin 1s linear infinite;
    margin: 10px;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } */
`;
