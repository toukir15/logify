/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from 'react';
import JoditEditor from 'jodit-react';
import Select from "react-select";
import { BsInfo } from 'react-icons/bs';
import axios from "axios"
import CreatableSelect from 'react-select/creatable';
import { Tooltip } from 'react-tooltip';
import Date from '../../../components/shared/Date';
import { GlobalContext } from '../../../providers/GlobalProvider';
import { useNavigate } from "react-router-dom"
import { useJoditConfig } from '../../../hooks/useJoditConfig';
import { CustomMultiValue } from "../../../components/shared/CustomMultiValue"
import { CustomOption } from '../../../components/shared/CustomOption';
import { customStyle } from '../../../hooks/useSelectCustomStyle';
import { useNotify } from '../../../hooks/useNotify';

const AddControl = () => {
    const { singleProjectData, controlsDataRefeatch } = useContext(GlobalContext)
    const commentRef = useRef(null);
    const controlOwnerRef = useRef(null)
    const tagsRef = useRef(null)
    const [controlDate, setControlDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)
    const navigate = useNavigate()

    const handleAddControl = (e) => {
        e.preventDefault()
        const control_name = e.target.controlName.value
        const comment = commentRef.current.value
        const control_owner = controlOwnerRef.current.props.value
        const tags = tagsRef.current.props.value
        const control_status = e.target.controlStatus.value

        if (!control_name || !comment || !tags || !control_owner || !control_status || !controlDate || !dueDate) {
            useNotify("Some data is messing!", "warning")
            return
        }

        const addControlData = {
            control_name,
            control_date: controlDate,
            control_status,
            comment,
            due_date: dueDate,
            control_owner,
            tags,
        }

        axios.post("/controls_api/add_control", addControlData)
            .then(response => {
                if (response.data.insertedId) {
                    controlsDataRefeatch()
                    navigate("/projects/logs/control/open/4512124511")
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="w-full py-10">
            <form onSubmit={handleAddControl} className="flex w-[60%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Control Name</label>
                        <div data-tooltip-id="control-name" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="control-name" content="High level description an action or control, for example 'Engage architect for Project X. " style={{ width: "350px" }} place='right' />
                    </div>
                    <input placeholder="Enter control name" name="controlName" id="controlName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Control Date</label>
                    <div className='w-[70%]'>
                        <Date dateData={{ date: controlDate, setDate: setControlDate }} />
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Control Status</label>
                        <div data-tooltip-id="control-status" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="control-status" content="This is an ongoing log on the status of this task, for example every time during a meeting or new milestone there's a progress update you can log the status of this control'" style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea className="border-primary border w-[70%] p-3 rounded outline-none" name="controlStatus" id="controlStatus" cols="10" rows="4" placeholder="Write project status"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Comment</label>
                    <div className='w-[70%] border border-primary rounded'>
                        <JoditEditor
                            ref={commentRef}
                            config={useJoditConfig}
                            tabIndex={1}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Due Date</label>
                    <div className='w-[70%]'>
                        <Date dateData={{ date: dueDate, setDate: setDueDate }} />
                    </div>

                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Control Owner</label>
                    <Select
                        ref={controlOwnerRef}
                        className='w-[70%] z-[50]'
                        options={singleProjectData?.project_owner}
                        isClearable={true}
                        components={{ CustomMultiValue, CustomOption }}
                        isMulti={true}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? '#4256D0' : '#4256D0',
                                padding: '6px'
                            }),
                        }}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Tags</label>
                    <CreatableSelect
                        placeholder={"Tags"}
                        ref={tagsRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    <div className="w-[70%] flex gap-8">
                        <button className="bg-primary py-3 w-full text-white rounded-lg">Add Control</button>
                        <button className="border border-primary text-primary py-3 w-full rounded-lg">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddControl;