import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
    const handleSignUp = (e) => {
        e.preventDefault()
        const signUpData = {
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            email_address: e.target.emailAddress.value,
            password: e.target.password.value,
            confirm_password: e.target.confirmPassword.value,
        }
        axios.post("/authentication_api/sign_up", signUpData)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    return (
        <div className='bg-[#E8E8E8] h-screen flex justify-center items-center'>
            <form onSubmit={handleSignUp} className='bg-white w-[600px] shadow-lg py-[30px] rounded-2xl flex justify-center items-center flex-col'>
                <img src="https://logify.au/assets/logo-x1DR2QCW.png" alt="" />

                <div className='flex flex-col w-3/5 mb-4'>
                    <label htmlFor="firstName">First name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='firstName' name='firstName' placeholder='First name' type="text" />
                </div>
                <div className='flex flex-col w-3/5 mb-4'>
                    <label htmlFor="">Last name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='lastName' name='lastName' placeholder='Last name' type="text" />
                </div>
                <div className='flex flex-col w-3/5 mb-4'>
                    <label htmlFor="">Email address</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='emailAddress' name='emailAddress' placeholder='Email address' type="text" />
                </div>
                <div className='flex flex-col w-3/5 mb-4'>
                    <label htmlFor="">Password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='password' name='password' placeholder='Password' type="password" />
                </div>
                <div className='flex flex-col w-3/5 mb-4'>
                    <label htmlFor="">Confirm password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='confirmPassword' name='confirmPassword' placeholder='Confirm password' type="password" />
                </div>
                <button className='bg-primary text-white py-[10px] px-12 rounded-xl font-bold mt-6'>Signup</button>
                <p className='text-[#b5b4b4] mt-8'>Already have an account? <Link to={`/login`} className='hover:cursor-pointer hover:underline hover:text-[#959595]'>Login</Link></p>
            </form>
        </div>
    )
}
