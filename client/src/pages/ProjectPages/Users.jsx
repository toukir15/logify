import { useContext, useState } from "react";
import { GlobalContext } from "../../providers/GlobalProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from "../../components/shared/Pagination";

const Users = () => {
    const [userStatus, setUserStatus] = useState("Add Users")
    const { usersData, usersDataRefeatch } = useContext(GlobalContext)

    const verifiedUserData = usersData?.filter(data => data.is_verified)
    const [verifiedUserCurrentPage, setVerifiedUserCurrentPage] = useState(1)
    const verifiedUsersTotalButton = Math?.ceil(verifiedUserData.length / 7)
    const verifiedUsersTotalButtonArray = [...Array(verifiedUsersTotalButton)?.keys()]
    const verifiedUsersDataShowPosition = 7 * verifiedUserCurrentPage

    const pendingUsersData = usersData?.filter(data => !data.is_verified)
    const [pendingUserCurrentPage, setPendingUserCurrentPage] = useState(1)
    const pendingUsersTotalButton = Math?.ceil(pendingUsersData.length / 7)
    const pendingUsersTotalButtonArray = [...Array(pendingUsersTotalButton)?.keys()]
    const pendingUsersDataShowPosition = 7 * pendingUserCurrentPage

    const handleUserDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            axios.delete("/users_api/delete_user", { data: { id } })
                .then(response => {
                    if (response.data.deletedCount) {
                        usersDataRefeatch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
                .catch(error => console.log(error))
        }); ``


    }

    return (
        <div className="py-10 px-20">
            <div className="mb-6">
                <button onClick={() => setUserStatus("Add Users")} className={`${userStatus == "Add Users" && "bg-primary text-white"}  border-primary border py-2 px-4 rounded-s`}>Add Users</button>
                <button onClick={() => setUserStatus("Pending Users")} className={`${userStatus == "Pending Users" && "bg-primary text-white"}   border-primary border py-2 px-4 rounded-e`}>Pending Users</button>
            </div>

            {/* add user table  */}
            <div>
                {userStatus == "Add Users" && <table className="w-full">
                    {verifiedUserData.length > 0 && <thead>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">First Name</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Last Name</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Email</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Action</th>
                    </thead>}
                    <tbody>
                        {verifiedUserData.slice(verifiedUsersDataShowPosition - 7, verifiedUsersDataShowPosition).map((verifiedUser) => {
                            return (
                                <tr className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={verifiedUser?._id}>
                                    <td className="py-5 px-4 text-start" > {verifiedUser?.first_name}</td>
                                    <td className="py-5 px-4 text-start">{verifiedUser?.last_name}</td>
                                    <td className="py-5 px-4 text-start">{verifiedUser?.email}</td>
                                    <td className="py-5 px-4 text-start"><button onClick={() => handleUserDelete(verifiedUser?._id)} className="bg-primary text-white py-2 px-4 rounded">Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >}
                {verifiedUserData <= 0 && userStatus == "Add Users" && < div className="text-center text-2xl font-medium text-gray mt-10">No user here</div>}
                {verifiedUserData?.length > 7 && userStatus == "Add Users" && <div>
                    <Pagination paginationData={{ totalButtonArray: verifiedUsersTotalButtonArray, currentPage: verifiedUserCurrentPage, setCurrentPage: setVerifiedUserCurrentPage }} />
                </div>}
            </div>

            {/* pending user table  */}
            <div>
                {userStatus == "Pending Users" && <table className="w-full">
                    {pendingUsersData?.length > 0 && <thead>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">First Name</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Last Name</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Email</th>
                        <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Action</th>
                    </thead>}
                    <tbody>
                        {pendingUsersData.slice(pendingUsersDataShowPosition - 7, pendingUsersDataShowPosition).map((verifiedUser, i) => {
                            return (
                                <tr className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={verifiedUser?._id}>
                                    <td className={`py-5 px-4 text-start ${!verifiedUser?.first_name && "text-gray"}`} >
                                        {verifiedUser?.first_name ? verifiedUser?.first_name : "update soon"}
                                    </td>
                                    <td className={`py-5 px-4 text-start ${!verifiedUser?.last_name && "text-gray"}`}>
                                        {verifiedUser?.last_name ? verifiedUser?.last_name : "update soon"}
                                    </td>
                                    <td className={`py-5 px-4 text-start`}>{verifiedUser?.email}</td>
                                    <td className={`py-5 px-4 text-start`}>
                                        <button onClick={() => handleUserDelete(verifiedUser?._id)} className="bg-primary text-white py-2 px-4 rounded">Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table >}
                {pendingUsersData <= 0 && userStatus == "Pending Users" && < div className="text-center text-2xl font-medium text-gray mt-10">No user here</div>}
                {pendingUsersData.length > 7 && userStatus == "Pending Users" && <div>
                    <Pagination paginationData={{ totalButtonArray: pendingUsersTotalButtonArray, currentPage: pendingUserCurrentPage, setCurrentPage: setPendingUserCurrentPage }} />
                </div>}
            </div>
        </div >
    );
};
export default Users;