import React from "react";
import styled from "styled-components";


export function CardLoader(){

    return(
        <>
        {Array(10).fill(0,0,10).map((i,ix)=>{
           return(
            <Root key={ix}>
            <div class="card">
            <div class="shimmerBG media"></div>
            <div class="p-32">
            <div class="shimmerBG content-line end"></div> 
                <div class="shimmerBG title-line"></div>
                <div class="shimmerBG title-line end"></div>
                <div class="shimmerBG content-line m-t-24"></div>
            </div>
            </div>
            </Root>
           )
        })}
        </>
     
    )
}

const Root = styled.section`
 position: relative;
    -webkit-box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #111632;
    border-radius: 6px;
    height: 360px;
    overflow: hidden;
    /* min-width: 270px; */
    width: 100%;
    /* margin: 40px auto; */
.card {

  .shimmerBG {
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: shimmer;
    animation-timing-function: linear;
    background: #ddd;
    /* background: linear-gradient(to right, #F6F6F6 8%, #F0F0F0 18%, #F6F6F6 33%); */
    background: linear-gradient(to right,#cdc8c8 8%,#d5d3d3 18%,#cdc8c8 33%);
    background-size: 1200px 100%;
}


@-webkit-keyframes shimmer {
    0% {
        background-position: -100% 0;
    }
    100% {
        background-position: 100% 0;
    }
}

@keyframes shimmer {
    0% {
        background-position: -1200px 0;
    }
    100% {
        background-position: 1200px 0;
    }
}
  
    .media {
    height: 266px;
}

.p-32 {
    padding: 16px;
}

.title-line {
    height: 24px;
    width: 100%;
    margin-bottom: 7px;
    border-radius: 20px;
    /* background:#cdc8c8; */

}

.content-line {
    height: 8px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 8px;
}
  
  .end {
      width: 40%;
      /* background:#cdc8c8; */

    }

}

.m-t-24 {
    margin-top: 24px;
}

.user_section {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    transition: all 0.4s;
    cursor: pointer;
    height: 360px;

    :hover {
      box-shadow: rgb(255 255 255 / 43%) 0px 0px 8px 0px;
    }
    padding: 0px;
    margin: 0px;
    border-radius: 6px;
    background: #111632;
    /* height: 360px; */
    position: relative;
    overflow: hidden;
  }

`