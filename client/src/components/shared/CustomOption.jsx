import { CgProfile } from "react-icons/cg";
import { components } from "react-select";
export const CustomOption = props => (
    <components.Option {...props}>
        <div className='flex gap-1 items-center font-medium'><CgProfile size={22} /> {props.data.label}</div>
    </components.Option>
);