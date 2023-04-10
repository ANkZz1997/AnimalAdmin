import React, { useEffect, useState } from 'react'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https'
import styled from 'styled-components'
import axios from 'axios'


export default function AccessCodes() {

  const [codeDes,setCodeDes] = useState({
    code:"",
    description:""
  })
  const [list,setList] = useState([])



  const postAccess = async()=>{
    const data = codeDes;
    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_ACCESS_CODE}`,data,configAxios)
      console.log("gettingREsres", res)
      setCodeDes({
        code:"",
        description:""
      })
      codeList();
      
    }catch(err){
      console.log(err)
    }

  }

  const codeList = async()=>{
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ACCESS_CODES}`,configAxios)
      console.log("gettingREsponseOfCodes",res.data?.data)
      setList(res.data?.data)

    }catch(err){
      console.log(err)

    }
  }

  const keyPressed = (e) => {
    if (e.key === 'Enter') {
      postAccess();
    }
  };

  const handleInput = (type,val)=>{
    const newData = {...codeDes,[type]:val};
    setCodeDes(newData);
  }

  useEffect(()=>{
    codeList()
  },[])

  console.log("codeDescodeDes",codeDes)


  return (
    <Root>
        <h1>Add Access Codes</h1>
        <div className='create_codes'>

            <h1>Create a new role</h1>
            <div className='main_child'>
                <div className='code_div'>
                    <h3>Access Code</h3> 
                    <input value={codeDes.code} onChange={(e)=>{handleInput('code',e.target.value)}} onKeyPress={keyPressed}/>
                </div>
                <div className='desc_div'>
                    <h3>Access Description</h3>
                    <textarea value={codeDes.description} onChange={(e)=>{handleInput('description',e.target.value)}} onKeyPress={keyPressed}/>
                </div>
            </div>
                <button className={codeDes.code && codeDes.description? "btn":"btn no"} onClick={()=>{postAccess()}}>Save</button>
        </div>

        <div className='code_list'>
          <h3>List Of Codes</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i,ix)=>{
                return(
                  <tr key={ix}>
                    <td>{ix+1}</td>
                    <td>{i.code}</td>
                    <td>{i.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
    </Root>
  )
}

const Root = styled.section`

.create_codes{
    .main_child{
        display: flex;
        gap: 20px;
        .code_div{
            width: 50%;
            display: flex;
            gap: 10px;
            flex-direction: column;
        }
        .desc_div{
            width: 100%;
            display: flex;
            gap: 10px;
            flex-direction: column;
        }
    }
}

.code_list{
  margin-top: 20px;
  padding: 10px;
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
    /* resize: none; */
}
textarea{
  background: #070c27;
  color: white;
  resize: none;
  height: 30px;
  padding: 5px;
}

`
