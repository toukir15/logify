import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const MainLayout = () => {
    return (
        <div className="h-screen  flex ">
            <Sidebar />
            <div className="w-[86%] overflow-y-scroll">
                <div className="py-6 px-8 bg-white font-medium">
                    home
                </div>
                <div className="bg-light-gray min-h-[calc(100%-72px)] ">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;