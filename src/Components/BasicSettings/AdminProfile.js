import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import URLS from '../../utils/urls';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import axios from 'axios';
import { adminUserNameAction, checkUserAction } from '../../redux/admin/action';
import cogoToast from 'cogo-toast';

export default function AdminProfile() {

  const [inputFile, setInputFile] = useState([]);
  const [changePassPop, setChangePassPop] = useState(false);
  const userCheck = useSelector((state) => state?.persistReducer?.adminDetails)
  const IMAGE_END_POINT = URLS.EXCHANGE.ENDPOINTS.IMAGE_END_POINT;
  const [eyeOn, setEyeOn] = useState(true);
  const [eyeOn2, setEyeOn2] = useState(true);
  const [adminName, setAdminName] = useState(userCheck?.name);
  const [currentPass, setCurrentPass] = useState();
  const [passCheck1, setPassCheck1] = useState("")
  const [passCheck2, setPassCheck2] = useState("")
  const dispatch = useDispatch()

  const editProfile = async () => {
    const data = new FormData();
    data.append("name", adminName)
    data.append("avatar", inputFile[0])

    try {
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.EDIT_ADMIN_PROFILE}`, data)
      console.log("updatedprofile", res.data?.data[0])
      dispatch(adminUserNameAction({ ...userCheck, name: res?.data?.data[0].name, avatar: res?.data?.data[0].avatar }))
      cogoToast.success("Profile Updated Successfully")

    } catch (err) {
      console.log(err)

    }
  }

  const handlePass = async() => {
    const data = {
      oldPassword:currentPass,
      newPassword:passCheck2
    }
    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.EDIT_ADMIN_PASSWORD}`,data)
      cogoToast.success("Password Changed")
      cogoToast.success("Please Login Again")
      dispatch(checkUserAction(false));
      localStorage.setItem("token","")

    }catch(err){
      console.log("errerrerr",err.response)
      cogoToast.error(err.response?.data?.message? err.response?.data?.message: "Something went wrong" )
    }
  }

  // console.log("inputFile", userCheck)

  return (
    <Root>
      <div className='child_2'>

        <div className='img_div'>
          {inputFile[0] ? <img src={URL.createObjectURL(inputFile[0])} /> : <img src={`${IMAGE_END_POINT}${userCheck?.avatar}`} />}
        </div>
        <div className='edit_div'>
          <h4>Admin Name :</h4><input value={adminName} onChange={(e) => { setAdminName(e.target.value) }}></input>
        </div>
        <div className='btn_sav'>
          <button><input type='file' onChange={(e) => { setInputFile(e.target.files) }}></input>Select Image</button>
          <button onClick={() => { editProfile() }}>Save</button>
        </div>
      </div>

      <div className='child_1'>
        <div className='child_1_title'>
          <h4>You Can Also Change Your Password...</h4>
          {/* <button onClick={() => { setChangePassPop(!changePassPop) }}>Change Password</button> */}
        </div>

        {/* <div className={changePassPop ? "edit_pass" : "edit_pass no"}> */}
        <div className= "edit_pass">
          <div className='edit_div'>
            <h4>Current Password:
            </h4><input type={!eyeOn ? "text" : "password"} onChange={(e) => { setCurrentPass(e.target.value) }}></input>
            <button onClick={() => { setEyeOn(!eyeOn) }} className='btn_eye'>{!eyeOn ? <AiFillEye /> : <AiFillEyeInvisible />}</button>
          </div>
          <div className='edit_div'>
            <h4>New Password:
            </h4><input value={passCheck1} type={!eyeOn2 ? "text" : "password"} onChange={(e) => { setPassCheck1(e.target.value) }} ></input>
            <button onClick={() => { setEyeOn2(!eyeOn2) }} className='btn_eye'>{!eyeOn2 ? <AiFillEye /> : <AiFillEyeInvisible />}</button>
          </div>
          <div className='edit_div'>
            <h4>Confirm Password :
            </h4><input value={passCheck2} type="password" onChange={(e) => { setPassCheck2(e.target.value) }}></input>
          </div>
          <p>Password Length must be greater than 8, else it will not show the save button.</p>
          <button className={currentPass && passCheck1.length>8 && passCheck1 === passCheck2 ?
            "" : "btn_hide"} onClick={() => { handlePass() }}>Change Password</button>
        </div>
      </div>

    </Root>
  )
}

const Root = styled.section`
border: 1px solid;
padding: 20px;
display: flex;

.child_1{
  flex:1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;

  .child_1_title{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    h4{
      margin: 0;
    }
  }

  .edit_div{
    display: flex;
    /* gap: 10px; */
    flex-wrap: wrap;
    align-items: center;
    .btn_eye{
      background-color: transparent;
      padding:0;
      margin: 0;
      display: flex;
      font-size: 22px;
    }
    h4{
      margin: 0;
      min-width: 140px;
    }
    input{
      border: 1px solid;
      background-color: transparent;
      padding: 2px;
      color: white;
      :focus{
        outline: 0;
      }
    }
  }
  .edit_pass{
    display: flex;
    gap: 10px;
    align-items: flex-start;
    flex-direction: column;
    .btn_hide{
      display: none;
    }
  }
  .edit_pass.no{
    display: none;
  }
}
.child_2{
  .edit_div{
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    h4{
      margin: 0;
    }
    input{
      border: 1px solid;
      background-color: transparent;
      padding: 2px;
      color: white;
      :focus{
        outline: 0;
      }
    }
  }
  flex:1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .img_div{
    border-radius: 50%;
    img{
      height: 200px;
      width: 200px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .btn_sav{
    button{
      margin: 5px;
      position: relative;
      cursor: pointer;

      input{
        position: absolute;
        opacity: 0;
  
      }
    }
  }
}

@media(max-width: 770px){
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

`
