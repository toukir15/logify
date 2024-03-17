import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';

const Projects = () => {
    const { isLoading, error, data: projectsData } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axios.get('/projects_api/get_projects')
                .then((res) => res.data)
    })
    const navigate = useNavigate()
    return (
        <div className="py-10 px-20">
            <div className="flex justify-end">
                <Link to='/projects/add-project' className="bg-primary rounded-lg text-white py-2 px-4 mb-8">Add Projects</Link>
            </div>
            <table className="w-full">
                <thead>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Project Name</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Image</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">ID Number</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Client</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Project Value</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Start Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">End Date</th>
                    <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Action</th>
                </thead>
                <tbody>
                    {projectsData?.map((projectData, index) => {
                        return (
                            <tr onClick={() => navigate(`/projects/logs/control/open/${"45121245112"}`)} className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start" > {projectData.project_name}</td>
                                <td className="py-5 px-4 text-start"><img className="h-10 w-10" src={`http://localhost:5000/public/uploads/${projectData.add_image}`} alt="" /> </td>
                                <td className="py-5 px-4 text-start">{projectData.ID_number}</td>
                                <td className="py-5 px-4 text-start">{projectData.client}</td>
                                <td className="py-5 px-4 text-start">{projectData.project_value}</td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(projectData.start_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start">
                                    <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(projectData.start_date).format("DD/MM/YYYY")}</p>
                                </td>
                                <td className="py-5 px-4 text-start"><div className="flex gap-3">
                                    <button><FaRegEye size={18} /></button>
                                    <button> <BiSolidEditAlt className="text-primary" size={22} /></button>
                                    <button><RiDeleteBinLine className="text-[#ef2828e5]" size={18} /></button>
                                </div>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table >

        </div >
    );
};

export default Projects;