import { FiEdit, FiPlus } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const RiskViewDetails = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex items-center justify-between">
                <button className="flex w-fit cursor-default">
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer" size={28} />
                    <MdOutlineArrowBackIosNew onClick={() => navigate("/projects")} className="cursor-pointer relative right-4" size={28} />
                </button>
                <div className="flex gap-10">
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiPlus size={20} /></button>
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><IoCheckmarkSharp size={20} /></button>
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiEdit size={20} /></button>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Category</h4>
                    <p>Bearing Dimensions</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Name</h4>
                    <p>Voytek Szczepanik</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Owner</h4>
                    <p>13/12/2023</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Risk Rating</h4>
                    <p>17/12/2023</p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Description</h2>
                <p>Unable to complete MAUW North design in designated timeframe (MOD 5 & MARW)</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Cause</h2>
                <p>Unable to complete MAUW North design in designated timeframe (MOD 5 & MARW)</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Effects</h2>
                <p>Unable to complete MAUW North design in designated timeframe (MOD 5 & MARW)</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Consequences</h2>
                <p>Project Delay: <span className="text-[#F88916]">Major</span></p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Likelihood</h2>
                <p>Possible</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Matrix Template</h2>
                <p>Possible</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Comment</h2>
                <p>Possible</p>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl mb-4 font-medium">Risk Controls</h2>
                <h3 className="text-primary text-2xl font-medium">WAD1 Modification</h3>
            </div>
        </div>
    );
};

export default RiskViewDetails;