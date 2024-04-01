import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function VerifyPage() {
    const navigate = useNavigate()
    const handleEmailVerify = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        axios.patch("/authentication_api/verify_email", { token })
            .then(response => {
                if (response.status == 200) {
                    navigate("/login")
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-[#fffdfd] shadow-lg p-10 rounded-xl w-[400px]'>
                <p className='mb-4 text-center'>Click to verify <span className='font-medium'>toukir486@gmail.com</span></p>
                <div className='flex justify-center'>
                    <button onClick={handleEmailVerify} className='bg-primary px-10 py-2 text-white rounded'>Verify</button>
                </div>
            </div>
        </div>
    )
}
