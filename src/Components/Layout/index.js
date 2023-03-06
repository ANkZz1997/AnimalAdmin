import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Login from '../Login'
import Sidebar from './Sidebar'
import Topbar from './Topbar'


export default function Layout({children}) {
    const userCheck = useSelector((state)=>state?.persistReducer?.isUser)
    console.log('Auth',userCheck)
  
  return (
    <Root>
        {userCheck?
         <div className='layout_section'>
         <div>
            <Topbar/>
            <div className='sidebar'>
                <Sidebar/>
            </div>
         </div>

         <div className='main_section'>
             <div className='content_section'>{children}</div>
         </div>
     </div>:
        <div>
            <Login/>
        </div>
    }
    </Root>
  )
}

const Root = styled.section`
height: 100%;
.layout_section{
    background-color: #070c27;
    display: flex;
    height: 100%;
    /* width: 100%; */
    .sidebar{
        width: 240px;
        padding: 20px 10px 20px 20px;
        border-right: 1px solid #3b3b3b;
        gap: 60px;
        position: sticky;
        overflow-x: scroll;
        height: 100vh;
        z-index: 999;
        top: 0px;
        background: #070c27;
        ::-webkit-scrollbar{
            display: none;
        }
        @media(max-width: 1000px){
            display:none;
        }

    }
    .main_section{
        width: 82%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0px auto;
        position: relative;
        .top_bar{
            width: auto;
        }
        .content_section {
            flex: 1;
            height: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 10px;
            /* margin-top: 65px; */
            padding-top: 75px;
        }
        @media(max-width: 1000px){
            width: 95%;
        }
    }
}


`
