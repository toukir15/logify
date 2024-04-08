import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../providers/GlobalProvider";
import moment from "moment";

const ControlOpen = () => {
    const { controlsData } = useContext(GlobalContext)
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
                </thead>
                <tbody>
                    {controlsData.map((controlOpenData, index) => {
                        return (
                            <tr onClick={() => navigate(`/projects/logs/control/open/${"45121245112"}/view-control/${'45642'}`)} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_name}</td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_owner[0].value} </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.control_status}...</td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlOpenData.control_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(controlOpenData.control_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">{controlOpenData.tags[0].value}</td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    );
};

export default ControlOpen;