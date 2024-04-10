import { useState } from "react";
import { Calendar } from "react-date-range";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import "./date.css"

// eslint-disable-next-line react/prop-types
const Date = ({ dateData }) => {
    const { date, setDate, defaultValue } = dateData || {}
    const [isControlDateOpen, setIsControlDateOpen] = useState(false)
    const formattedDate = moment(date).format("DD/MM/YYYY");

    return (
        <div>
            <div onClick={() => setIsControlDateOpen(true)} className=' flex items-center justify-between border border-primary rounded p-3 bg-white text-[#4e4e4e] cursor-pointer'>
                {!defaultValue && <p>{date ? formattedDate : "DD/MM/YY"}</p>}
                {defaultValue && <p>{date ? formattedDate : moment(defaultValue).format('DD/MM/YYYY')}</p>}
                <FaCalendarAlt size={20} />
            </div>
            {/* select date  */}
            {isControlDateOpen && <div data-aos="" onClick={() => { setIsControlDateOpen(false) }} id="tooltip" className='w-screen h-screen bg-[#40444E66] absolute top-0 bottom-0 left-0 right-0 z-[100] flex justify-center items-center'>
                <div data-aos="zoom-in" onClick={(e) => e.stopPropagation()} className='bg-white p-6 rounded-lg w-[350px] min-h-[470px]'>
                    <div>
                        <div className='flex justify-end items-center text-primary '>
                            <IoMdClose onClick={() => setIsControlDateOpen(false)} className='cursor-pointer hover:text-primary' size={24} />
                        </div>
                        <div className='flex justify-center'>
                            {!defaultValue && <p className='border border-[#e9e9e9] py-3 px-6 rounded text-primary mb-2'>{date ? formattedDate : "DD/MM/YY"}</p>}
                            {defaultValue && <p className='border border-[#e9e9e9] py-3 px-6 rounded text-primary mb-2'>{date ? formattedDate : moment(defaultValue).format('DD/MM/YYYY')}</p>}
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                            <Calendar onChange={item => setDate(item)}
                                date={date}
                            />
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={() => setIsControlDateOpen(false)} type='button' className='border border-[#e9e9e9] py-2 px-10 bg-primary text-white rounded-lg'>Select</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default Date;