const SettingsPage = () => {
    return (
        <div className="w-full py-20">
            <form className="flex w-[50%] mx-auto flex-col">
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="firstName">First Name</label>
                    <input placeholder="Enter first name" name="firstName" id="firstName" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="lastName">Last Name</label>
                    <input placeholder="Enter last name" name="lastName" id="lastName" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="newPassword">New Password</label>
                    <input name="newPassword" id="newPassword" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="confirmPassword">Confirm Password</label>
                    <input name="confirmPassword" id="confirmPassword" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="emailAddress">Email Address</label>
                    <input name="emailAddress" id="emailAddress" className="border-primary border w-[70%] p-3 rounded" type="text" />
                </div>
                <div className="flex w-full items-center mb-6">
                    <label className="w-[30%]" htmlFor="emailAddress">Upload Profile Picture</label>
                    <div className="w-[70%] flex gap-4 items-center">
                        <button className="bg-primary text-white py-2 px-6 rounded-full">Upload File</button>
                        <div className="border border-primary p-2 rounded">
                            <img className="h-10 w-10" src="https://api.logify.au/uploads/profile_image-1701937729070-898258012.jpg" alt="" />
                        </div>
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