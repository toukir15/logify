import { useState } from "react";

const Users = () => {
    const [userStatus, setUserStatus] = useState("Add Users")
    const usersData = [
        {
            first_name: 'Toukir',
            last_name: 'Ahmed',
            email: 'toukir@gmail.com',
            status: true
        },
        {
            first_name: 'Toukir',
            last_name: 'Ahmed',
            email: 'toukir@gmail.com',
            status: true
        },
        {
            first_name: 'Toukir',
            last_name: 'Ahmed',
            email: 'toukir@gmail.com',
            status: false
        },
    ]
    return (
        <div className="py-10 px-20">
            <div className="mb-6">
                <button onClick={() => setUserStatus("Add Users")} className={`${userStatus == "Add Users" && "bg-primary text-white"}  border-primary border py-2 px-4 rounded-s`}>Add Users</button>
                <button onClick={() => setUserStatus("Pending Users")} className={`${userStatus == "Pending Users" && "bg-primary text-white"}   border-primary border py-2 px-4 rounded-e`}>Pending Users</button>
            </div>
            <table className="w-full">
                <thead>
                    <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">First Name</th>
                    <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Last Name</th>
                    <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Email</th>
                    <th className="text-start pt-4 pb-8 px-[14px] text-gray font-normal">Action</th>
                </thead>
                <tbody>
                    {usersData.map((userData, index) => {
                        return (
                            <tr className="bg-white border-b-[20px] border-light-gray cursor-pointer" key={index}>
                                <td className="py-5 px-4 text-start" > {userData.first_name}</td>
                                <td className="py-5 px-4 text-start">{userData.last_name}</td>
                                <td className="py-5 px-4 text-start">{userData.email}</td>
                                <td className="py-5 px-4 text-start"><button className="bg-primary text-white py-2 px-4 rounded">Delete</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table >
        </div>
    );
};

export default Users;