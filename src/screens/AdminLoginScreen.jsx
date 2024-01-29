import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import { adminSetCredentials } from '../slices/adminAuthSlice';
import Loader from '../component/Loader';
import {toast} from 'react-toastify'

const AdminLoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [ adminLogin, {isLoading}] = useAdminLoginMutation();
    const {adminInfo} = useSelector((state) => state.adminAuth)


    const handleRegisterClick = () => {
  
        navigate('/admin/register');
    };

    const submitHandler = async() =>{
        try {
            const res = await adminLogin({email,password}).unwrap()
            dispatch(adminSetCredentials({...res}));
            navigate('/admin')
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }


    useEffect(()=>{
        if(adminInfo){
          navigate('/admin')
        }
      },[navigate,adminInfo])

  return (
    <div className="flex flex-col items-center mt-2 min-h-screen bg-gray-100">
      <div className="w-full max-w-lg mt-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Login
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="mb-6">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isLoading  && <Loader />}
          <div className="flex items-center justify-center w-full mb-6">
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submitHandler}>
              Login
            </button>
          </div>
          <hr className="mb-6" />

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              New Admin ? <span className="font-bold cursor-pointer text-black-100" onClick={handleRegisterClick}>Register</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginScreen