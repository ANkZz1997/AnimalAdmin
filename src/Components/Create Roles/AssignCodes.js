import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https'
import cogoToast from 'cogo-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function AssignCodes({role, toClose}) {
    const [list,setList] = useState([])

    const addAccessCodes = async(id)=>{
        try{
            const data = {
                roleId: role.id,
                accessCodeId: id,
            }
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ASSIGN_ROLES_CODES}`,data,configAxios)
            const newData = list.map((i)=>{
                if(i.id == id){
                    return{ ...i ,checked:!i.checked}
                }else{
                    return i
                }
            })
            cogoToast.success("Code Assigned")
            setList(newData)

        }catch(err){
            console.log(err)
        }

    }

    const removeAccessCodes = async(id)=>{
        try{
            const data = {
                roleId: role.id,
                accessCodeId: id,
            }
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.REMOVE_ROLES_CODES}`,data,configAxios)
            const newData = list.map((i)=>{
                if(i.id == id){
                    return{ ...i ,checked:!i.checked}
                }else{
                    return i
                }
            })
            cogoToast.success("Code Removed")

            setList(newData)
        }catch(err){
            console.log(err)
        }

    }

    const codeList = async()=>{
        try{
          const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ACCESS_CODES}`,configAxios)
          console.log("gettingREsponseOfCodes",res.data?.data)

          if(res.data?.data){
            const newArr = res.data?.data.filter(({ code: id1 }) => !role.accessCodes.some(({ code: id2 }) => id2 == id1))

            const newOne = role.accessCodes.map((i)=>{
                    return {...i , checked:true}
            })
            const oldOne = newArr.map((i)=>{
                    return {...i , checked:false}
            })
            setList([...newOne ,...oldOne])

          }
    
        }catch(err){
          console.log(err)
        }
      }

    const handleAddRemove = (val, id)=>{
        val?addAccessCodes(id):removeAccessCodes(id)
    }

    useEffect(()=>{
        codeList()
    },[role])

    console.log('list',list)
    

  return (
   <Root>
        <div className='main_child'>
            <h2>Assign access codes to Role {role.name}</h2>
            <button className='cls_btn' onClick={()=>{toClose(false)}}><AiOutlineCloseCircle/></button>
        </div>

        <div className='code_list'>
          <h3>List Of Codes</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Code</th>
                <th>Description</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i,ix)=>{
                return(
                  <tr key={ix}>
                    <td>{ix+1}</td>
                    <td>{i.code}</td>
                    <td>{i.description}</td>
                    <td className='btn_td'>
                        <button className={i.checked ? "add_btn":"rvm_btn"} onClick={()=>{handleAddRemove(!i.checked, i.id)}}
                        >
                        </button></td>
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
    background: #060d31;
    height: 90%;
    margin: auto;
    width: 80%;
    position: relative;
    border: 1px solid;
    padding: 20px;
    border-radius: 20px;
    over

.main_child{
    padding: 10px;

    .cls_btn{
        position: absolute;
        right: 0;
        top:0;
        margin-right: 4px;
        margin-top: 2px;
        background-color: transparent;
        border: none;
        color: white;

        svg{
            font-size: 30px;
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


.btn_td{
    display: flex;
    justify-content: center;
    .add_btn{
        height: 20px;
        width: 20px;
        background: green
    }
    .rvm_btn{
        height: 20px;
        width: 20px
    }

 
}

`
