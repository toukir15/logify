import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";
import moment from "moment";
import Pagination from "../../../components/shared/Pagination";
import Loading from "../../../components/shared/Loading"

const ControlClosed = () => {
    const { controlsData, controlsDataLoading } = useContext(GlobalContext)
    const projectID = window.location.href.split("/")[7]
    const controlsClosedData = controlsData?.filter(controlData => (controlData.project_id == projectID && controlData.status == "closed"))
    if (controlsDataLoading) {
        return <Loading />
    }
    const [controlClosedCurrentPage, setControlClosedCurrentPage] = useState(1)
    const controlClosedTotalButton = Math?.ceil(controlsClosedData?.length / 7)
    const controlClosedTotalButtonArray = [...Array(controlClosedTotalButton)?.keys()]
    const controlClosedDataShowPosition = 7 * controlClosedCurrentPage
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                {controlsClosedData.length > 0 && <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Owner	</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Status</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Due Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Tags</th>
                </thead>}
                <tbody>
                    {controlsClosedData.slice(controlClosedDataShowPosition - 7, controlClosedDataShowPosition)?.map((controlClosedData, index) => {
                        return (
                            <tr onClick={() => {
                                navigate(`/projects/logs/control/closed/${projectID}/view-control/${controlClosedData._id}`)
                            }
                            } className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{controlClosedData.control_name}</td>
                                <td className="py-5 px-4 text-start">{controlClosedData.control_owner.value} </td>
                                <td className="py-5 px-4 text-start">{controlClosedData.control_status}{controlClosedData.length > 20 && "..."}</td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlClosedData.control_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlClosedData.due_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">{controlClosedData.tags[0].value} {controlClosedData.tags.length > 1 && "..."}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {controlsClosedData.length > 7 && <div>
                <Pagination paginationData={{ totalButtonArray: controlClosedTotalButtonArray, currentPage: controlClosedCurrentPage, setCurrentPage: setControlClosedCurrentPage }} />
            </div>}
            {!controlsClosedData.length && < div className="text-center text-2xl font-medium text-gray mt-10">No controls here</div>}
        </div>
    );
};

export default ControlClosed;