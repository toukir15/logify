import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";
import Pagination from "../../../components/shared/Pagination";

const RiskOpen = () => {
    const { risksData } = useContext(GlobalContext)
    const risksOpenData = risksData.filter(riskOpenData => riskOpenData.status == "open")
    const [riskOpenCurrentPage, setRiskOpenCurrentPage] = useState(1)
    const riskOpenTotalButton = Math.ceil(risksOpenData?.length / 7)
    const riskOpenTotalButtonArray = [...Array(riskOpenTotalButton).keys()]
    const riskOpenDataShowPosition = 7 * riskOpenCurrentPage
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                {risksOpenData.length > 0 && < thead >
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Category</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Description</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Rating</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Cause</th>
                </thead>}
                <tbody>
                    {risksOpenData.slice(riskOpenDataShowPosition - 7, riskOpenDataShowPosition)?.map((riskOpenData, index) => {
                        return (
                            <tr onClick={() => navigate(`/projects/logs/risk/open/${"45121245112"}/view-risk/${'45642'}`)} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_category.value}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_name} </td>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_description}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.ratting.value}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_cause}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {risksOpenData.length > 7 && <div>
                <Pagination paginationData={{ totalButtonArray: riskOpenTotalButtonArray, currentPage: riskOpenCurrentPage, setCurrentPage: setRiskOpenCurrentPage }} />
            </div>}
            {!risksOpenData.length && < div className="text-center text-2xl font-medium text-gray mt-10">No risks here</div>}
        </div >
    );
};

export default RiskOpen;