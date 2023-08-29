import React, { useEffect, useState } from 'react'
import URLS from '../../../utils/urls'
import styled from 'styled-components'
import axios from 'axios'
import LoaderCSS from '../../Loader'


export default function AccessCodes() {

  const [codeDes,setCodeDes] = useState({
    code:"",
    description:""
  })
  const [list,setList] = useState([])
  const [loader,setLoader] = useState(true)

  const postAccess = async()=>{
    const data = codeDes;
    try{
      const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_ACCESS_CODE}`,data)
      console.log("gettingREsres", res)
      setCodeDes({
        code:"",
        description:""
      })
      codeList();
      setLoader(false);
      
    }catch(err){
      console.log(err)
    }

  }

  const codeList = async()=>{
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ACCESS_CODES}`)
      console.log("gettingREsponseOfCodes",res.data?.data)
      setList(res.data?.data);
      setLoader(false);


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
    setLoader(true);
    codeList()
  },[])

  console.log("loader",loader)


  return (
    <Root>
        <div className='create_codes'>
          <h3>Add Access Codes</h3>
            {/* <h3>Create a new role</h3> */}
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
          {loader? <LoaderCSS/> :

            <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {list && list.map((i,ix)=>{
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
          
          }
        

        </div>
    </Root>
  )
}

const Root = styled.section`

*:focus{
  outline: none;
}

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
padding: 20px;
border: 1px solid;

.create_codes{
  display: flex;
  flex-direction: column;
  gap: 10px;
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
            textarea{
              border: 0.5px solid white;
            }
        }

        @media(max-width: 500px){
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
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
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
