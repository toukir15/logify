import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";
import Pagination from "../../../components/shared/Pagination";
import Loading from "../../../components/shared/Loading"

const RiskClosed = () => {
    const { risksData, risksDataLoading } = useContext(GlobalContext)
    const projectID = window.location.href.split("/")[7]
    const risksClosedData = risksData?.filter(riskData => (riskData.project_id == projectID && riskData.status == "closed"))
    if (risksDataLoading) {
        return <Loading />
    }
    const [riskClosedCurrentPage, setRiskClosedCurrentPage] = useState(1)
    const riskClosedTotalButton = Math?.ceil(risksClosedData?.length / 7)
    const riskClosedTotalButtonArray = [...Array(riskClosedTotalButton)?.keys()]
    const riskClosedDataShowPosition = 7 * riskClosedCurrentPage
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                {risksClosedData.length > 0 && < thead >
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Category</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Description</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Rating</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Cause</th>
                </thead>}
                <tbody>
                    {risksClosedData.slice(riskClosedDataShowPosition - 7, riskClosedDataShowPosition)?.map((riskClosedData, index) => {
                        return (
                            <tr onClick={() => {
                                navigate(`/projects/logs/risk/closed/${projectID}/view-risk/${riskClosedData._id}`)
                            }} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{riskClosedData.risk_category.value}</td>
                                <td className="py-5 px-4 text-start">{riskClosedData.risk_name} </td>
                                <td className="py-5 px-4 text-start">{riskClosedData.risk_description}</td>
                                <td className="py-5 px-4 text-start">{riskClosedData.ratting.value}</td>
                                <td className="py-5 px-4 text-start">{riskClosedData.risk_cause}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {risksClosedData.length > 7 && <div>
                <Pagination paginationData={{ totalButtonArray: riskClosedTotalButtonArray, currentPage: riskClosedCurrentPage, setCurrentPage: setRiskClosedCurrentPage }} />
            </div>}
            {!risksClosedData.length && < div className="text-center text-2xl font-medium text-gray mt-10">No risks here</div>}
        </div>
    );
};

export default RiskClosed;