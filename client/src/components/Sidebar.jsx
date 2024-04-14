import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-x1DR2QCW.png"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
import { GlobalContext } from "../providers/GlobalProvider";
import { AuthContext } from "../providers/AuthProvider";
import avatar from "../assets/avatar.png"

const Sidebar = () => {
    const { usersDataRefeatch } = useContext(GlobalContext)
    const { user } = useContext(AuthContext)
    const [isOpenProfile, setIsOpenProfile] = useState(true)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [notifyEmailExist, setNotifyEmailExist] = useState(false)
    const [addUserLoading, setAddUserLoading] = useState(false)

    const handleSendEmail = (e) => {
        e.preventDefault()
        setAddUserLoading(true)
        axios.post(`/users_api/add_user`, { email: e.target.email.value })
            .then(response => {
                usersDataRefeatch()
                setAddUserLoading(false)
                if (response.data?.isEmailExist) {
                    setNotifyEmailExist(true)
                }
                else {
                    setIsInviteModalOpen(false)
                    setNotifyEmailExist(false)
                }
            })
            .catch(error => console.log(error))
    }

    const handleSignOut = () => {
        axios.post(`/authentication_api/sign_out`)
            .then(() => {
                window.location.href = `${import.meta.env.VITE_CLIENT_URL}/login`
            })
            .catch(error => console.log(error))
    }

    return (
        <aside className="w-[14%] bg-[#161618] text-white p-4 flex flex-col  justify-between">
            <div>
                <div className="flex items-center gap-2 ml-2 mb-8 mt-4">
                    <img src={logo} className="w-8 h-8" alt="" />
                    <h3 className="text-[20px] uppercase font-medium">ProjectSync</h3>
                </div>
                <div className="flex flex-col gap-2">
                    <NavLink className="flex items-center gap-2 bg-primary p-2 rounded-lg"><IoSettingsOutline size={20} /><p>Projects</p></NavLink>
                    <div onClick={() => setIsOpenProfile(!isOpenProfile)} className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg cursor-pointer">
                        <div className="flex justify-between w-full items-center ">
                            <div className="flex gap-2">
                                <IoHomeOutline size={20} /><p>Profile</p>
                            </div>
                            <div className={` ${isOpenProfile ? "rotate-180" : "rotate-0"} transition duration-200`}>
                                <FaAngleDown />
                            </div>
                        </div>
                    </div>

                    {isOpenProfile &&
                        <div className="flex flex-col gap-2">
                            <div onClick={() => setIsInviteModalOpen(true)} className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg pl-10 cursor-pointer">
                                Invite
                            </div>
                            <NavLink to='/profile/settings' className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg  pl-10">Settings</NavLink>
                            <NavLink to='/profile/users' className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg  pl-10">Users</NavLink>
                        </div>}
                    <button onClick={handleSignOut} className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg"><CiLogout size={20} /><p>Sign Out</p></button>
                </div>
            </div>
            <div className="flex gap-2 items-center text-light-gray">
                {user?.profile_image && <img src={`http://localhost:5000/public/uploads/${user?.profile_image}`} className="w-10 h-10 object-cover rounded-full " alt="" />}
                {!user?.profile_image && <img src={avatar} className="w-10 h-10 object-cover rounded-full " alt="" />}
                <div>
                    <p>{user.first_name} {user.last_name}</p>
                    <p className="text-sm">{user.email}</p>
                </div>
            </div>

            {/* invite modal  */}
            {isInviteModalOpen && (
                <div
                    data-aos=""
                    id="invite_modal"
                    onClick={() => {
                        setNotifyEmailExist(false)
                        setIsInviteModalOpen(false)
                    }}
                    className="w-screen h-screen bg-[#40444E66] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10"
                >
                    <form onSubmit={(e) => {
                        handleSendEmail(e)
                    }} onClick={(e) => e.stopPropagation()} data-aos="zoom-in" className="w-[500px] relative bg-white py-[90px] px-16 rounded-lg  text-primary">
                        {notifyEmailExist && <div className=" absolute top-12 left-1/2 -translate-x-1/2 text-red-500">Email is Already Exist</div>}
                        <input required type="email" id="email" className="border py-2 w-full px-2 text-primary rounded outline-none" placeholder="Email Address" />
                        <div className="flex justify-center items-center text-white mt-5">
                            <button disabled={addUserLoading} className={`${addUserLoading ? "bg-[#5c5c5c]" : "bg-primary"}  px-10 py-2 rounded-lg`}>Invite</button>
                        </div>
                    </form>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;