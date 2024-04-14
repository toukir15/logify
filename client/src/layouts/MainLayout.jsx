import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "../providers/GlobalProvider";

const MainLayout = () => {
    const { projectID } = useContext(GlobalContext)
    const navigate = useNavigate()
    const riskControlsStatus = window.location.href.split("/")[5]
    const openClosedStatus = window.location.href.split("/")[6]
    const viewControlRiskStatus = window.location.href.split("/")[8]
    const editProjectStatus = window.location.href.split("/")[4]
    const settingStatus = window.location.href.split("/")[4]
    const addProjectStatus = window.location.href.split("/")[4]
    const addControlRiskStatus = window.location.href.split("/")[7]
    const filterStatus = window.location.href.split('/')[7]

    return (
        <div className="h-screen  flex ">
            <Sidebar />
            <div className="w-[86%] overflow-y-scroll">
                <div className="py-6 px-8 bg-white font-medium flex gap-2">
                    <div className="flex items-center gap-1">
                        <button onClick={() => navigate("/projects")} className="text-blue-400">Projects</button>
                    </div>

                    {(riskControlsStatus == "control" || riskControlsStatus == "risk") && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/logs/${riskControlsStatus}/${openClosedStatus}/${projectID}`)} className="text-blue-400 capitalize">{riskControlsStatus}<span className="lowercase">s</span></button>
                    </div>}

                    {(editProjectStatus == "edit-project" || editProjectStatus == "view-project") && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/logs/${riskControlsStatus}/${openClosedStatus}/660ee31e860d65af91257f97`)} className="text-blue-400 capitalize">{editProjectStatus}</button>
                    </div>}

                    {(settingStatus == "settings" || settingStatus == "users") && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/profile/${settingStatus}`)} className="text-blue-400 capitalize">{settingStatus}</button>
                    </div>}

                    {addProjectStatus == "add-project" && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/${addProjectStatus}`)} className="text-blue-400 capitalize">{addProjectStatus}</button>
                    </div>}

                    {(addControlRiskStatus == "add-control" || addControlRiskStatus == "add-risk") && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/logs/${riskControlsStatus}/${openClosedStatus}/${addControlRiskStatus}/${projectID}`)} className="text-blue-400 capitalize">{addControlRiskStatus}</button>
                    </div>}

                    {(viewControlRiskStatus == 'view-control' || viewControlRiskStatus == "view-risk" || viewControlRiskStatus == "edit-control" || viewControlRiskStatus == "edit-risk") && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/logs/control/${openClosedStatus}/${projectID}/${viewControlRiskStatus}`)} className="text-blue-400 capitalize">{viewControlRiskStatus}</button>
                    </div>}

                    {filterStatus == "filter" && <div className="flex items-center gap-1">
                        <MdOutlineArrowBackIosNew className="cursor-pointer rotate-180 mt-1 text-medium" size={14} />
                        <button onClick={() => navigate(`/projects/logs/${riskControlsStatus}/${openClosedStatus}/filter/${projectID}`)} className="text-blue-400 capitalize">{filterStatus}</button>
                    </div>}
                </div>
                <div className="bg-light-gray min-h-[calc(100%-72px)] ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;