import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNotify } from "../../hooks/useNotify"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const { user, userDataRefetch } = useContext(AuthContext)
    const [profileImage, setProfileImage] = useState({})
    const navigate = useNavigate();

    const handleProfileImageChange = (e) => {
        if (e.target?.files[0]?.type?.split("/")[0] == "image") {
            const reader = new FileReader()
            reader.onload = (r) => {
                setProfileImage({
                    placeholder: r.target.result,
                    file: e.target.files[0]
                })
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const updateProfileData = (e) => {
        e.preventDefault()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const newPassword = e.target.newPassword.value
        const confirmPassword = e.target.confirmPassword.value
        const email = e.target.emailAddress.value

        if (e.target.newPassword.value !== e.target.confirmPassword.value) {
            useNotify("Password doesn't match!", 'warning')
            return
        }
        if (!firstName || !lastName || !newPassword || !confirmPassword || !email) {
            useNotify("Some data is missing!", 'warning')
            return
        }
        const profileData = new FormData();
        profileData.append('file', e.target.profileImage.files[0]);
        profileData.append('first_name', e.target.firstName.value);
        profileData.append('last_name', e.target.lastName.value);
        profileData.append('password', e.target.newPassword.value);
        profileData.append('email', e.target.emailAddress.value);

        axios.post('/users_api/update_user', profileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(data => {
                if (data.status == 200) {
                    userDataRefetch()
                    navigate("/projects")
                    useNotify("Update Profile Successfully", "success")
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="w-full py-20">
            <form onSubmit={updateProfileData} method="post" className="flex w-[50%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="firstName">First Name</label>
                    <input defaultValue={user.first_name} placeholder="First name" name="firstName" id="firstName" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="lastName">Last Name</label>
                    <input defaultValue={user.last_name} placeholder="Last name" name="lastName" id="lastName" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="newPassword">New Password</label>
                    <input name="newPassword" id="newPassword" className="border-primary border w-[70%] p-3 rounded" placeholder="********" type="password" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="confirmPassword">Confirm Password</label>
                    <input name="confirmPassword" id="confirmPassword" className="border-primary border w-[70%] p-3 rounded" type="password" placeholder="********" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="emailAddress">Email Address</label>
                    <input value={user.email} name="emailAddress" id="emailAddress" className="border-primary border w-[70%] p-3 rounded" placeholder="Email address" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <div className="flex w-full items-center mb-6">
                        <label className="w-[30%]" htmlFor="profileImage"></label>
                        <input onChange={(e) => handleProfileImageChange(e)} type="file" id="profileImage" className="hidden" />
                        <label type="button" htmlFor="profileImage" className="py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer">Upload File</label>
                        {profileImage.placeholder && <div className="border p-2 ml-2 border-[#4E81CD]">
                            <img className="h-[30px]" src={profileImage.placeholder} alt="" />
                        </div>}
                        {!profileImage.placeholder && user.profile_image && <div className="border p-2 ml-2 border-[#4E81CD]">
                            <img className="h-[30px]" src={`${import.meta.env.VITE_BASE_URL}/public/uploads/${user.profile_image}`} alt="" />
                        </div>}
                    </div>
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]"></label>
                    <div className="w-[70%] flex gap-4 items-center mt-6">
                        <button className="bg-primary py-3 px-4 w-full rounded-lg text-white">Save</button>
                        <button className="border border-primary text-primary py-3 px-4 w-full rounded-lg">Cancel</button>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default SettingsPage;