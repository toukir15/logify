/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Select, { components } from "react-select";
import { CgProfile } from "react-icons/cg";
import { BsInfo } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import Date from '../../../components/shared/Date';

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

const AddControl = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [controlDate, setControlDate] = useState(null)
    const [dueDate, setDueDate] = useState(null)

    // const config = useMemo(
    //     {
    //         readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    //         placeholder: placeholder || 'Start typings...'
    //     },
    //     [placeholder]
    // );

    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
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
            <form className="flex w-[60%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Control Name</label>
                        <div data-tooltip-id="control-name" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="control-name" content="High level description an action or control, for example 'Engage architect for Project X. " style={{ width: "350px" }} place='right' />
                    </div>
                    <input placeholder="Enter control name" name="projectName" id="projectName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
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
                    <textarea className="border-primary border w-[70%] p-3 rounded outline-none" name="" id="" cols="10" rows="4" placeholder="Write project status"></textarea>
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
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
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
                    <label className="w-[30%]" htmlFor="">Tags</label>
                    <input placeholder="Select owner" name="projectName" id="projectName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    <button className="bg-primary py-3 w-[70%] text-white rounded-lg">Add Risk</button>
                </div>
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