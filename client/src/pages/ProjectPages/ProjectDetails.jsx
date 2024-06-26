import { FaRegFilePdf } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useRef } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { GlobalContext } from "../../providers/GlobalProvider";

const ProjectDetails = () => {
    const targetRef = useRef();
    const navigate = useNavigate()
    const { projectsData } = useContext(GlobalContext)
    const openClosedStatus = window.location.href.split('/')[6]
    const checkViewControl = window.location.href.split("/")[8]
    const controlAddRiskStatus = window.location.href.split('/')[5]
    const projectID = window.location.href.split("/")[7]
    const singleProjectData = projectsData.find(project => project._id == projectID)

    const options = {
        method: 'open',
        resolution: Resolution.HIGH,
        page: {
            margin: Margin.SMALL,
            format: 'letter',
            orientation: 'landscape',
        },
        canvas: {
            mimeType: 'image/png',
            qualityRatio: 1
        },
        overrides: {
            pdf: {
                compress: true
            },
            canvas: {
                useCORS: true
            }
        },
    };

    return (
        <div ref={targetRef} className="py-10 px-20">
            {!checkViewControl && <div>
                <div className="flex items-center justify-end gap-3 mb-8">
                    <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' }, options)} className="border border-primary w-12 h-12 rounded-full flex justify-center items-center text-primary"><FaRegFilePdf size={20} /></button>
                </div>
                <div className="flex w-full">
                    <div className="flex gap-4 items-center w-1/4">
                        {/* <img className="w-[50px]" src={logo} alt="" /> */}
                        <img className="w-[50px] object-fill" src={`${import.meta.env.VITE_BASE_URL}/public/uploads/${singleProjectData.add_image}`} alt="" />
                        <p>{singleProjectData.project_name}</p>
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
                    </div>
                </div>
            </div>}
            <div >
                <Outlet />
            </div>
        </div>
    );
};

export default ProjectDetails;