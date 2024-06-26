import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Swal from 'sweetalert2'
import { useContext, useState } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import Pagination from "../../components/shared/Pagination";
import Loading from "../../components/shared/Loading";

const Projects = () => {
    const navigate = useNavigate()
    const { projectsData, projectsDataRefetch, projectDataIsLoading, setProjectID, initialFetch, setInitialFetch, setUserInitialFetch } = useContext(GlobalContext)
    if (projectDataIsLoading) {
        return <Loading />
    }
    const [projectCurrentPage, setProjectCurrentPage] = useState(1)
    const projectTotalButton = Math?.ceil(projectsData?.length / 7)
    const projectTotalButtonArray = [...Array(projectTotalButton)?.keys()]
    const projectDataShowPosition = 7 * projectCurrentPage

    const handleProjectDelete = (e, id) => {
        e.stopPropagation()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/projects_api/delete_projects?id=${id}`)
                    .then(response => {
                        if (response.data.result.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        projectsDataRefetch();
                    }
                    )
            }
        });
    }

    const handleEditProject = (e, id) => {
        e.stopPropagation()
        navigate(`/projects/edit-project/${id}`)
    }

    const handleViewProject = (e, id) => {
        e.stopPropagation()
        navigate(`/projects/view-project/${id}`)
    }

    return (
        <div className="py-4 md:py-10 px-4 md:px-20">
            <div className="flex justify-end">
                <button onClick={() => {
                    setUserInitialFetch()
                    navigate(`/projects/add-project`)
                }} className="bg-primary text-sm md:text-[16px] rounded-lg text-white py-3 px-4 mb-4 md:mb-8">Add Projects</button>
            </div>
            <div className="overflow-x-scroll md:overflow-x-hidden text-sm md:text-[16px]">
                <table className="w-full">
                    {projectsData.length > 0 && <thead>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Project Name</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Image</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">ID Number</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Client</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Project Value</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Start Date</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">End Date</th>
                        <th className="text-start pt-4 pb-8 px-3 text-gray font-normal">Action</th>
                    </thead>}
                    <tbody>
                        {projectsData.slice(projectDataShowPosition - 7, projectDataShowPosition)?.map((projectData, index) => {
                            return (
                                <tr
                                    onClick={() => {
                                        setInitialFetch(!initialFetch)
                                        setProjectID(projectData._id)
                                        navigate(`/projects/logs/control/open/${projectData._id}`)
                                    }
                                    }
                                    className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                    <td className="py-5 px-4 text-start" > {projectData.project_name}</td>
                                    <td className="py-5 px-4 text-start"><img className="h-10 w-10" src={`${import.meta.env.VITE_BASE_URL}/public/uploads/${projectData.add_image}`} alt="" /> </td>
                                    <td className="py-5 px-4 text-start">{projectData.ID_number}</td>
                                    <td className="py-5 px-4 text-start">{projectData.client}</td>
                                    <td className="py-5 px-4 text-start">{projectData.project_value}</td>
                                    <td className="py-5 px-4 text-start">
                                        <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(projectData.start_date).format("DD/MM/YYYY")}</p>
                                    </td>
                                    <td className="py-5 px-4 text-start">
                                        <p className="bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full">{moment(projectData.end_date).format("DD/MM/YYYY")}</p>
                                    </td>
                                    <td className="py-5 px-4 text-start"><div className="flex gap-3">
                                        <button type="button">
                                            <FaRegEye onClick={(e) => {
                                                handleViewProject(e, projectData._id)
                                            }} size={18} />
                                        </button>
                                        <button>
                                            <BiSolidEditAlt onClick={(e) => {
                                                handleEditProject(e, projectData._id)
                                            }} className="text-primary" size={22} />
                                        </button>
                                        <button>
                                            <RiDeleteBinLine
                                                onClick={(e) => handleProjectDelete(e, projectData._id)}
                                                className="text-[#ef2828e5]" size={18} />
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >
                {projectsData <= 0 && < div className="text-center text-2xl font-medium text-gray mt-10">No project here</div>}

            </div>
            {projectsData.length > 7 && <div>
                <Pagination paginationData={{ totalButtonArray: projectTotalButtonArray, currentPage: projectCurrentPage, setCurrentPage: setProjectCurrentPage }} />
            </div>}

        </div >
    );
};

export default Projects;