import React, { useEffect } from 'react'
import styled from 'styled-components'
import BasicPreLogin from './BasicPreLogin'



export default function BasicSettings() {
  return (
    <Root>
      <div>
        <BasicPreLogin/>
      </div>
    </Root>
  )
}

const Root = styled.section`

display: flex;
flex-direction: column;
gap: 5px;
button{
  /* background-color: #11183f; */
  color: white;
  text-align: left;
  padding: 10px;
  border: 0;
  cursor: pointer;

  :hover{
    background-color: #40404d;
  }
}

.makeActive{
  display: block;
}
.makeActive.no{
  display: none;
}

`
