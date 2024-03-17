import { useNavigate } from "react-router-dom";

const RiskClosed = () => {
    const risksOpenData = [
        {
            risk_category: 'GRB Bearing & Repaint',
            risk_name: 'Resource Constraints',
            risk_description: 'Design resource unable to meet demand.',
            ratting: 'High',
            latest_control: 'Not added',
        },
        {
            risk_category: 'GRB Bearing & Repaint',
            risk_name: 'Resource Constraints',
            risk_description: 'Design resource unable to meet demand.',
            ratting: 'High',
            latest_control: 'Not added',
        },
        {
            risk_category: 'GRB Bearing & Repaint',
            risk_name: 'Resource Constraints',
            risk_description: 'Design resource unable to meet demand.',
            ratting: 'High',
            latest_control: 'Not added',
        },
    ]
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Category</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Risk Description</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Rating</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Latest Control</th>
                </thead>
                <tbody>
                    {risksOpenData.map((riskOpenData, index) => {
                        return (
                            <tr onClick={() => navigate(`/projects/logs/risk/closed/${"45121245112"}/view-risk/${'45642'}`)} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_category}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_name} </td>
                                <td className="py-5 px-4 text-start">{riskOpenData.risk_description}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.ratting}</td>
                                <td className="py-5 px-4 text-start">{riskOpenData.latest_control}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
};

export default RiskClosed;