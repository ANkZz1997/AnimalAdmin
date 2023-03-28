import React from 'react'
import { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import { codes } from '../../utils/codes'

export default function RouteCodes() {

    const[checked,setChecked] = useState()
    const[checkedItem,setCheckedItem] = useState()
    const[codeList,setCodeList] = useState(codes)

    const handleParentClick =(e)=>{
        console.log("e ------------ ",e)
        const newObj = codeList.map((i)=> {
            if(i.secretCode == e){
                return {...i , isCheck : !i.isCheck}
                
            }
            else{
               return i
            }
        })
        setCodeList(newObj)

    }

    const handleChildClick = (accessCode,child)=>{
        console.log('handleChildClick',accessCode,child)
        const newObjs = codeList.map((i)=> {
            if(i.secretCode == child){
                const childObj = i.child.map((x)=>{
                    if(x.accessCode == accessCode){
                        return {...x , isCheck : !x.isCheck}
                    }else{
                        return x
                    }
                })
                return {...i,child : childObj}
            }
            else{
               return i
            }
        })
        setCodeList(newObjs)

    }

    console.log('checked--checkedItem',checked,checkedItem)
    console.log("codeList",codeList)

    
  return (
    <Root>
            {codeList?.map((i,ix)=>{
                return(
      <table key={ix}>
            <thead>
                <tr>
                    <th>{i.name}</th>
                    <th>{i.secretCode}</th>
                    <th>{i.isCheck?"True":"False"}</th>
                    {/* <th>Access  */}
                        <button value={i.secretCode} onClick={(e)=>{handleParentClick(e.target.value)}} className={i.isCheck ? 'checkbox on' : 'checkbox'}>ppp</button>
                    {/* </th> */}
                </tr>
            </thead>
                <tbody>
                    {i?.child?.map((j,jx)=>{
                        return(
                            <tr key={jx}>
                                <td>{j.accessName}</td>
                                <td>{j.accessCode}</td>
                                <td>{j.isCheck?"True":"False"}</td>
                                <td>
                                    <button className={j.isCheck ? 'checkbox on' : 'checkbox'} onClick={()=>{handleChildClick(j.accessCode,i.secretCode)}}></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
      </table>
                )
            })}
        
    </Root>
  )
}

const Root = styled.section`

color: white;
padding: 20px;

table{
    width: 100%;
    text-align: left;
    td{
        width:25%;
    }

}

.checkbox {
    height: 20px;
    width: 20px;
    background: white;
}
.checkbox.on{
    background:green;
}


`
