import { useContext, useRef, useState } from "react";
import Date from "../../components/shared/Date";
import { BsInfo } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import axios from 'axios'
import CreatableSelect from 'react-select/creatable';
import Select, { components } from "react-select";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useNotify } from "../../hooks/useNotify"
import { GlobalContext } from "../../providers/GlobalProvider";

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

const options = [
    { value: 'construction', label: 'Construction', },
    { value: 'schedule', label: 'Schedule', },
    { value: 'commercial', label: 'Commercial', },
    { value: 'design', label: 'Design', },
];

const customStyle = {
    control: base => ({
        ...base,
        borderColor: "#4256D0",
        padding: "6px 0",
        fontSize: '16px',
        "&:hover": {
            borderColor: "#4256D0",
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
}

const EditProject = () => {
    const { projectsData, projectsDataRefetch } = useContext(GlobalContext)
    const projectID = window.location.href.split("/")[5]
    const singleProjectData = projectsData.find(project => project._id == projectID)
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
        else {
            console.log(e.target?.files[0]?.type?.split("/")[0])
        }
    }

    const handleProjects = (e) => {
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

        if (!projectName || !client || !IDNumber || !projectDescriptioin || !riskConsequences.length || !riskConsequencesImpact.length || !riskCategories.length || !likelihood.length || !riskRatting.length || !projectValue || !projectOwner.length) {
            useNotify("Some data is messing!", "warning")
            return
        }

        const projectData = new FormData();
        projectData.append('add_image', addImage);
        projectData.append('risk_matrix_template', riskMatrixTemplate);
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
        projectData.append('start_date', startDate ? startDate : singleProjectData.start_date);
        projectData.append('end_date', endDate ? endDate : singleProjectData.end_date);

        axios.post(`/projects_api/update_project?id=${singleProjectData._id}`, projectData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(data => {
                if (data.status == 200) {
                    projectsDataRefetch()
                    navigate("/projects")
                    useNotify("Update project data successfully", "success")
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="w-full py-20">
            <form onSubmit={handleProjects} method="post" className="flex w-[50%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="projectName">Project Name</label>
                    <input defaultValue={singleProjectData?.project_name} placeholder="Enter project name" name="projectName" id="projectName" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="client">Client</label>
                    <input defaultValue={singleProjectData?.client} placeholder="Enter client name" name="client" id="client" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="IDNumber">ID Number</label>
                    <input defaultValue={singleProjectData?.ID_number} placeholder="Enter project name" name="IDNumber" id="IDNumber" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="projectDescription">Project Description</label>
                    <textarea defaultValue={singleProjectData?.project_description} className="border-primary border w-[70%] p-3 rounded outline-none" name="projectDescription" id="projectDescription" cols="10" rows="4" placeholder="Write project description"></textarea>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="date">Date</label>
                    <div className="flex w-[70%] gap-6">
                        <div className="grid grid-cols-2 gap-6 w-full items-center ">
                            <Date dateData={{ date: startDate ? startDate : singleProjectData?.start_date, setDate: setStartDate }} />
                            <Date dateData={{ date: endDate ? endDate : singleProjectData?.end_date, setDate: setEndDate }} />
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="projectValue">Project Value</label>
                    <input defaultValue={singleProjectData?.project_value} placeholder="Enter project value" name="projectValue" id="projectValue" className="border-primary border w-[70%] p-3 rounded outline-none" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="projectOwner">Project Owner</label>
                    <Select
                        defaultValue={singleProjectData?.project_owner}
                        className='w-[70%] z-[50]'
                        ref={projectOwnerRef}
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
                    <label className="w-[30%]" htmlFor="addImage">Add Image</label>
                    <input onChange={(e) => handleAddImageChange(e, "add image")} name="add_image" type="file" id="addImage" className="hidden" />
                    <label type="button" htmlFor="addImage" className="py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer">Upload File</label>
                    {addImage.placeholder && singleProjectData?.add_image && <div className="border p-2 ml-2 border-[#4E81CD]">
                        <img className="h-[30px]" src={addImage.placeholder} alt="" />
                    </div>}
                    {!addImage.placeholder && singleProjectData?.add_image && <div className="border p-2 ml-2 border-[#4E81CD]">
                        <img className="h-[30px]" src={`http://localhost:5000/public/uploads/${singleProjectData?.add_image}`} alt="" />
                    </div>}
                </div>

                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Consequences</label>
                        <div data-tooltip-id="risk-consequences" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-consequences" content="Enter your corporate consequence values from your risk matrix table. For example, 'Financial, Environment, Schedule Delay, Reputation, etc  " style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        defaultValue={singleProjectData?.risk_consequences}
                        placeholder={"Enter risk consequences"}
                        ref={riskConsequencesRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Consequence Impacts
                        </label>
                        <div data-tooltip-id="risk-consequence-impact" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-consequence-impact" content="Enter your corporate consequence impacts from your risk matrix table. For example, 'Insignificant, Mirror, Moderate, Major, Significant" style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        defaultValue={singleProjectData?.risk_consequences_impact}
                        placeholder={"Enter risk consequences impact"}
                        ref={riskConsequencesImpactRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%] flex items-center gap-2">
                        <label htmlFor="riskCategories">Risk Categories</label>
                        <div data-tooltip-id="risk-categories" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-categories" content="Enter generic risk categories to allow grouping of risks. For example, 'Construction. Design, Schedule, Environmental etc. 'If unsure use 'corporate, construction or other generic terms. You can always add more categories in your project page.'" style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        defaultValue={singleProjectData?.risk_categories}
                        placeholder={"Enter risk categories"}
                        ref={riskCategoriesRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="likelihood">Likelihood
                        </label>
                        <div data-tooltip-id="likelihood" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="likelihood" content="Enter your corporate likelihood values. For example, Rare, Unlikely, Possible and almost Certain." style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        defaultValue={singleProjectData?.likelihood}
                        placeholder={"Enter likelihood"}
                        ref={likelihoodRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">

                    <div className="w-[30%]  flex items-center gap-2">
                        <label htmlFor="">Risk Rating
                        </label>
                        <div data-tooltip-id="risk-ratting" className='bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer'><BsInfo /></div>
                        <Tooltip id="risk-ratting" content="Enter your corporate risk ratting values. For example, Low, Medium, High and Critical." style={{ width: "350px" }} place='right' />
                    </div>
                    <CreatableSelect
                        defaultValue={singleProjectData?.risk_ratting}
                        placeholder={"Enter risk ratting"}
                        ref={riskRattingRef}
                        className="w-[70%]"
                        isMulti
                        isClearable={false}
                        styles={customStyle}
                    />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="">Risk matrix template
                    </label>
                    <div className="w-[70%]">
                        <input onChange={(e) => handleAddImageChange(e, "risk matrix template")} name="risk_matrix_template" type="file" id="riskMatrixTemplate" className="hidden" />
                        <label type="button" htmlFor="riskMatrixTemplate" className="py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer ">Upload File</label>
                        {riskMatrixTemplate.placeholder && singleProjectData?.add_image && <div className="border p-2 ml-2 border-[#4E81CD] mt-2 rounded">
                            <img src={riskMatrixTemplate.placeholder} alt="" />
                        </div>}
                        {!riskMatrixTemplate.placeholder && singleProjectData?.risk_matrix_template && <div className="border p-2 ml-2 border-[#4E81CD] mt-2 rounded">
                            <img src={`http://localhost:5000/public/uploads/${singleProjectData?.risk_matrix_template}`} alt="" />
                        </div>}
                    </div>
                </div>
                <div className="flex w-full items-center my-6">
                    <div className="w-[30%]"></div>
                    <div className="w-[70%] flex gap-6 ">
                        <button className="w-1/2 bg-primary py-3 px-4 text-white rounded-lg">Update Project</button>
                        <button className="w-1/2 border border-primary py-3 px-4 rounded-lg">Cancel</button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default EditProject;