import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ImCross} from 'react-icons/im'


function Banners() {
    const [inputFile,setInputFile] = useState([]);

    const [warnActive,setWarnActive] = useState(false)

    useEffect(() => {
      if(inputFile[0]){
        console.log("input file", inputFile ,  URL.createObjectURL(inputFile[0]))
      }
    }, [inputFile])
    
   

  return (
    <Root>
        {/* <div> <h1>Add Banners</h1></div> */}

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

                    <button>Confirm</button>
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
                        <button onClick={()=>{setWarnActive(true)}}><ImCross/></button>
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

            <div className={warnActive?"warning_popup":"warning_popup_cls"}>

                <div className='warning_div'>
                    <h1>Confirm To Remove Banner</h1>
                    <h5>Do you really want to remove this banner?</h5>
                    <button onClick={()=>{setWarnActive(false)}}>Yes</button> 
                    <button onClick={()=>{setWarnActive(false)}}>No</button>
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

    .warning_popup{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 9999;
        backdrop-filter: blur(3px);
        justify-content: center;
        align-items: center;

        .warning_div{
            background-color: white;
            padding: 20px;
            border-radius: 20px;
            color: black;


            button{
                padding: 8px;
                border-radius: 5px;
                margin: 5px;
                border: none;
                background-color: #865b5b;
                width: 50px;
                :hover{
                    background-color: darkgray;
                }
            }
            h5{
                padding: 2px;
                margin: 5px;
            }
        }
    }
    .warning_popup_cls{
        display: none;
    }

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
                margin-top: -4px;
            }
        }

       }

    }
}

`