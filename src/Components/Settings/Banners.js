import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ImCross} from 'react-icons/im'
import ConfirmDialogue from '../Model/ConfirmDialogue';


function Banners() {
    const [inputFile,setInputFile] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [deleteBanner , setDeleteBanner] = useState(false)
    const [btnState , setBtnState] = useState(true)
    const [saveBanner,setSaveBanner] = useState(false);

    const handleApi =()=>{
       console.log('handle api code ---------- ')
    }

    useEffect(() => {
      if(inputFile[0]){
        console.log("input file", inputFile ,  URL.createObjectURL(inputFile[0]))
      }
    }, [inputFile])
    
  return (
    <Root>
        {/* <div> <h1>Add Banners</h1></div> */}
        <ConfirmDialogue  show={saveBanner} handleClick={(e)=>{setSaveBanner(e)}}>
             <h1>Confirm To Save This Banner</h1>
             <button className='btns2' onClick={()=>{handleApi();setSaveBanner(!saveBanner) } }>Yes</button> 
             <button className='btns2' onClick={()=>{setSaveBanner(!saveBanner)}}>No</button>
        </ConfirmDialogue>
        
        <ConfirmDialogue  show={deleteBanner} handleClick={(e)=>{setDeleteBanner(e)}}>
             <h1>Confirm To Delete Banner</h1>
             <p>Do you really want to Delete this banner?</p>
             <button className='btns2' onClick={()=>{handleApi();setDeleteBanner(!deleteBanner) } }>Yes</button> 
             <button className='btns2' onClick={()=>{setDeleteBanner(!deleteBanner)}}>No</button>
        </ConfirmDialogue>

        <ConfirmDialogue show={toggle} handleClick={(e)=>{setToggle(e)}}>
             <h1>Confirm To {btnState ? 'Enable' : 'Disable'} Banner</h1>
             <p>Do you really want to {btnState ? 'Enable' : 'Disable'} this banner?</p>
             <button className='btns2' onClick={()=>{handleApi();setBtnState(!btnState);setToggle(!toggle) } }>Yes</button> 
             <button className='btns2' onClick={()=>{handleApi();setToggle(!toggle)}}>No</button>
        </ConfirmDialogue>

        <div className='banner_body'>

            <div className='add_banner_section'>
                <div className='fill_details'>
                <h1>Add New Banner</h1>
                    <h3>Upload Banner</h3>
                    <div className='input_file_div'>
                        <input className='input_file' type="file" onChange={(e)=>{setInputFile(e.target.files)}}/>
                        
                        <p>Click To Select Banner</p>
                    </div>
                 
                    <h3>Add Title</h3>
                    <input className='input_title' type="text"/>
                    <h3>Add Description</h3>
                    <textarea maxLength="200" className='input_description' type="text"/>

                    <button onClick={()=>{setSaveBanner(true)}}>Confirm</button>
                </div>
                <div className='img_preview'>
                    <h5>Preview Image Here</h5>
                    <div className='img_div'>
                    {/* <img className='img' src='https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'/> */}
                    {inputFile[0] ? <img className='img' src={URL.createObjectURL(inputFile[0])}/> : <img className='img' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/> }
                    
                    </div>
                </div>
            
            </div>

            <div className='banners_list_div'>
                <h1>Active Banners</h1>
                <div className='banners_list'>
                    <div className='banner_img'>
                        <button onClick={()=>{setDeleteBanner(!deleteBanner)}}><ImCross/></button>
                        <div className={btnState?"toggle":"toggle off"} onClick={()=>{setToggle(true) }}>
                            <div className='toggle_child'>
                            </div>
                        </div>
                        <img className='img2' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/>
                    </div>
                    <div className='banner_img'>
                        <button><ImCross/></button>

                        <img className='img2' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/>
                    </div>
                    <div className='banner_img'>
                        <button><ImCross/></button>

                        <img className='img2' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/>
                    </div>
                    <div className='banner_img'>
                        <button><ImCross/></button>

                        <img className='img2' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/>
                    </div>
                    <div className='banner_img'>
                        <button><ImCross/></button>

                        <img className='img2' src = 'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg'/>
                    </div>
                </div>
            </div>

        </div>

    </Root>
  )
}

export default Banners

const Root = styled.section `
color: whitesmoke;

.banner_body{
    /* border: 2px solid white; */
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    /* position: relative; */
    .add_banner_section{
        /* border: 2px solid white; */
        /* padding: 10px; */
        display: flex;

        .fill_details{
            flex:1;
            padding: 10px;

            h3{
                margin: 5px 0px 5px 0px;
            }

            button{
                padding: 5px;
                border-radius: 5px;
            }

            .input_file_div{
                border: 2px solid grey;
                position: relative;
                input.input_file{
                /* border: none; */
                width: 100%;
                height: 50px;
                opacity: 0;
                z-index:1;
                position: relative;
                cursor: pointer;
            }

            p{
                position: absolute;
                top: 30%;
                right: 0%;
                /* transform: translate(-50%, -50%); */
                z-index:0;
                cursor: pointer;
                width: 100%;
                display: flex;
                justify-content: center;

            }
            }
           

            input.input_title{
                border: 1px solid grey;
                background-color: #070c27;
                width: 100%;
                color: whitesmoke;
                padding: 5px;

            }
            textarea.input_description{
                border: 1px solid grey;
                background-color: #070c27;
                width: 100%;
                color: whitesmoke;
                padding: 5px;
                resize: none;
            }
            
        }

        .img_preview{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            /* height: 100%; */

            h5{
                margin:0;
                padding:0;
            }

            .img_div{
                border: 2px solid grey;
                padding: 5px;
                .img{
                    height: 250px;
                    width: 250px;
                    object-fit: cover;
                }
            }


        }

    }
    .banners_list_div{
       /* background-color: wheat; */
       padding: 10px;

       .banners_list{
        border: 2px solid grey;
        padding: 10px 5px 10px 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;

        .banner_img{
            padding: 10px;
            position: relative;
            .img2{
                height : 300px;
                width: 300px;
            }
            button{
                position: absolute;
                right: 0;
                margin-right: 8px;
                margin-top: -6px;
                border-radius: 50%;
                border: none;
                padding: 5px;
            }

            .toggle{
                background-color: gray;
                height: 25px;
                width: 40px;
                display: flex;
                justify-content: left;
                border-radius: 15px;
                overflow: hidden;
                position: absolute;
                left: 0;
                margin-left: 7px;
                margin-top: -6px;
            }
            .toggle.off{
                background-color: #2196F3;
                justify-content: right
            }
            .toggle_child{
                    background: white;
                    width: 55%;
                    height: 100%;
                    border-radius: 50%;
                }
            

        }

       }

    }
}

`