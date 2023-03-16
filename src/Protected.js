import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

function Protected({ children }) {
  const userCheck = useSelector((state)=>state?.persistReducer?.isUser)
  const token = localStorage.getItem("token")
  const navigate = useNavigate()


  
if (userCheck && token) {
        return children
      // return <Navigate to="/login" replace />
       }else{
        navigate("/login")
       }
//  return children
}
export default Protected