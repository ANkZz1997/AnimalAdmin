import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import URLS from '../../utils/urls'
import { configAxios } from '../../utils/https'
import cogoToast from 'cogo-toast'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import LoaderCSS from '../Loader'

export default function AssignCodes({role, toClose}) {
    const [list,setList] = useState([])
    const [selectAll,setSelectAll] = useState()
    const [allClicked,setAllClicked] = useState(false)
    const [loader,setLoader] = useState(true)

    const addAccessCodes = async(id)=>{
        try{
            const data = {
                roleId: role.id,
                accessCodeId: id,
            }
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.ASSIGN_ROLES_CODES}`,data,configAxios)
            // const newData = list.map((i)=>{
            //     if(i.id == id){
            //         return{ ...i ,checked:true}
            //         // return{ ...i ,checked:!i.checked}
            //     }else{
            //         return i
            //     }
            // })
            // cogoToast.success("Access Assigned")
            // setList(newData)
            setLoader(false);

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
            // const newData = list.map((i)=>{
            //     if(i.id == id){
            //         return{ ...i ,checked:false}
            //         // return{ ...i ,checked:!i.checked}
            //     }else{
            //         return i
            //     }
            // })
            // cogoToast.success("Access Removed")
            // setList(newData)
            setLoader(false);

        }catch(err){
            console.log(err)
        }

    }

    const codeList = async()=>{
        try{
          const res = await axios.get(`${URLS.EXCHANGE.ADMIN.GET_ACCESS_CODES}`,configAxios)
        //   console.log("gettingREsponseOfCodes",res.data?.data)

          if(res.data?.data){
            const newArr = res.data?.data.filter(({ code: id1 }) => !role.accessCodes.some(({ code: id2 }) => id2 == id1))

            const newOne = role.accessCodes.map((i)=>{
                    return {...i , checked:true}
            })
            const oldOne = newArr.map((i)=>{
                    return {...i , checked:false}
            })
            setList([...newOne ,...oldOne])
            setSelectAll([...newOne,...oldOne])
            setLoader(false);
          }
    
        }catch(err){
          console.log(err)
        }
      }

    const handleAddRemove = (val, id)=>{
        // val?addAccessCodes(id):removeAccessCodes(id)

        if(val){
            const updateAll = list.map((i)=>{
                if(i.id==id){
                    return {...i,checked:true};
                }else{
                    return {...i};
                }
            })
            setList([...updateAll])

        }else{
            const updateAll = list.map((i)=>{
                if(i.id==id){
                    return {...i,checked:false}
                }else{
                    return i;
                }
            })
            setList([...updateAll])
        }
    }

    const handleAll = () => {
        setAllClicked(!allClicked)
        if(allClicked){
            const updateAll = selectAll.map((i)=>{
                // addAccessCodes(i?.id)
                console.log("list11",{...i,checked:true})
                return {...i,checked:true}
            })
            setList([...updateAll])
            // setSelectAll([...updateAll])
        }else{
            const updateAll = selectAll.map((i)=>{
                // removeAccessCodes(i?.id)
                console.log("list12",{...i,checked:false})

                return {...i,checked:false}
            })
            setList([...updateAll])
            // setSelectAll([...updateAll])
        }
    }

    const handleSaveData = () =>{
        const forApi = list.map((i)=>{
            if(i?.checked){
                addAccessCodes(i.id)
                // toClose(false);
                // return i.id
            }else{
                removeAccessCodes(i.id)
                // toClose(false);
                // return "false"
            }
        })
        console.log("forApi",forApi)
        cogoToast.success("Changes Saved Successfully")
        toClose(false);

    }

    useEffect(()=>{
        setLoader(true);
        codeList()
    },[role])

    console.log('list',list)
    

  return (
   <Root>
        <div className='main_child'>
            <h2>Assign access codes to Role : {role.name}</h2>
            <button className='cls_btn' onClick={()=>{toClose(false)}}><AiOutlineCloseCircle/></button>
        </div>
        <div className='save_btn'>
        <h3>List Of Codes</h3>
        <button onClick={()=>{handleSaveData()}}>Save Changes</button>
        </div>
        <div className='code_list'>
            {loader? <LoaderCSS/> :
            <table>
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th className='btn_th'>
                        <button onClick={()=>{handleAll()}}>Select All</button>
                    </th>
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
                            <button className={i.checked ? "add_btn":"rvm_btn"} onClick={()=>{handleAddRemove(!i.checked, i.id)}}>
                            </button>
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
    background: #060d31;
    height: 90%;
    margin: auto;
    width: 80%;
    position: relative;
    border: 1px solid;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    *::-webkit-scrollbar {
  display: none;
}

.main_child{
    padding: 20px;
    h3{
        margin-top: 20px;
    }

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

.save_btn{
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
    button{
        padding:8px 5px;
        border-radius: 5px;
    }   
}

.code_list{
  padding: 20px;
  height: 100%;
  overflow: scroll;

  table{
        margin-top: 10px;
        width: 100%;
        text-align: left;
        border: 1px solid;
        border-collapse: collapse;
    }
    td,th{
        border: none !important;
    }

    tr,thead{
        border: 1px solid;
    }

    td,th{
        padding: 5px;
    }
}

.btn_th{
    button{
        width: 75px;
        padding: 2px;
        /* background-color: red; */
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
