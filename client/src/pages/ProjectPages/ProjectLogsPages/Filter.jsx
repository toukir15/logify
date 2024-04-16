/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import Select, { components } from "react-select";
import { addDays } from 'date-fns';
import useFormatDate from "../../../hooks/useFormatDate"
import { GlobalContext } from "../../../providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import { customStyle } from '../../../hooks/useSelectCustomStyle';

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
    const { projectsData, setControlFilterData } = useContext(GlobalContext)
    const projectID = window.location.href.split("/")[8]
    const singleProject = projectsData.find(project => project._id == projectID)
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
    const tagsRef = useRef(null)
    const navigate = useNavigate()

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);
    const formattedStartDate = useFormatDate(state[0].startDate)
    const formattedEndDate = useFormatDate(state[0].endDate)

    const handleControlFilter = (e) => {
        e.preventDefault()
        const controlFilterData = {
            controlName: e.target.controlName.value,
            controlStatus: e.target.controlStatus.value,
        }
        setControlFilterData(controlFilterData)
        navigate(`/projects/logs/control/open/661c0c3995881fdbfa1a3a3f`)
    }

    return (
        <div className='py-2 px-20'>
            {!isOpenDatePicker && <form onSubmit={handleControlFilter} className="w-[70%] mx-auto">
                <h3 className="text-primary text-2xl font-medium mb-6">Control Filter</h3>
                <div onClick={() => setIsOpenDatePicker(true)} className="border border-primary py-[14px] px-3 rounded bg-white text-[#A8A8A8] mb-6 flex justify-between cursor-pointer">
                    <p>{formattedStartDate ? formattedStartDate : "DD/MM/YY"} - {formattedEndDate ? formattedEndDate : "DD/MM/YY"}</p>
                    <FaCalendarAlt className="text-primary" size={20} />
                </div>
                <input placeholder="Control name" id="controlName" type="text" className="border border-primary py-[14px] px-3 rounded w-full bg-white text-[#A8A8A8] mb-6 outline-none" />
                <input placeholder="Control status" id="controlStatus" type="text" className="border border-primary py-[14px] px-3 rounded w-full bg-white text-[#A8A8A8] mb-6 outline-none" />
                <CreatableSelect
                    className="mb-6"
                    placeholder={"Tags"}
                    ref={tagsRef}
                    isMulti
                    isClearable={false}
                    styles={{
                        control: base => ({
                            ...base,
                            borderColor: "#28282b",
                            padding: "8px 0",
                            fontSize: '16px',
                            "&:hover": {
                                borderColor: "#28282b",
                            },
                        }),
                        dropdownIndicator: base => ({
                            ...base,
                            display: "none"
                        }),
                        indicatorSeparator: base => ({
                            ...base,
                            display: "none"
                        }),
                        menu: base => ({
                            ...base,
                            display: "none"
                        }),
                    }}
                />
                <Select
                    onChange={setSelectedOption}
                    options={singleProject.project_owner}
                    isClearable={true}
                    components={{ MultiValue, Option }}
                    placeholder={`Select Owner`}
                    styles={{
                        control: base => ({
                            ...base,
                            borderColor: "#28282b",
                            padding: "8px 0",
                            fontSize: '16px',
                            "&:hover": {
                                borderColor: "#28282b",
                            },
                        }),
                    }}
                />
                <div className="flex gap-6 mt-12 justify-center">
                    <button className="py-3 px-12 border-primary border rounded-lg">Cancel</button>
                    <button className="py-3 px-12 border-primary border rounded-lg bg-primary text-white">Filter</button>
                </div>
            </form>}

            {isOpenDatePicker && <div>
                <DateRangePicker
                    className="w-full border-primary rounded-full"
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    rangeColors={["#28282b"]}
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