import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUpPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('invited_email');
    const id = urlParams.get('id');
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [inviteSignUpLoading, setInviteSignUpLoading] = useState(false)
    const [invitedEmailStatus, setInvitedEmailStatus] = useState(false)
    const [signUpEmailStatus, setSignUpemailStatus] = useState(false)

    const handleSignUp = (e) => {
        e.preventDefault()
        setSignUpLoading(true)
        const signUpData = {
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            email_address: e.target.emailAddress.value,
            password: e.target.password.value,
            confirm_password: e.target.confirmPassword.value,
        }
        axios.post("/authentication_api/sign_up", signUpData)
            .then((response) => {
                console.log(response)
                if (response.data.is_already_crated) {
                    setSignUpemailStatus(true)
                }
                else {
                    setSignUpemailStatus(false)
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/check-email`
                }
                setSignUpLoading(false)
            })
            .catch(error => console.log(error))
    }

    const handleInviteSignUp = (e) => {
        e.preventDefault()
        setInviteSignUpLoading(true)
        const signUpData = {
            admin_id: id,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            email_address: email,
            password: e.target.password.value,
            confirm_password: e.target.confirmPassword.value,
        }
        axios.put("/authentication_api/invited_user", signUpData)
            .then(response => {
                if (response.data.is_already_crated) {
                    setInvitedEmailStatus(true)
                }
                else {
                    setInvitedEmailStatus(false)
                    window.location.href = `${import.meta.env.VITE_CLIENT_URL}/check-email`
                }
                setSignUpLoading(false)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='bg-[#E8E8E8] h-screen flex justify-center items-center'>
            {!email && !id && <form onSubmit={handleSignUp} className='bg-white w-[600px] shadow-lg py-[30px] rounded-2xl flex justify-center items-center flex-col'>
                <img src="https://logify.au/assets/logo-x1DR2QCW.png" alt="" />

                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="firstName">First name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='firstName' name='firstName' placeholder='First name' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Last name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='lastName' name='lastName' placeholder='Last name' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Email address</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='emailAddress' name='emailAddress' placeholder='Email address' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='password' name='password' placeholder='Password' type="password" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Confirm password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='confirmPassword' name='confirmPassword' placeholder='Confirm password' type="password" />
                </div>
                {signUpEmailStatus && <p className='text-sm text-red-500'>An account with this email address already exists.</p>}
                <button disabled={signUpLoading} className={`${signUpLoading ? "bg-[#5c5c5c]" : "bg-primary"} text-white py-[10px] px-12 rounded-xl font-bold mt-3 md:mt-6 mb-6`}>Signup</button>
                <p className='text-[#b5b4b4] mt-3 md:mt-8'>Already have an account? <Link to={`/login`} className='hover:cursor-pointer hover:underline hover:text-[#959595]'>Login</Link></p>
            </form>}

            {email && id && <form onSubmit={handleInviteSignUp} className='bg-white w-[600px] shadow-lg py-[30px] rounded-2xl flex justify-center items-center flex-col'>
                <img src="https://logify.au/assets/logo-x1DR2QCW.png" alt="" />

                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="firstName">First name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='firstName' name='firstName' placeholder='First name' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Last name</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='lastName' name='lastName' placeholder='Last name' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Email address</label>
                    <input required value={email} className='border mt-1 p-2 rounded border-[#E8E8E8]' id='emailAddress' name='emailAddress' placeholder='Email address' type="text" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='password' name='password' placeholder='Password' type="password" />
                </div>
                <div className='flex flex-col w-4/5 md:w-3/5 mb-4'>
                    <label htmlFor="">Confirm password</label>
                    <input required className='border mt-1 p-2 rounded border-[#E8E8E8]' id='confirmPassword' name='confirmPassword' placeholder='Confirm password' type="password" />
                </div>
                {invitedEmailStatus && <p className='text-sm text-red-500'>An account with this email address already exists.</p>}
                <button disabled={inviteSignUpLoading} className={`${inviteSignUpLoading ? "bg-[#5c5c5c]" : "bg-primary"} text-white py-[10px] px-12 rounded-xl font-bold mt-3 md:mt-6 mb-6`}>Signup</button>
            </form>}
        </div>
    )
}
