import React from 'react'
import { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import { codes } from '../../utils/codes'

export default function RouteCodes() {

    const[codeList,setCodeList] = useState(codes)

    const handleParentClick =(e)=>{
        console.log("e ------------ ",e)
        const newObj = codeList.map((i)=> {
            if(i.secretCode == e){
                const newChild = i.child.map((j)=>{
                   return {...j,isCheck:!j.isCheck}
                    // handleChildClick(j.accessCode,i.secretCode);
                })
                // console.log("newChild",newChild)
                const obj = newChild.map((f)=>{
                    return f.isCheck?"true":"false";
                });
                // console.log("newChild",obj)
                if(obj.includes("true")){
                    return {...i , isCheck : true, child: newChild}
                }else{
                    return {...i , isCheck : false, child: newChild}
                }
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
                // console.log("child update",childObj)
                const checkChild = childObj.map((k)=>{
                    return k.isCheck?"true":"false";
                })
                // console.log("checkChild",checkChild.includes("true"));
                if(checkChild.includes("true")){
                    return{...i,isCheck:true,child: childObj}
                }else{
                    return {...i,isCheck:false,child : childObj}
                };
            }
            else{
               return i
            }
        })
        setCodeList(newObjs)
    }

console.log("codeList",codeList)
    
  return (
    <Root>
        <h2>Create New Role</h2>
        <div className='create_parent'>
            <div className='create_child'>
                <h3>Create Role :</h3> 
                <input/>
                <button>Save</button>
            </div>

        </div>
            {codeList?.map((i,ix)=>{
                return(
                    <div className='access_parent'>
                        <div className='heading'>
                            <h4>{i.name}</h4>
                            <button onClick={()=>{handleParentClick(i.secretCode)}} 
                                className={i.isCheck ? 'checkbox on' : 'checkbox'}>
                            </button>
                        </div>
                        <div className='access_child'>
                            {i?.child?.map((j,jx)=>{
                                return(
                                    <div className='child' key={jx}>
                                        <button className={j.isCheck ? 'checkbox on' : 'checkbox'} 
                                            onClick={()=>{handleChildClick(j.accessCode,i.secretCode)}}>
                                        </button>
                                        <h5>{j.accessName}</h5>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        
    </Root>
  )
}

const Root = styled.section`
 h5,h4{
        margin: 0;
    }
*:focus {
    outline: 0 !important;
    }

color: white;
padding: 20px;

.create_parent{

    padding: 10px 0;

    .create_child{
        display: flex;
        gap: 20px;
        align-items: center;

        input{
            height: 30px;
            background: #070c27;
            border: 0.5px solid white;
            color: white;
            padding: 0 5px;
            font-size: 16px;
        }

        button{
            padding: 5px;
            height: 30px;
            border-radius: 5px;
        }
    }
}

.access_parent{
    padding: 15px;
    border: 2px solid;
    margin-top: 5px;
    .heading{
        display: flex;
        gap: 5px;
    }
    
    .access_child{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        margin-top: 10px;
    
        .child{
            display: flex;
            gap: 5px;
            align-items: center;
        }
    }
}


.checkbox {
    height: 16px;
    width: 16px;
    background: white;
    border: none;
 
}
.checkbox.on{
    background:green;
}

`
