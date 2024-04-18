import { useContext, useRef, useState } from "react";
import Date from "../../components/shared/Date";
import { BsInfo } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../../hooks/useNotify"
import { GlobalContext } from "../../providers/GlobalProvider";
import { customStyle } from '../../hooks/useSelectCustomStyle'
import { CustomMultiValue } from "../../components/shared/CustomMultiValue"
import { CustomOption } from '../../components/shared/CustomOption';

const AddProject = () => {
    const { projectsDataRefetch, usersData } = useContext(GlobalContext)
    const selectProjectOwnerData = usersData?.map(user => ({ value: user.first_name, label: user.first_name, email: user.email }))
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [addImage, setAddImage] = useState({})
    const [riskMatrixTemplate, setRiskMatrixTemplate] = useState({})
    const projectOwnerRef = useRef(null)
    const riskConsequencesRef = useRef(null)
    const riskConsequencesImpactRef = useRef(null)
    const riskCategoriesRef = useRef(null)
    const likelihoodRef = useRef(null)
    const riskRattingRef = useRef(null)
    const navigate = useNavigate();

    const handleAddImageChange = (e, actionName) => {
        if (e.target?.files[0]?.type?.split("/")[0] == "image") {
            const reader = new FileReader()
            reader.onload = (r) => {
                if (actionName == "add image") {
                    setAddImage({
                        placeholder: r.target.result,
                        file: e.target.files[0]
                    })
                }
                else if (actionName == "risk matrix template") {
                    setRiskMatrixTemplate({
                        placeholder: r.target.result,
                        file: e.target.files[0]
                    })
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleProject = (e) => {
        e.preventDefault();
        const addImage = e.target.addImage.files[0]
        const riskMatrixTemplate = e.target.riskMatrixTemplate.files[0]
        const projectName = e.target.projectName?.value
        const client = e.target.client?.value
        const IDNumber = e.target.IDNumber?.value
        const projectValue = e.target.projectValue?.value
        const projectDescriptioin = e.target.projectDescription?.value
        const projectOwner = projectOwnerRef.current.state.selectValue
        const riskConsequences = riskConsequencesRef.current.state.selectValue
        const riskConsequencesImpact = riskConsequencesImpactRef.current.state.selectValue
        const riskCategories = riskCategoriesRef.current.state.selectValue
        const likelihood = likelihoodRef.current.state.selectValue
        const riskRatting = riskRattingRef.current.state.selectValue

        if (!addImage || !riskMatrixTemplate || !projectName || !client || !IDNumber || !projectDescriptioin || !riskConsequences.length || !riskConsequencesImpact.length || !riskCategories.length || !likelihood.length || !riskRatting.length || !projectValue || !projectOwner.length) {
            useNotify("Some data is messing!", "warning")
            return
        }

        const projectData = new FormData();
        projectData.append('file', addImage);
        projectData.append('file', riskMatrixTemplate);
        projectData.append('project_name', projectName);
        projectData.append('client', client);
        projectData.append('ID_number', IDNumber);
        projectData.append('project_description', projectDescriptioin);
        projectData.append('risk_consequences', JSON.stringify(riskConsequences));
        projectData.append('risk_consequences_impact', JSON.stringify(riskConsequencesImpact));
        projectData.append('risk_categories', JSON.stringify(riskCategories));
        projectData.append('likelihood', JSON.stringify(likelihood));
        projectData.append('risk_ratting', JSON.stringify(riskRatting));
        projectData.append('project_value', projectValue);
        projectData.append('project_owner', JSON.stringify(projectOwner));
        projectData.append('start_date', startDate);
        projectData.append('end_date', endDate);

        axios.post('/projects_api/add_project', projectData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(data => {
                if (data.status == 200) {
                    projectsDataRefetch()
                    navigate("/projects")
                    useNotify("Added Project Successfully", "success")
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="w-full py-6 md:py-20">
            <form onSubmit={handleProject} method="post" className="flex md:w-[50%] mx-auto px-4 flex-col">
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1 " htmlFor="projectName">Project Name</label>
                    <input placeholder="Enter project name" name="projectName" id="projectName" className="border-primary border md:w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="client">Client</label>
                    <input placeholder="Enter client name" name="client" id="client" className="border-primary border md:w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="IDNumber">ID Number</label>
                    <input placeholder="Enter project name" name="IDNumber" id="IDNumber" className="border-primary border md:w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="projectDescription">Project Description</label>
                    <textarea className="border-primary border md:w-[70%] p-3 rounded outline-none" name="projectDescription" id="projectDescription" cols="10" rows="4" placeholder="Write project description"></textarea>
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="date">Date</label>
                    <div className="flex md:w-[70%] gap-6">
                        <div className="grid grid-cols-2 gap-2 md:gap-6 w-full items-center ">
                            <Date dateData={{ date: startDate, setDate: setStartDate }} />
                            <Date dateData={{ date: endDate, setDate: setEndDate }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="projectValue">Project Value</label>
                    <input placeholder="Enter project value" name="projectValue" id="projectValue" className="border-primary border md:w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="projectOwner">Project Owner</label>
                    <Select
                        className='md:w-[70%] z-[50]'
                        ref={projectOwnerRef}
                        options={selectProjectOwnerData}
                        isClearable={true}
                        components={{ MultiValue: CustomMultiValue, Option: CustomOption }}
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
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="addImage">Add Image</label>
                    <input onChange={(e) => handleAddImageChange(e, "add image")} type="file" id="addImage" className="hidden" />
                    <label type="button" htmlFor="addImage" className="py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer w-fit">Upload File</label>
                    {addImage.placeholder && <div className="border p-2 ml-2 border-[#4E81CD]">
                        <img className="h-[30px]" src={addImage.placeholder} alt="" />
                    </div>}
                </div>

                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <div className="md:w-[30%]  flex items-center gap-2">
                        <label className="mb-1 md:mb-0" htmlFor="">Risk Consequences</label>
                        <div data-tooltip-id="risk-consequences" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-consequences" content="Enter your corporate consequence values from your risk matrix table. For example, 'Financial, Environment, Schedule Delay, Reputation, etc  " style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        placeholder={"Enter risk consequences"}
                        ref={riskConsequencesRef}
                        className="md:w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <div className="md:w-[30%]  flex items-center gap-2">
                        <label className="mb-1 md:mb-0" htmlFor="">Risk Consequence Impacts
                        </label>
                        <div data-tooltip-id="risk-consequence-impact" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-consequence-impact" content="Enter your corporate consequence impacts from your risk matrix table. For example, 'Insignificant, Mirror, Moderate, Major, Significant" style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        placeholder={"Enter risk consequences impact"}
                        ref={riskConsequencesImpactRef}
                        className="md:w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <div className="md:w-[30%] flex items-center gap-2">
                        <label className="mb-1 md:mb-0" htmlFor="riskCategories">Risk Categories</label>
                        <div data-tooltip-id="risk-categories" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-categories" content="Enter generic risk categories to allow grouping of risks. For example, 'Construction. Design, Schedule, Environmental etc. 'If unsure use 'corporate, construction or other generic terms. You can always add more categories in your project page.'" style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        placeholder={"Enter risk categories"}
                        ref={riskCategoriesRef}
                        className="md:w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <div className="md:w-[30%]  flex items-center gap-2">
                        <label className="mb-1 md:mb-0" htmlFor="likelihood">Likelihood
                        </label>
                        <div data-tooltip-id="likelihood" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="likelihood" content="Enter your corporate likelihood values. For example, Rare, Unlikely, Possible and almost Certain." style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        placeholder={"Enter likelihood"}
                        ref={likelihoodRef}
                        className="md:w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">

                    <div className="md:w-[30%]  flex items-center gap-2">
                        <label className="mb-1 md:mb-0" htmlFor="">Risk Rating
                        </label>
                        <div data-tooltip-id="risk-ratting" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-ratting" content="Enter your corporate risk ratting values. For example, Low, Medium, High and Critical." style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        placeholder={"Enter risk ratting"}
                        ref={riskRattingRef}
                        className="md:w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center mb-2 md:mb-6">
                    <label className="md:w-[30%] mb-1" htmlFor="">Risk matrix template
                    </label>
                    <div className="md:w-[70%]">
                        <input onChange={(e) => handleAddImageChange(e, "risk matrix template")} type="file" id="riskMatrixTemplate" className="hidden" />
                        <label type="button" htmlFor="riskMatrixTemplate" className="py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer ">Upload File</label>
                        {riskMatrixTemplate.placeholder && <div className="border p-2 ml-2 border-[#4E81CD] mt-2 rounded">
                            <img src={riskMatrixTemplate.placeholder} alt="" />
                        </div>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full md:items-center my-6">
                    <div className="md:w-[30%] mb-1"></div>
                    <div className="md:w-[70%] flex gap-6 ">
                        <button className="w-1/2 bg-primary py-3 px-4 text-white rounded-lg">Add Project</button>
                        <button className="w-1/2 border border-primary py-3 px-4 rounded-lg">Cancel</button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default AddProject;