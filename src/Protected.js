import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
  const userCheck = useSelector((state)=>state?.persistReducer?.isUser)
  const token = localStorage.getItem("token")

  
if (userCheck && token) {
        return children
      // return <Navigate to="/login" replace />
       }else{
        window.location.replace("/login")
       }
//  return children
}
export default Protected