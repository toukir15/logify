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

const EditControl = () => {
    const { projectsData, controlsDataRefeatch, controlsData, projectID } = useContext(GlobalContext)
    const commentRef = useRef(null);
    const controlOwnerRef = useRef(null)
    const tagsRef = useRef(null)
    const [controlDate, setControlDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)
    const navigate = useNavigate()
    const controlId = window.location.href.split("/")[9]
    const openClosedStatus = window.location.href.split("/")[6]
    const singleProjectData = projectsData.find(singleProject => singleProject._id == projectID)
    const singleControlData = controlsData.find(control => control._id == controlId)

    const handleAddControl = (e) => {
        e.preventDefault()
        const control_name = e.target.controlName.value
        const comment = commentRef.current.value
        const control_owner = controlOwnerRef.current.props.value
        const tags = tagsRef.current.props.value
        const control_status = e.target.controlStatus.value
        const control_date = controlDate ? controlDate : singleControlData.control_date
        const due_date = controlDate ? dueDate : singleControlData.due_date

        if (!control_name || !comment || !tags || !control_owner || !control_status || !control_date || !due_date) {
            useNotify("Some data is messing!", "warning")
            return
        }

        const updateControlData = {
            control_name,
            control_date,
            control_status,
            comment,
            due_date,
            control_owner,
            tags,
            project_id: projectID,
            status: openClosedStatus
        }
        axios.patch(`/controls_api/update_control?control_id=${controlId}`, updateControlData)
            .then(response => {
                if (response.status == 200) {
                    controlsDataRefeatch()
                    navigate(`/projects/logs/control/${openClosedStatus}/${projectID}`)
                    useNotify("Update Control Successfully", "success")
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
                    <input defaultValue={singleControlData.control_name} placeholder="Enter control name" name="controlName" id="controlName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Control Date</label>
                    <div className='w-[70%]'>
                        <Date dateData={{ date: controlDate, setDate: setControlDate, defaultValue: singleControlData.control_date }} />
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Control Status</label>
                        <div data-tooltip-id="control-status" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="control-status" content="This is an ongoing log on the status of this task, for example every time during a meeting or new milestone there's a progress update you can log the status of this control'" style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea defaultValue={singleControlData.control_status} className="border-primary border w-[70%] p-3 rounded outline-none" name="controlStatus" id="controlStatus" cols="10" rows="4" placeholder="Write project status"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Comment</label>
                    <div className='w-[70%] border border-primary rounded'>
                        <JoditEditor
                            ref={commentRef}
                            value={singleControlData.comment}
                            config={useJoditConfig}
                            tabIndex={1}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Due Date</label>
                    <div className='w-[70%]'>
                        <Date dateData={{ date: dueDate, setDate: setDueDate, defaultValue: singleControlData.due_date }} />
                    </div>

                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Control Owner</label>
                    <Select
                        defaultValue={singleControlData.control_owner}
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
                        defaultValue={singleControlData.tags}
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
                        <button className="bg-primary py-3 w-full text-white rounded-lg">Update Control</button>
                        <button type='button' onClick={() => navigate(`/projects/logs/control/open/${projectID}/view-control/${controlId}`)} className="border border-primary text-primary py-3 w-full rounded-lg">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditControl;