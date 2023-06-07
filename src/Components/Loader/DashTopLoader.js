import React from 'react'
import styled from 'styled-components'

export default function DashTopLoader() {
  return (
    <Root>
        <div className="child">
            <div className="img_div2">
                <span className='span img'></span>
            </div>
            <div className="data_div">
            <p></p>
            <h5></h5>
            </div>
        </div>
    </Root>
  )
}

const Root = styled.section`

.data_div{
    display :flex;
    gap: 5px;
}

.img_div2{
        width: 100%;
        height:100%;
       .span.img{
        border-radius: 50%;
        display: block;
        position: relative;
        width: 70%;
        aspect-ratio: 1 / 1;
        height: 70%;
        background: linear-gradient(to right,#aba0a0 8%,#d5d3d3 18%,#a39e9e 33%);
        animation-duration: 4.2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: tableshimmer;
        animation-timing-function: linear;
        margin: 0px auto 10px auto;
       }
      }

      p,h5{
        display: block;
        position: relative;
        height: 15px;
        background: linear-gradient(to right,#aba0a0 8%,#d5d3d3 18%,#a39e9e 33%);
        animation-duration: 4.2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: tableshimmer;
        animation-timing-function: linear;
       
      }

    @-webkit-keyframes tableshimmer {
        0% {
            background-position: -100% 0;
        }
        100% {
            background-position: 100% 0;
        }
    }

    @keyframes tableshimmer {
        0% {
            background-position: -100px 0;
        }
        100% {
            background-position: 100px 0;
        }
    }




`
