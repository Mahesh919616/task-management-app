import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const Register = () => {

    const navigate = useNavigate();
    const userDetails = {
        username: "",
        password: ""
    }

    const [data, setData] = useState(userDetails);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowHidePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData({...data, [name]:value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const getData = JSON.parse(localStorage.getItem("user") || "[]")
        let tempArr = []
        let isUserExist = false
        tempArr = [...getData]
        tempArr.forEach((el, index) => {
            if(el.username === data.username){
                isUserExist = true
            }
        })
        if(isUserExist){
            toast.error(`Entered username already exists`, {position: 'top-right'})
        } else {
            tempArr.push(data)
            localStorage.setItem("user", JSON.stringify(tempArr))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User registered successfully",
                showConfirmButton: false,
                timer: 2000
            });
            setTimeout(() => {
                navigate("/");
            }, 1500);
        }
    }

    return (
        <>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-1/2 bg-white rounded-md p-3'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Register</h2>
                        <div className='mb-2'>
                            <label htmlFor="username" className='text-md text-gray-800 font-semibold'>Username</label><br></br>
                            <input type="text" name="username" placeholder='Enter Username' required autoComplete='off' minLength={4} maxLength={20}
                            className='w-full px-3 py-2 border-2 rounded-md mt-1' onChange={(e) => handleInput(e)} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="password" className='text-md text-gray-800 font-semibold'>Password</label><br></br>
                            <div className='flex relative justify-end items-center'>
                                <input type={ showPassword ? "text" : "password"} name="password" placeholder='Enter Password' required autoComplete='off'
                                className='w-full px-3 py-2 border-2 rounded-md mt-1' minLength={4} maxLength={20} onChange={(e) => handleInput(e)} />
                                {
                                    showPassword ? <span className='absolute mr-2 cursor-pointer' onClick={() => toggleShowHidePassword()}><BiShow /></span>
                                    : <span className='absolute mr-2 cursor-pointer' onClick={() => toggleShowHidePassword()}><BiHide /></span>
                                }
                            </div>
                        </div>
                        <button className='text-md text-white font-semibold bg-green-700 px-8 py-2 rounded-md hover:bg-green-900 mt-2'>Submit</button>
                    </form>
                    <p className='font-medium pt-1'>Already registered? Please <Link to='/' className='text-blue-500 hover:text-blue-700'>Login Here</Link></p>
                </div>
            </div>
        </>
    )
}

export default Register