import { FiPlus } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useContext } from "react";
import { GlobalContext } from "../../../providers/GlobalProvider";
import parse from 'html-react-parser';
import moment from "moment";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom"

const ControlViewDetails = () => {
    const { controlsData, projectID } = useContext(GlobalContext)
    const controlId = window.location.href.split("/")[9]
    const openClosedStatus = window.location.href.split("/")[6]
    const singleControlData = controlsData.find(controlData => controlData._id == controlId)
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex items-center justify-between">
                <button className="flex w-fit cursor-default">
                    <MdOutlineArrowBackIosNew onClick={() => navigate(`/projects/logs/control/${openClosedStatus}/${projectID}`)} className="cursor-pointer" size={28} />
                    <MdOutlineArrowBackIosNew onClick={() => navigate(`/projects/logs/control/${openClosedStatus}/${projectID}`)} className="cursor-pointer relative right-4" size={28} />
                </button>
                <div className="flex gap-10">
                    <button onClick={() => navigate(`/projects/logs/control/${openClosedStatus}/add-control/${projectID}`)} className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiPlus size={20} /></button>

                    <button onClick={() => navigate(`/projects/logs/control/${openClosedStatus}/${projectID}/edit-control/${controlId}`)} className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiEdit size={20} /></button>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h4 className="text-2xl font-medium mb-4">Name</h4>
                    <p>{singleControlData.control_name}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Owner</h4>
                    <p>{singleControlData.control_owner[0].value}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Date</h4>
                    <p>{moment(singleControlData.control_date).format('DD/MM/YYYY')}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Due Date</h4>
                    <p>{moment(singleControlData.due_date).format('DD/MM/YYYY')}</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Tags</h4>
                    <p>{singleControlData.tags[0].value} {singleControlData.length > 1 && "..."} </p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl text-[#4E81CD] mb-4 font-medium">Control Status</h2>
                <div className="flex items-center gap-1 mb-4" ><FiEdit /> <p>{moment(singleControlData.control_date).format('DD/MM/YYYY')} - {singleControlData.control_status}</p> </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl text-[#4E81CD] mb-4 font-medium">Comment</h2>
                {parse(singleControlData.comment)}
            </div>
        </div>
    );
};

export default ControlViewDetails;