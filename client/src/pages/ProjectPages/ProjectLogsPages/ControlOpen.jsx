import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";
import moment from "moment";
import Pagination from "../../../components/shared/Pagination";
import Loading from "../../../components/shared/Loading"

const ControlOpen = () => {
    const { controlsData, controlsDataLoading } = useContext(GlobalContext)
    const projectID = window.location.href.split("/")[7]

    const controlsOpenData = controlsData?.filter(controlData => {
        return (controlData.project_id == projectID && controlData.status == "open")
    })

    if (controlsDataLoading) {
        return <Loading />
    }

    const [riskOpenCurrentPage, setRiskOpenCurrentPage] = useState(1)
    const riskOpenTotalButton = Math?.ceil(controlsOpenData?.length / 7)
    const riskOpenTotalButtonArray = [...Array(riskOpenTotalButton)?.keys()]
    const riskOpenDataShowPosition = 7 * riskOpenCurrentPage
    const navigate = useNavigate();

    return (
        <div className="py-10">
            <table className="w-full">
                {controlsOpenData.length > 0 && <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Owner	</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Status</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Due Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Tags</th>
                </thead>}
                <tbody>
                    {controlsOpenData.slice(riskOpenDataShowPosition - 7, riskOpenDataShowPosition)?.map((controlOpenData, index) => {
                        return (
                            <tr onClick={() => {
                                navigate(`/projects/logs/control/open/${projectID}/view-control/${controlOpenData._id}`)
                            }} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_name}</td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_owner.value} </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_status}{controlOpenData.length > 20 && "..."}</td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlOpenData.control_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlOpenData.due_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.tags[0]?.value} {controlOpenData.tags.length > 1 && "..."}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {controlsOpenData.length > 7 && <div>
                <Pagination paginationData={{ totalButtonArray: riskOpenTotalButtonArray, currentPage: riskOpenCurrentPage, setCurrentPage: setRiskOpenCurrentPage }} />
            </div>}
            {!controlsOpenData.length && < div className="text-center text-2xl font-medium text-gray mt-10">No controls here</div>}
        </div>
    );
};

export default ControlOpen;