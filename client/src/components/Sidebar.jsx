import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-x1DR2QCW.png"
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar = () => {
    const [isOpenProfile, setIsOpenProfile] = useState(true)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    return (
        <aside className="w-[14%] bg-[#0E1B6B] text-white p-4 flex flex-col  justify-between">
            <div>
                <div className="flex items-center gap-2 ml-8 mb-8">
                    <img src={logo} className="w-10 h-10" alt="" />
                    <h3 className="text-[20px] font-medium">Logify</h3>
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
                    <NavLink className="flex items-center gap-2 hover:bg-primary p-2 rounded-lg"><CiLogout size={20} /><p>Sign Out</p></NavLink>
                </div>
            </div>
            <div className="flex gap-2 items-center text-light-gray">
                <img src="https://api.logify.au/uploads/profile_image-1701937729070-898258012.jpg" className="w-10 h-10 object-cover rounded-full " alt="" />
                <div>
                    <p>Nabil Newaz</p>
                    <p className="text-sm">nabilnewaz@gmail.com</p>
                </div>
            </div>

            {/* invite modal  */}
            {isInviteModalOpen && (
                <div
                    data-aos=""
                    id="invite_modal"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="w-screen h-screen bg-[#40444E66] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10"
                >
                    <div onClick={(e) => e.stopPropagation()} data-aos="zoom-in" className="w-[500px] relative bg-white py-[90px] px-16 rounded-lg  text-primary">
                        <input type="text" className="border py-2 w-full px-2 text-primary rounded outline-none" placeholder="Email Address" />
                        <div className="flex justify-center items-center text-white mt-5">
                            <button className="bg-primary px-10 py-2 rounded-lg">Invite</button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;