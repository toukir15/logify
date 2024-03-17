import { TfiControlBackward } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
const ControlViewDetails = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <button> <TfiControlBackward size={28} /></button>
                <div className="flex gap-10">
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiPlus size={20} /></button>
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><IoCheckmarkSharp size={20} /></button>
                    <button className="bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow"><FiEdit size={20} /></button>
                </div>
            </div>
            <div className="mt-10 flex justify-between">
                <div>
                    <h4 className="text-2xl font-medium mb-4">Name</h4>
                    <p>Bearing Dimensions</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Owner</h4>
                    <p>Voytek Szczepanik</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Date</h4>
                    <p>13/12/2023</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Due Date</h4>
                    <p>17/12/2023</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Tags</h4>
                    <p>GRB Pier Bearings ...</p>
                </div>
                <div>
                    <h4 className="text-2xl font-medium mb-4">Impact</h4>
                    <p className="text-primary">Design</p>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl text-[#4E81CD] mb-4 font-medium">Control Status</h2>
                <div className="flex items-center gap-1 mb-4" ><FiEdit /> <p>13/12/2023 - Project Brief issued to JG to request EWP.</p> </div>
                <div className="flex items-center gap-1 mb-4" ><FiEdit /> <p>13/12/2023 - Project Brief issued to JG to request EWP.</p> </div>
            </div>
            <div className="mt-12">
                <h2 className="text-3xl text-[#4E81CD] mb-4 font-medium">Comment</h2>
                <p className="my-1">FR email 8/12/23 from M Watts refer to email for image</p>
                <ol className="list-decimal list-inside px-3">
                    <li className="mb-1">Longitudinal and transverse spacing of the attachment bolts: top and bottom plates.</li>
                    <li className="mb-1">Longitudinal and transverse dimension of the attachment plates: top and bottom plates.</li>
                </ol>
                <p className="my-1 "> AECOM</p>
                <ol className="list-decimal list-inside px-3">
                    <li className="mb-1">Measuring the pier headstock dimensions</li>
                    <li className="mb-1">Edge distance from the pedestal to the headstock edge</li>
                    <li className="mb-1">Confirm the presence of plates as indicated on the attached drawings</li>
                </ol>
            </div>
        </div>
    );
};

export default ControlViewDetails;