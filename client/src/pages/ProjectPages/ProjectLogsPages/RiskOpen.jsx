import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";

const RiskOpen = () => {
    const { risksData } = useContext(GlobalContext)
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Category</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Description</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Rating</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Cause</th>
                </thead>
                <tbody>
                    {risksData.map((riskOpenData, index) => {
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
        </div>
    );
};

export default RiskOpen;