import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import URLS from '../../utils/urls';
import axios from 'axios';
import { configAxios } from '../../utils/https';
import cogoToast from "cogo-toast";
import moment from 'moment';
import AssignCodes from './AssignCodes';
import LoaderCSS from '../Loader';



export default function CreateRoles() {

    const [getRoles,setGetRoles] = useState([]);
    const [roleId,setRoleId] = useState();
    const [roleName, setRoleName] = useState();
    const [dialogBox, setDialogBox] = useState(false);
    const [loader, setLoader] = useState(true);

    const [postRole,setPostRole]= useState({
        name : '',
        code :''
    })

    const PostRoles = async () =>{
        const data = postRole
        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_ROLES}`,data,configAxios)
            console.log("abccc roleRESRES ------",res.status)
            setPostRole({
                name : '',
                code :''
            })
            AllRoles();
            cogoToast.success("Code Added Successfully")

        }catch(err){
            if(err.response.data.message.code == "E_UNIQUE"){
                cogoToast.warn("Please Enter Unique Code & Name")
            }
            
        }
    }

    const AllRoles = async()=>{
        try{
            const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ROLES}`,configAxios)
            console.log("resresres",res.data?.data)
            setGetRoles(res.data?.data?.reverse())
            setLoader(false)


        }catch(err){
            console.log(err)
        }
    }

    const handleInput =(type,val)=>{
        const newData = {...postRole, [type] : val}
        setPostRole(newData)
    }

    const keyPressed = (e) => {
        if (e.key === 'Enter') {
            PostRoles();
        }
      };
    const handleClick = (id, name)=>{
        console.log("xxxxxx",id, name)
        setRoleId(id);
        setRoleName(name);
        setDialogBox(true);
    }

    useEffect(()=>{
        setLoader(true)
        AllRoles()
    },[])

console.log('roleId',roleId,roleName,dialogBox)
  return (
    <Root>
        <div className='create_role'>

            <h1>Create a new role</h1>
            <div className='main_child'>
                <div>
                    <h3>Role Name</h3> 
                    <input value={postRole.name} onChange={(e)=>{handleInput('name',e.target.value)}} onKeyPress={keyPressed}/>
                </div>
                <div>
                    <h3>Role Code</h3>
                    <input value={postRole.code} onChange={(e)=>{handleInput('code',e.target.value)}} onKeyPress={keyPressed}/>
                </div>
            </div>
                <button className={postRole.name && postRole.code? "btn":"btn no"} onClick={()=>{PostRoles()}}>Save</button>
        </div>
        <div className='child'>
            <h3>All Active Roles</h3>
            {loader? <LoaderCSS/> :
              <table>
              <thead>
                  <tr>
                      <th>S.No</th>
                      <th>Role Name</th>
                      <th>Role Code</th>
                      <th>Created On</th>
                      <th>Updated On</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {getRoles?.map((i,ix)=>{
                      return(
                          <tr key={ix}>
                              <td>{ix+1}</td>
                              <td>{i?.name}</td>
                              <td>{i?.code}</td>
                              <td>{`${moment(i?.createdAt,).format('DD-MMM-YY')}`}</td>
                              <td>{`${moment(i?.updatedAt,).format('DD-MMM-YY')}`}</td>
                              <td className='btn_td'>
                              <button className='btn_tbl' onClick={()=>handleClick(i?.id, i?.name)} >Click</button>
                              {roleId == i?.id && <div className={dialogBox?"dialog_box": "dialog_box no"}>
                                  <AssignCodes role ={i} toClose = {(e)=>{setDialogBox(e);AllRoles()}}/>
                              </div>}
                              
                              </td>
                          </tr>
                      )
                  })}
              </tbody>
          </table>
            }
          
        </div>

      

    </Root>
  )
}


const Root = styled.section`

*{
    padding:0;
    margin:0;
}

*:focus {
  outline: none;
}

padding: 10px;
display: flex;
flex-direction: column;
gap: 20px;

.create_role{
    .main_child{
        display: flex;
        gap: 20px;
        >div{
            width: 100%;
            display: flex;
            gap: 10px;
            flex-direction: column;
        }
    }
}

.child{
    table{
        margin-top: 10px;
        width: 100%;
        text-align: left;
        border: 1px solid;
        border-collapse: collapse;
    }

    tr,thead,td,th{
        border: 1px solid;
    }

    td,th{
        padding: 5px;
    }

    .btn_tbl{
        height: 100%;
        width: 100%;
    }

}

    .btn{
            padding: 5px;
            height: 30px;
            width: 50px;
            margin-top: 10px
        }
    .btn.no{
        display: none;
    }

    input{
        height: 30px;
        background: #070c27;
        border: 0.5px solid white;
        color: white;
        padding: 0 5px;
        font-size: 16px;
        width: 100%;
    }

    .dialog_box{
        height: 100%;
        position: fixed;
        width: 100%;
        top: 0px;
        left: 0;
        z-index: 999;
        backdrop-filter: blur(3px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dialog_box.no{
        display: none;
    }


`