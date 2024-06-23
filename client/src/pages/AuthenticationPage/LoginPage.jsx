import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNotify } from "../../hooks/useNotify"
import logo from "../../assets/logo.jpg"

export default function LoginPage() {

    const handleLogin = (e) => {
        e.preventDefault()
        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post("/authentication_api/login", loginData)
            .then(response => {
                if (response.status == 200) {
                    useNotify("Logged In Successfully", "success")
                    window.location.href = 'http://localhost:5173/projects'
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='bg-[#E8E8E8] h-screen flex justify-center items-center'>
            <form onSubmit={handleLogin} className='bg-white w-[500px] shadow-lg py-[70px] rounded-2xl flex justify-center items-center flex-col'>
                <img className='w-32 mb-4' src={logo} alt="" />
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="email">Email</label>
                    <input className='border mt-1 p-2 rounded border-[#E8E8E8]' id='email' name='email' placeholder='Email' type="email" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="password">Password</label>
                    <input className='border mt-1 p-2 rounded border-[#E8E8E8]' id='password' name='password' placeholder='Password' type="password" />
                </div>
                <button className='bg-primary text-white py-[10px] px-12 rounded-xl font-bold mt-6'>Login</button>
                <Link to={`/sign-up`} className='text-[#b5b4b4] hover:underline mt-4 hover:cursor-pointer  hover:text-[#959595]'>Create a new account</Link>
            </form>
        </div>
    )
}
