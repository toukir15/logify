/* eslint-disable react/prop-types */
import { useState, useRef, useCallback, useContext } from 'react';
import JoditEditor from 'jodit-react';
import { BsInfo } from "react-icons/bs";
import { Tooltip } from 'react-tooltip'
import Select, { components } from "react-select";
import ImageViewer from 'react-simple-image-viewer';
import { CgProfile } from 'react-icons/cg';
import { GlobalContext } from '../../../providers/GlobalProvider';
import { useNavigate } from "react-router-dom"
import { useNotify } from '../../../hooks/useNotify';

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

const AddControlRiskEdit = () => {
    const navigate = useNavigate()
    const { singleProjectData, setControlRiskData, controlRiskData } = useContext(GlobalContext)
    console.log(singleProjectData)
    const commentRef = useRef(null);
    const riskOwnerRef = useRef(null)
    const riskCategoryRef = useRef(null)
    const riskConsequencesImpactRef = useRef(null)
    const likelihoodRef = useRef(null)
    const rattingRef = useRef(null)
    const consequencesRef = useRef(null)

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

    const handleControlRiskData = (e) => {
        e.preventDefault()
        const risk_name = e.target?.riskName?.value
        const risk_description = e.target?.riskDescription?.value
        const risk_effect = e.target?.riskEffect?.value
        const risk_matrix_template = singleProjectData.risk_matrix_template
        const risk_cause = e.target?.riskCause?.value
        const risk_owner = riskOwnerRef.current.state?.prevProps?.value
        const risk_category = riskCategoryRef.current.state?.prevProps?.value
        const consequences = consequencesRef.current.state?.prevProps?.value
        const risk_consequences_impact = riskConsequencesImpactRef.current.state?.prevProps?.value
        const likelihood = likelihoodRef.current.state?.prevProps?.value
        const ratting = rattingRef.current.state?.prevProps?.value
        const comment = commentRef.current._wrapperState.initialValue

        if (!risk_name || !risk_description || !risk_effect || !risk_matrix_template || !risk_cause || !risk_category || !risk_owner || !consequences || !risk_consequences_impact || !likelihood || !ratting || !comment) {
            useNotify("Some data is messing!", "warning")
            return
        }

        const editedData = {
            risk_category,
            risk_name,
            risk_description,
            risk_cause,
            risk_owner,
            risk_effect,
            consequences,
            risk_consequences_impact,
            likelihood,
            ratting,
            comment,
            risk_matrix_template
        }
        setControlRiskData(editedData)
        navigate("/projects/logs/control/open/add-control/456465")
    }


    return (
        <div className="w-full py-10">
            <form onSubmit={handleControlRiskData} className="flex w-[60%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%] flex items-center gap-2" >
                        <label htmlFor="">Risk Category</label>
                        <div data-tooltip-id="risk-category" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-category" content="Enter generic risk categories to allow grouping of risk, For example, 'Construction, Design, Schedule, Environmental etc, 'corporate construction or other generic items, You can always add more categories in your project page. " style={{ width: "350px" }} className='tooltip-style' place='right' />
                    </div>
                    <Select
                        ref={riskCategoryRef}
                        className='w-[70%] '
                        defaultValue={controlRiskData.risk_category}
                        options={singleProjectData?.risk_categories}
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
                    <input defaultValue={controlRiskData.risk_name} placeholder="Enter risk name" name="riskName" id="riskName" className="border-primary border w-[70%] p-3 rounded outline-none " type="text" />

                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Description</label>
                        <div data-tooltip-id="risk-description" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-description" content="Detailed description of risk, for example 'Falling into open pit'." style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea defaultValue={controlRiskData.risk_description} className="border-primary border w-[70%] p-3 rounded outline-none" name="riskDescription" id="riskDescription" cols="10" rows="4" placeholder="Write risk description"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Cause</label>
                        <div data-tooltip-id="risk-cause" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-cause" content="Provide details of what could be the cause of the impact, for example 'No barrier or fence around the open pit'." style={{ width: "350px" }} place='right' />
                    </div>
                    <textarea defaultValue={controlRiskData.risk_cause} className="border-primary border w-[70%] p-3 rounded outline-none" name="riskCause" id="riskCause" cols="10" rows="4" placeholder="Write risk cause"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk Owner</label>
                    <Select
                        ref={riskOwnerRef}
                        className='w-[70%] z-[50]'
                        defaultValue={controlRiskData.risk_owner}
                        options={singleProjectData?.project_owner}
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
                    <input defaultValue={controlRiskData.risk_effect} placeholder="Enter control name" name="riskEffect" id="riskEffect" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Consequences</label>
                    <div className='flex w-[70%] gap-4 items-center '>
                        <Select
                            ref={consequencesRef}
                            className={`w-[70%] z-[40]`}
                            options={singleProjectData.risk_consequences}
                            defaultValue={controlRiskData.consequences}
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
                            ref={riskConsequencesImpactRef}
                            className={`w-[70%] z-[40]`}
                            defaultValue={controlRiskData.risk_consequences_impact}
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
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk Rating</label>
                    <div className='w-[70%]'>
                        <div className='flex  gap-4'>
                            <Select
                                ref={likelihoodRef}
                                className='w-[70%] '
                                defaultValue={controlRiskData.likelihood}
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
                            />
                            <Select
                                ref={rattingRef}
                                className='w-[70%] '
                                defaultValue={controlRiskData.ratting}
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
                            ref={commentRef}
                            value={controlRiskData.comment}
                            config={config}
                            tabIndex={1}
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
                    <div className="w-[70%] flex gap-8">
                        <button className="bg-primary py-3 w-full text-white rounded-lg">Add Control</button>
                        <button type='button' onClick={() => navigate('/projects/logs/control/open/add-control/456465')} className="border border-primary text-primary py-3 w-full rounded-lg">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddControlRiskEdit;