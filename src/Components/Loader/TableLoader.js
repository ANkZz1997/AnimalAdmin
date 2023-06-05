import React from 'react'
import styled from 'styled-components'

export default function TableLoader() {
  return (
    <Root>
    
              {Array(10).fill(0,0,10).map((i,ix) => {
                return (
                  <tr key={ix}>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                    <td><span></span></td>
                  </tr>
                );
              })}
        
    </Root>
  )
}

const Root = styled.tbody`

      td{
       span{
        border-radius: 4px;
        display: block;
        position: relative;
        width: 100%;
        height: 20px;
        background: linear-gradient(to right,#aba0a0 8%,#d5d3d3 18%,#a39e9e 33%);
        animation-duration: 4.2s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: tableshimmer;
        animation-timing-function: linear;
       }
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
