import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup';
import URLS from '../../utils/urls';


export default function AddBanner({handleClick}) {

    const [inputFile, setInputFile] = useState([]);
    const [toggle, setToggle] = useState(false)
    const [deleteBanner, setDeleteBanner] = useState(false)
    const [btnState, setBtnState] = useState(true)
    const [saveBanner, setSaveBanner] = useState(false);
    const [imgError, setImgError] = useState("")
    const [formData, setFormData] = useState()

    const BannerSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(31, "Too Long!")
            .required('Required'),
        description: Yup.string()
            .min(2, "Too Short!")
            .max(100, "Too Long!")
            .required('Required'),
        link: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!')
    })
    const handleAddBanner = async (values, { resetForm }) => {
        const checkLink = (link)=>{
            let check = link.split('//')
            if(check[0] == 'https:'){
                return(check[1])
            }else{
                return check.join('//')
            }
        }
        if (values) {
            if (inputFile[0]) {
                console.log('handle api code ---------- ', values)
                const data = {
                    name: values.title,
                    description: values.description,
                    link: checkLink(values.link),
                    order: 1,
                    isActive: true,
                    image: inputFile[0]
                }
                try {
                    const axiosConfig = {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                    const res = await axios.post(`${URLS.EXCHANGE.ADMIN.POST_BANNERS}`, data, axiosConfig);
                    console.log("resresres", res)
                    handleClick(res.data)
                    resetForm();
                    setInputFile("")

                } catch (error) {
                    console.log(error)
                }
            } else {
                setImgError('Please Select Image ')
            }
        }
    }

    useEffect(() => {
        if (inputFile[0]) {
            setImgError('')
            console.log("input file", inputFile, URL.createObjectURL(inputFile[0]))
        }
    }, [inputFile])

    return (

        <Root>
            <div className='add_banner_section'>
                <div className='fill_details'>
                    <h3>Upload Banner *</h3>
                    <div className='input_file_div'>
                        <input className='input_file' type="file" onChange={(e) => { setInputFile(e.target.files) }} />
                        <p>Click To Select Banner</p>
                    </div>

                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            link: "",
                            order: "",
                            image: "",
                        }}
                        validationSchema={BannerSchema}
                        onSubmit={handleAddBanner}

                    >
                        {({ errors, touched }) => (
                            <Form >
                                <h3>Add Title *</h3>
                                <Field name="title" className='input_title' type="text" />
                                {errors.title && touched.title ? (
                                    <div className='error'>{errors.title}</div>
                                ) : null}
                                <h3>Add Link</h3>
                                <Field name="link" className='input_title' type="text" />
                                {errors.link && touched.link ? (
                                    <div className='error'>{errors.link}</div>
                                ) : null}
                                <h3>Add Order</h3>
                                <Field name="order" className='input_title' type="text" />

                                <h3>Add Description *</h3>
                                <Field name="description" className='input_description' component="textarea" type="text" />
                                {errors.description && touched.description ? (
                                    <div className='error'>{errors.description}</div>
                                ) : null}

                                <button type="submit">Confirm</button>

                            </Form>
                        )}

                    </Formik>
                </div>
                <div className='img_preview'>
                    <h5>Preview Image Here</h5>
                    <div className='img_div'>
                        {inputFile[0] ? <img className='img' src={URL.createObjectURL(inputFile[0])} /> : <h2 className='noimg'>No Image</h2>}
                    </div>
                    <div className='error'>{imgError}</div>
                </div>
            </div>

        </Root>
    )
}

const Root = styled.section`

.add_banner_section{
        /* border: 2px solid white; */
        /* padding: 10px; */
        display: flex;

        .fill_details{
            flex:1;
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

            .error{
                    color: red;
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
                .noimg{
                    height: 250px;
                    width: 250px;
                    /* text-align: center; */
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
              
            }
        }
        
        @media(max-width:762px){
            flex-direction: column-reverse;
        }
    }

`
