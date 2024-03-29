/* eslint-disable react/prop-types */
import { useState, useRef, useCallback, useContext } from 'react';
import JoditEditor from 'jodit-react';
import { FiPlus } from "react-icons/fi"
import { BsInfo } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import Select, { components } from "react-select";
import ImageViewer from 'react-simple-image-viewer';
import { CgProfile } from 'react-icons/cg';
import { GlobalContext } from '../../../providers/GlobalProvider';

const options = [
    { value: 'construction', label: 'Construction' },
    { value: 'schedule', label: 'Schedule' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'design', label: 'Design' },
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

const AddRisk = () => {
    const { singleProjectData } = useContext(GlobalContext)
    console.log(singleProjectData)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [consequencesInputNumber, setConsequencesInputNumber] = useState(1)
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        `http://localhost:5000/public/uploads/${singleProjectData.risk_matrix_template}`,
    ];
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

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
                    <div className="w-[30%] flex items-center gap-2" >
                        <label htmlFor="">Risk Category</label>
                        <div data-tooltip-id="risk-category" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-category" content="Enter generic risk categories to allow grouping of risk, For example, 'Construction, Design, Schedule, Environmental etc, 'corporate construction or other generic items, You can always add more categories in your project page. " style={{ width: "350px" }} className='tooltip-style' place='right' />
                    </div>
                    <Select
                        className='w-[70%] '
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={singleProjectData.risk_categories}
                        isClearable={true}
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
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Name</label>
                        <div data-tooltip-id="risk-name" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-name" content="High level description of the risk, for example 'Fall Hazard'. " style={{ width: "350px" }} place='right' />
                    </div>
                    <input placeholder="Enter risk name" name="riskName" id="riskName" className="border-primary border w-[70%] p-3 rounded outline-none " type="text" />

                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Description</label>
                        <div data-tooltip-id="risk-description" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-description" content="Detailed description of risk, for example 'Falling into open pit'." style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea className="border-primary border w-[70%] p-3 rounded outline-none" name="riskDescription" id="riskDescription" cols="10" rows="4" placeholder="Write risk description"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Cause</label>
                        <div data-tooltip-id="risk-cause" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-cause" content="Provide details of what could be the cause of the impact, for example 'No barrier or fence around the open pit'." style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea className="border-primary border w-[70%] p-3 rounded outline-none" name="riskCause" id="riskCause" cols="10" rows="4" placeholder="Write risk cause"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk Owner</label>
                    <Select
                        className='w-[70%] z-[50]'
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        components={{ MultiValue, Option }}
                        isClearable={true}
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
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Effect</label>
                        <div data-tooltip-id="risk-effect" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-effect" content="Describe the effect of the risk, 'For example 'Causing serious injury or death'." style={{ width: "350px" }} place='right' />
                    </div>
                    <input placeholder="Enter control name" name="projectName" id="projectName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-14">
                    <label className="w-[30%]" htmlFor="">Consequences</label>
                    <div className='w-[70%] relative'>
                        {Array(consequencesInputNumber).fill().map((number, i) => {
                            return (
                                <div key={i} className='flex gap-4 mt-3'>
                                    <Select
                                        className={`w-[70%] z-[40+${consequencesInputNumber}]`}
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={singleProjectData.risk_consequences}
                                        isClearable={true}
                                        placeholder={'Consequence'}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? '#4256D0' : '#4256D0',
                                                padding: '6px'
                                            }),
                                        }}
                                    />
                                    <Select
                                        className={`w-[70%] z-[40+${consequencesInputNumber}]`}
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={singleProjectData.risk_consequences_impact}
                                        isClearable={true}
                                        placeholder={'Impact'}
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? '#4256D0' : '#4256D0',
                                                padding: '6px'
                                            }),
                                        }}
                                    />
                                </div>
                            )
                        })}

                        <div className='flex justify-center absolute right-1/2 translate-x-1/2'>
                            <button type='button' onClick={() => setConsequencesInputNumber(prevState => prevState + 1)} className='border border-primary p-[3px] rounded-full mt-2 text-primary'>
                                <FiPlus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk Rating</label>
                    <div className='w-[70%]'>
                        <div className='flex  gap-4'>
                            <Select
                                className='w-[70%] '
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={singleProjectData.likelihood}
                                isClearable={true}
                                placeholder={'Likelihood'}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '#4256D0' : '#4256D0',
                                        padding: '6px'
                                    }),
                                }}
                            />      <Select
                                className='w-[70%] '
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={singleProjectData.risk_ratting}
                                isClearable={true}
                                placeholder={'Ratting'}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '#4256D0' : '#4256D0',
                                        padding: '6px'
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Comment</label>
                    <div className='w-[70%] border border-primary rounded'>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        // onChange={newContent => { }}
                        />
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk Matrix Template</label>
                    <div className='w-[70%] border border-primary rounded'>
                        <div>
                            {images.map((src, index) => (
                                <img
                                    src={src}
                                    onClick={() => openImageViewer(index)}
                                    className='w-full h-[500px] object-cover rounded'
                                    key={index}
                                    alt=""
                                />
                            ))}

                            {isViewerOpen && (
                                <div className='z-[100]'>
                                    <ImageViewer
                                        src={images}
                                        currentIndex={currentImage}
                                        disableScroll={false}
                                        closeOnClickOutside={true}
                                        onClose={closeImageViewer}
                                    />
                                </div>
                            )}
                        </div>
                        {/* <img className='rounded' src="https://api.logify.au/uploads/risk_matrix_image-1702530495480-613704814.png" alt="" /> */}
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor=""></label>
                    <button className="bg-primary py-3 w-[70%] text-white rounded-lg">Add Control</button>
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

export default AddRisk;