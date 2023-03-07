import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../../redux/admin/action';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { Loader } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Login() {
    const [eyeOn,setEyeOn] = useState(true)
    const [inputEmail,setInputEmail] = useState('')
    const [inputPass,setInputPass] = useState('')
    const loading = useSelector((state) => state?.commonReducer?.isLoading);
   

    const dispatch = useDispatch()
    const handelLogin =()=>{
        const data ={
            username : inputEmail,
            password : inputPass,
        }
        const userCallback=(e)=>{
            console.log('userCallback',e)
        }
        dispatch(userLoginAction(data , userCallback))
    }

  return (
   <Root>
     <div className='login_main'>
        <div className='img_div'>
        <img src='https://media-exp1.licdn.com/dms/image/C4E0BAQGjwLsHkw2SrA/company-logo_200_200/0/1620645652666?e=2147483647&v=beta&t=epqRF_4sGOkON7TVAJoqsSCmyHPul0qq31nLH_N1vPE'/>
        </div>
        <div className='login_form'>
            <h1>Welcome Back</h1>
            <b> Enter your credentials to access your account </b>

            <input type="email" value={inputEmail} onChange={(e)=>{setInputEmail(e.target.value)}} placeholder="UserName" className='input1'/>

            <div className='pass_div'>
            <input type={eyeOn ?"password" : 'text' } value={inputPass} onChange={(e)=>{setInputPass(e.target.value)}} placeholder="Password"
            className='input2' 
            />
            <button onClick={()=>{setEyeOn(!eyeOn)}} className="eye_btn">{!eyeOn?<AiFillEye/>:<AiFillEyeInvisible/>}</button>
            </div>
            
            <br/>
            <button onClick={()=>{handelLogin()}} className="login_btn">{loading ? (
                <Loader size="small" active inline="loading" />
              ) : (
                'Login'
              )}</button>
        </div>
    </div>
   </Root>
  )
}

const Root = styled.section`
*{
    padding:0px;
    margin:0px;
    outline: 0 !important;
}

height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
/* background-color: green; */
background-image: url("https://img.freepik.com/premium-vector/bitcoin-concept_34629-80.jpg?w=740");
background-repeat: no-repeat;
background-position: center;
background-size: cover;

h1,b{
    color: white;
}

.login_main{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .img_div{
        border-radius: 50%;
        padding: 5px;
        img{
            border-radius: 50%;
            height: 120px;
            width: 120px;
        }
    }

    .login_form{
        text-align: center;
        padding: 30px 50px 50px ;
        border: 2px solid #fff;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(3px);

        .input1{
            height: 30px;
            margin: 10px 0 20px 0;
            border: none;
            padding: 2px;
            border-radius: 5px;
        }

        .pass_div{
            display: flex;
            justify-content: center;

            .input2{
                width: 100%;
                border: none;
                padding: 2px;
                height: 30px;
                /* border-radius: 5px; */
                border-top-left-radius:5px ;
                border-bottom-left-radius: 5px;
                :focus{
                    border: none;
                }
            }

            .eye_btn{
                border: none;
                padding-right :2px ;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
    
        }
        .login_btn{
            height: 30px;
            background-color: #35608e;
            border: none;
            border-radius: 5px;
            color: white;

            :hover{
                background-color: #283895;
            }
        }

    }
}

`
