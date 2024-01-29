import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useAdminRegisterMutation } from '../slices/adminApiSlice';
import { adminSetCredentials } from '../slices/adminAuthSlice';
import Loader from '../component/Loader';
import {toast} from 'react-toastify'

const AdminRegisterScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword] =useState('')
    const [key,setKey] = useState('')

    const [adminRegister,{isLoading}] = useAdminRegisterMutation();
    const {adminInfo} = useSelector((state) =>state.adminAuth)

    useEffect(()=>{
        if(adminInfo){
            navigate('/admin')
        }
      },[navigate,adminInfo])


      const submitHandler = async()=>{
  
        if(password !== confirmPassword){
            toast.error('Password do not match')
        }else{
            try {
                const res = await adminRegister({name,email,password,key}).unwrap();
                dispatch(adminSetCredentials({...res}))
                navigate('/admin')
            } catch (err) {
                toast.error(err?.data?.message || err.error );
            }
        }
      }

      const handleLoginClick = () => {
        navigate('/admin/login');
      };
  return (
    <div className="flex flex-col items-center mt-2 min-h-screen bg-gray-100">
    <div className="w-full max-w-lg mt-20">
      <h1 className="text-4xl font-bold text-center mb-8">
        Register
      </h1>
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Name
          </label>
          <input
            type="text"
            id="name"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Password
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
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="key"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Key
          </label>
          <input
            type="password"
            id="key"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        {isLoading  && <Loader />}
        <div className="flex items-center justify-center w-full mb-6">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submitHandler} >
            Register
          </button>
        </div>
        <hr className="mb-6" />

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account ? <span className="font-bold cursor-pointer" onClick={handleLoginClick}>Login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminRegisterScreen