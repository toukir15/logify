import { useNavigate } from "react-router-dom";

const ControlOpen = () => {
    const controlsOpenData = [
        {
            control_name: 'Bearing Dimensions',
            control_owner: 'Voytek Szczepanik',
            control_status: '13/12/2023-Project Brief issued to JG to request EWP.',
            control_date: '29/04/2022',
            control_due_date: '29/04/2022',
            tags: 'GRB Pier Bearings ',
            impact: 'Design',
        },
        {
            control_name: 'Bearing Dimensions',
            control_owner: 'Voytek Szczepanik',
            control_status: '13/12/2023-Project Brief issued to JG to request EWP.',
            control_date: '29/04/2022',
            control_due_date: '29/04/2022',
            tags: 'GRB Pier Bearings ',
            impact: 'Design',
        },
        {
            control_name: 'Bearing Dimensions',
            control_owner: 'Voytek Szczepanik',
            control_status: '13/12/2023-Project Brief issued to JG to request EWP.',
            control_date: '29/04/2022',
            control_due_date: '29/04/2022',
            tags: 'GRB Pier Bearings ',
            impact: 'Design',
        },

    ]
    const navigate = useNavigate();
    return (
        <div className="py-10">
            <table className="w-full">
                <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Owner	</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Status</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Control Due Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Tags</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Impact</th>
                </thead>
                <tbody>
                    {controlsOpenData.map((controlOpenData, index) => {
                        return (
                            <tr onClick={() => navigate(`/projects/logs/control/open/${"45121245112"}/view-control/${'45642'}`)} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_name}</td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_owner} </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_status.slice(20)}...</td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{controlOpenData.control_date}</p>
                                </td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{controlOpenData.control_due_date}</p>
                                </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.tags}</td>
                                <td className="py-5 px-4 text-start">
                                    {controlOpenData.impact}
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    );
};

export default ControlOpen;