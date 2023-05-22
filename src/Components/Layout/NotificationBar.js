import React from 'react'
import styled from 'styled-components'
import BackButton from '../Model/BackButton'

export default function NotificationBar() {
  return (
    <Root>
        <div className='notify_head'><BackButton/><h1>Notifications</h1></div>

        <div className='notify_parent'>

        </div>
    </Root>
  )
}

const Root = styled.section`
color: white;
.notify_head{
    display: flex;
    h1{
        margin: 0;
    }
}
` 
