import { useContext } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import { GlobalContext } from "../../../providers/GlobalProvider";

const RiskViewDetails = () => {
    const { singleRiskData, projectID } = useContext(GlobalContext)
    const openClosedStatus = window.location.href.split("/")[6]
    const riskId = window.location.href.split("/")[9]
    console.log(riskId)
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex items-center justify-between">
                <button className="flex w-fit cursor-default">
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer" size={28} />
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer relative right-4" size={28} />
                </button>
                <div className="flex gap-10">
                    <button onClick={() => navigate(`/projects/logs/risk/${openClosedStatus}/add-risk/${projectID}`)}
                        className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow">
                        <FiPlus size={20} />
                    </button>
                    <button onClick={() => navigate(`/projects/logs/risk/:open-closed/:slag/edit-risk/:slag`)} className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow">
                        <FiEdit size={20} />
                    </button>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Category</h4>
                    <p>{singleRiskData.risk_category.value}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Name</h4>
                    <p>{singleRiskData.risk_name}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Owner</h4>
                    <p>13/12/2023</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Rating</h4>
                    <p>{singleRiskData.ratting.value}</p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Description</h2>
                <p>{singleRiskData.risk_description}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Cause</h2>
                <p>{singleRiskData.risk_cause}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Effects</h2>
                <p>{singleRiskData.risk_effect}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Consequences</h2>
                <p>Project Delay: <span className="text-[#F88916]">{singleRiskData.consequences.value}</span></p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Likelihood</h2>
                <p>{singleRiskData.likelihood.value}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Comment</h2>
                <p>{parse(singleRiskData.comment)}</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Matrix Template</h2>
                <div className="border border-primary w-[510px] h-[410px] flex justify-center items-center">
                    <img className="w-[500px] h-[400px] object-fill" src={`http://localhost:5000/public/uploads/${singleRiskData.risk_matrix_template}`} alt="" />
                </div>
            </div>
        </div>
    );
};

export default RiskViewDetails;