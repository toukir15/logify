import React, { useEffect, useState } from 'react'

export default function CheckEmailPage() {
    const [counter, setCounter] = useState(10);
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div>
            <div className="h-[calc(100vh-126px)] flex justify-center items-center flex-col text-center">
                <div className='w-[120px] h-[120px] border flex justify-center items-center rounded-full border-[#E3E3E5] mb-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
                        <path d="M34.5 7.5H14.5C8.5 7.5 4.5 10.5 4.5 17.5V31.5C4.5 38.5 8.5 41.5 14.5 41.5H34.5C40.5 41.5 44.5 38.5 44.5 31.5V17.5C44.5 10.5 40.5 7.5 34.5 7.5ZM35.44 19.68L29.18 24.68C27.86 25.74 26.18 26.26 24.5 26.26C22.82 26.26 21.12 25.74 19.82 24.68L13.56 19.68C12.92 19.16 12.82 18.2 13.32 17.56C13.84 16.92 14.78 16.8 15.42 17.32L21.68 22.32C23.2 23.54 25.78 23.54 27.3 22.32L33.56 17.32C34.2 16.8 35.16 16.9 35.66 17.56C36.18 18.2 36.08 19.16 35.44 19.68Z" fill="#40444E" />
                    </svg>
                </div>
                <div className='mb-5'>
                    <h1 className='text-[32px]'>Check Your Email</h1>
                    <p className='w-[409px] mt-2 '>We sent verification link to <span className='font-semibold'>toukir486@gmail.com</span>. Don&apos;t forget to check the spam folder</p>
                </div>
            </div>
        </div>
    )
}
