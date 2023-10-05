import React from 'react'
import { BsEmojiAngry } from 'react-icons/bs'
import styled from 'styled-components'

export default function PageNF() {
  return (
    <Root>
        <h1>Page Not Found : Error Code 404 !!</h1>
        <h1 className='emj_h'><BsEmojiAngry/></h1>

    </Root>
  )
}

const Root = styled.section`
color: white;
display: flex;
justify-content: center;
align-items: center;
height: 50%;
flex-direction: column;

.emj_h{
    font-size: 50px;
}

`
