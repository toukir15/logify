/* eslint-disable react/prop-types */
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import Select, { components } from "react-select";
import { addDays } from 'date-fns';
import useFormatDate from "../../../hooks/useFormatDate"

const options = [
    { value: 'construction', label: 'Construction', },
    { value: 'schedule', label: 'Schedule', },
    { value: 'commercial', label: 'Commercial', },
    { value: 'design', label: 'Design', },
];

const MultiValue = props => (
    <components.MultiValue {...props}>
        <div className='flex gap-1 items-center font-medium'><CgProfile size={22} /> {props.data.label}</div>
    </components.MultiValue>
);

const Option = props => (
    <components.Option {...props}>
        <div className='flex gap-1 items-center font-medium'><CgProfile size={22} /> {props.data.label}</div>
    </components.Option>
);

const Filter = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const formattedStartDate = useFormatDate(state[0].startDate)
    const formattedEndDate = useFormatDate(state[0].endDate)

    return (
        <div className='py-2 px-20'>
            {!isOpenDatePicker && <form className="w-[70%] mx-auto">
                <h3 className="text-[#4E81CD] text-2xl font-medium mb-6">Control Filter</h3>
                <div onClick={() => setIsOpenDatePicker(true)} className="border border-[#4E81CD] py-4 px-3 rounded bg-white text-[#A8A8A8] mb-6 flex justify-between cursor-pointer">
                    <p>{formattedStartDate ? formattedStartDate : "DD/MM/YY"} - {formattedEndDate ? formattedEndDate : "DD/MM/YY"}</p>
                    <FaCalendarAlt className="text-[#4E81CD]" size={20} />
                </div>
                <input placeholder="Control name" type="text" className="border border-[#4E81CD] py-4 px-3 rounded w-full bg-white text-[#A8A8A8] mb-6 outline-none" />
                <input placeholder="Description" type="text" className="border border-[#4E81CD] py-4 px-3 rounded w-full bg-white text-[#A8A8A8] mb-6 outline-none" />
                <input placeholder="Tag" type="text" className="border border-[#4E81CD] py-4 px-3 rounded w-full bg-white text-[#A8A8A8] mb-6 outline-none" />
                <Select
                    className=''
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    isClearable={true}
                    components={{ MultiValue, Option }}
                    placeholder={`Select Owner`}
                    isMulti={true}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? '#4E81CD' : '#4E81CD',
                            padding: '10px 2px'
                        }),
                    }}
                />
                <div className="flex gap-6 mt-12 justify-center">
                    <button className="py-3 px-12 border-primary border rounded-lg">Cancel</button>
                    <button className="py-3 px-12 border-primary border rounded-lg bg-primary text-white">Filter</button>
                </div>
            </form>}

            {isOpenDatePicker && <div>
                <div className="flex justify-between mb-8">
                    <button onClick={() => setIsOpenDatePicker(false)} className="bg-[#4256D0] py-3 px-14 rounded-lg font-semibold text-white">All Upcoming</button>
                    <button onClick={() => setIsOpenDatePicker(false)} className="bg-[#4256D0] py-3 px-14 rounded-lg font-semibold text-white">Over Due</button>
                </div>
                <DateRangePicker
                    className="w-full border-primary rounded-full"
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    rangeColors={["#4256D0"]}
                />
                <div className="flex justify-center gap-6 mt-12">
                    <button onClick={() => setIsOpenDatePicker(false)} className="py-3 px-20 border border-primary  rounded-lg">Cancel</button>
                    <button onClick={() => setIsOpenDatePicker(false)} className="py-3 px-20 bg-primary text-white rounded-lg">Select Range</button>
                </div>
            </div>}

        </div>
    );
};

export default Filter;