/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from 'react';
import JoditEditor from 'jodit-react';
import Select, { components } from "react-select";
import { CgProfile } from "react-icons/cg";
import { BsInfo } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import Date from '../../../components/shared/Date';
import { GlobalContext } from '../../../providers/GlobalProvider';
import { useNavigate } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

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

const AddControl = () => {
    const { singleProjectData, controlRiskData, setControlRiskData } = useContext(GlobalContext)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [controlOwner, setControlOwner] = useState(null);
    const [controlDate, setControlDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)
    const navigate = useNavigate()

    console.log(controlRiskData)

    const handleAddControl = (e) => {
        e.preventDefault()
        const addControlData = {
            control_name: e.target.controlName.value,
            control_date: controlDate,
            control_status: controlStatus,
            comment: content,
            due_date: dueDate,
            control_owner: controlOwner,
            tag: e.target.tag.value
        }
    }

    const config = {
        readonly: false,
        height: '300px',
        width: '100%',
        enableDragAndDropFileToEditor: true,
        uploader: { insertImageAsBase64URI: true },
        removeButtons: ['brush', 'file'],
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: true,
        toolbarSticky: true,
        toolbarButtons: [
            'source',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'ul',
            'ol',
            '|',
            'link',
            'image',
            '|',
            'align',
            '|',
            'undo',
            'redo',
        ],
    };

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
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
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
                        className='w-[70%] z-[50]'
                        defaultValue={controlOwner}
                        onChange={setControlOwner}
                        options={singleProjectData.project_owner}
                        isClearable={true}
                        components={{ MultiValue, Option }}
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
                    <label className="w-[30%]" htmlFor="">Tag</label>
                    <input placeholder="Select tag" name="tag" id="tag" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    {controlRiskData && <div className='bg-white w-[70%] p-4 rounded text-sm relative'>
                        <div>
                            <p> Risk Name: <span className='text-[#456]'>{controlRiskData?.risk_name}</span></p>
                            <p> Risk Owner: <span className='text-[#456]'>{controlRiskData?.risk_owner[0].value}</span></p>
                            <p> Risk Description: <span className='text-[#456]'>{controlRiskData?.risk_description}</span></p>
                            <p> Risk Category: <span className='text-[#456]'>{controlRiskData?.risk_category.value}</span></p>
                            <p> Risk Cause: <span className='text-[#456]'>{controlRiskData?.risk_cause}</span></p>
                            <p> Risk Effect: <span className='text-[#456]'>{controlRiskData?.risk_effect}</span></p>
                            <p> Risk Consequences: <span className='text-[#456]'>{controlRiskData?.consequences.value}</span></p>
                            <p> Risk Consequences Impact:<span className='text-[#456]'> {controlRiskData?.risk_consequences_impact.value}</span> </p>
                            <p> Likelihood:<span className='text-[#456]'> {controlRiskData?.likelihood.value}</span> </p>
                            <p> Ratting: <span className='text-[#456]'> {controlRiskData?.ratting.value}</span></p>
                        </div>
                        <div className='flex gap-2 absolute top-2 right-2'>
                            <button onClick={() => setControlRiskData(null)} className='text-red-500'> <RiDeleteBinLine /></button>
                            <button onClick={() => navigate('/projects/logs/:open-risk-status/:open-closed-status/add-control-risk-edit/:slag')} className='text-green-500'> <FaRegEdit /></button>
                        </div>
                    </div>}
                </div>

                {!controlRiskData && <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    <button onClick={() => navigate("/projects/logs/:open-risk-status/:open-closed-status/add-control-risk/:slag")} className="bg-primary py-3 w-[70%] text-white rounded-lg">Add Risk</button>
                </div>}
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    <div className="w-[70%] flex gap-8">
                        <button className="bg-primary py-3 w-full text-white rounded-lg">Save</button>
                        <button className="border border-primary text-primary py-3 w-full rounded-lg">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddControl;