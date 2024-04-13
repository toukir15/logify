import { TbFileDownload } from "react-icons/tb";
import { FaRegFilePdf } from "react-icons/fa6";
import { GiSettingsKnobs } from "react-icons/gi";
import logo from "../../assets/logo-x1DR2QCW.png"
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";

const ProjectDetails = () => {
    const navigate = useNavigate()
    // const { setOpenClosedStatus } = useContext(GlobalContext)
    const checkViewControl = window.location.href.split("/")[8]
    const controlAddRiskStatus = window.location.href.split('/')[5]
    const projectID = window.location.href.split('/')[7]
    const openClosedStatus = window.location.href.split("/")[6]

    return (
        <div className="py-10 px-20">
            {!checkViewControl && <div>
                <div className="flex items-center justify-end gap-3 mb-8">
                    <button className="border border-primary w-12 h-12 rounded-full flex justify-center items-center text-primary"><TbFileDownload size={24} /></button>
                    <button className="border border-primary w-12 h-12 rounded-full flex justify-center items-center text-primary"><FaRegFilePdf size={20} /></button>
                </div>
                <div className="flex w-full">
                    <div className="flex gap-2 items-center w-1/4">
                        <img className="w-[50px]" src={logo} alt="" />
                        <p>MIP</p>
                    </div>
                    <div className="flex gap-8 items-center w-2/4 justify-center">
                        <div>
                            <button onClick={() => {
                                navigate(`/projects/logs/${controlAddRiskStatus}/open/${projectID}`)
                            }} className={`${openClosedStatus == "open" && "bg-primary text-white "} border-primary border  py-2 px-6 rounded-l`}>Open</button>
                            <button onClick={() => {
                                navigate(`/projects/logs/${controlAddRiskStatus}/closed/${projectID}`)
                            }} className={`${openClosedStatus == "closed" && "bg-primary text-white"} border-primary border py-2 px-6  rounded-r`}>Closed</button>
                        </div>
                        <div>
                            <button onClick={() => {
                                navigate(`/projects/logs/risk/${openClosedStatus}/${projectID}`)
                            }} className={`${controlAddRiskStatus == "risk" && "bg-primary text-white"} border-primary border  py-2 px-6 rounded-l`}>Risk</button>
                            <button onClick={() => {
                                navigate(`/projects/logs/control/${openClosedStatus}/${projectID}`)
                            }} className={`${controlAddRiskStatus == "control" && 'bg-primary text-white'} border-primary border   py-2 px-6  rounded-r`}>Control</button>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center w-1/4 justify-end">
                        {controlAddRiskStatus == "risk" &&
                            <Link to={`/projects/logs/${controlAddRiskStatus}/${openClosedStatus}/add-risk/${projectID}`}>
                                <button className="border-primary bg-primary border text-white py-2 px-4  rounded-lg">Add Risk</button>
                            </Link>}

                        {controlAddRiskStatus == "control" &&
                            <Link to={`/projects/logs/${controlAddRiskStatus}/${openClosedStatus}/add-control/${projectID}`}>
                                <button className="border-primary bg-primary border text-white py-2 px-4  rounded-lg">Add Control</button>
                            </Link>}

                        <Link to={`/projects/logs/${controlAddRiskStatus}/${openClosedStatus}/filter/${projectID}`}>
                            <button className="flex gap-2 items-center text-primary"><p>Filters</p><p className="rotate-90"> <GiSettingsKnobs size={18} /></p>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>}
            <Outlet />
        </div>
    );
};

export default ProjectDetails;