import { useContext } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { GlobalContext } from "../../../providers/GlobalProvider";
import moment from 'moment';
import { useNavigate } from "react-router-dom";

const ViewProject = () => {
    const { singleProjectData } = useContext(GlobalContext)
    const navigate = useNavigate()
    return (
        <div className="py-10 px-20">
            <div className="flex items-center justify-between">
                <button className="flex w-fit cursor-default">
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer" size={28} />
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer relative right-4" size={28} />
                </button>
                <div className="flex gap-10">
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiPlus size={20} /></button>
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiEdit size={20} /></button>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                <div className="flex items-center gap-4">
                    <div className="border border-primary w-[70px] h-[70px] flex justify-center items-center">
                        <img className="w-14 h-14 object-fill" src={`http://localhost:5000/public/uploads/${singleProjectData.add_image}`} alt="" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-medium mb-4">Project Name</h4>
                        <p>{singleProjectData.project_name}</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">ID Number</h4>
                    <p>{singleProjectData.ID_number}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Start Date</h4>
                    <p>{moment(singleProjectData.start_date).format('DD/MM/YYYY')}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">End Date</h4>
                    <p>{moment(singleProjectData.end_date).format('DD/MM/YYYY')}</p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Client</h2>
                <p>{singleProjectData.client}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Project Value</h2>
                <p>{singleProjectData.project_value}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Project Owner</h2>
                <p>{singleProjectData.project_owner?.map(owner => (<p>{owner.value}{!singleProjectData.project_owner.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Consequences</h2>
                <p>{singleProjectData.risk_consequences?.map(risk => (<p>{risk.value}{!singleProjectData.risk_consequences.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Consequences Impacts</h2>
                <p>{singleProjectData.risk_consequences_impact?.map(risk => (<p>{risk.value}{!singleProjectData.risk_consequences_impact.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Categories</h2>
                <p>{singleProjectData.risk_categories?.map(category => (<p>{category.value}{!singleProjectData.risk_categories.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Likelihood</h2>
                <p>{singleProjectData.likelihood?.map(like => (<p>{like.value}{!singleProjectData.likelihood.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Rating</h2>
                <p>{singleProjectData.risk_ratting?.map(rating => (<p>{rating.value}{!singleProjectData.risk_ratting.length && ', '} </p>))}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Matrix Template</h2>
                <div className="w-[512px] h-[512px] border border-primary flex justify-center items-center">
                    <img
                        src={`http://localhost:5000/public/uploads/${singleProjectData.add_image}`}
                        className='w-[500px] h-[500px] object-fill rounded'
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewProject;