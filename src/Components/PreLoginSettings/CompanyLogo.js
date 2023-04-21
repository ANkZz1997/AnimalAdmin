import React from 'react'
import URLS from '../../utils/urls'
import axios from 'axios'
import { PreLoginCSs } from './PreLoginCss'
import { useState } from 'react'

export default function CompanyLogo({nextPage}) {

    const[inputFile,setInputFile] = useState([])
    const[title, setTitle] = useState();
 
    const AddNameLogo = async(name,logo)=>{
        let Data = new FormData();
        Data.append("platformTitle",name)
        Data.append("logo",logo)

        try{
            const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_PLATFORM_DETAILS}`,Data)
            nextPage();
        }catch(error){
            console.log(error)
        }
    }

    console.log("title",title,inputFile[0])
  return (
    <PreLoginCSs>
        <div className='main_body'>
            <h1>Fill Company Details</h1>
            <div className='child3'>
            <h3>Add Title :<input onChange={(e)=>{setTitle(e.target.value)}}></input></h3>
            <div className='comp_logo'>
                <div>
                    {inputFile[0]?<img className='preview_img' src={URL.createObjectURL(inputFile[0])} />:
                    <h2 className='preview_img1'>Click To Choose Logo</h2>}
                    <input className='input_file' type="file" onChange={(e) => {setInputFile(e.target.files) }}/>
                </div>

            </div>
                <button className={inputFile[0] && title? "btn" : "perr no"} onClick={()=>{AddNameLogo(title,inputFile[0])}}>Save & Next</button>
            </div>
        </div>
    </PreLoginCSs>
  )
}
