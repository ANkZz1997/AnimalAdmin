import React from 'react'
import styled from 'styled-components'

function Banners() {
  return (
    <Root>
        <div> <h1>Add Banners</h1></div>

        <div className='banner_body'>

            <div className='add_banner_section'>
                <div className='fill_details'>
                <h1>Add New Banner</h1>
                    <h3>Upload Banner</h3>
                    <div className='input_file_div'>
                        <input className='input_file' type="file"/>
                        <p>Click To Select New File For Banner</p>
                    </div>
                 
                    <h3>Add Title</h3>
                    <input className='input_title' type="text"/>
                    <h3>Add Description</h3>
                    <textarea maxLength="200" className='input_description' type="text"/>
                </div>
                <div className='img_preview'>
                    <h5>Preview Image Here</h5>
                    <div className='img_div'>
                    <img className='img' src='https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'/>
                    </div>

                </div>
            
            </div>

            <div className='banners_list'>
                <h1>Active Banners</h1>

            </div>

        </div>

    </Root>
  )
}

export default Banners

const Root = styled.section `
color: whitesmoke;

.banner_body{
    border: 2px solid white;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    .add_banner_section{
        border: 2px solid white;
        /* padding: 10px; */
        display: flex;

        .fill_details{
            flex:1;
            padding: 10px;
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
                top: 50%;
                right: 0%;
                transform: translate(-50%, -50%);
                z-index:0;
                cursor: pointer;

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
                    height: 200px;
                    width: 200px;
                    object-fit: cover;
                }
            }


        }

    }
    .banners_list{
        border: 2px solid white;
        /* padding: 10px; */
    }
}

`