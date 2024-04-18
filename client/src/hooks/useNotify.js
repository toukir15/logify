import { toast } from 'react-toastify';
export const useNotify = (message, type) => {
    // toast("Default Notification !");
    // console.log(type)

    // toast.error("Error Notification !", {
    //     position: "top-left"
    // });

    // toast.info("Info Notification !", {
    //     position: "bottom-center"
    // });
    // toast("Custom Style Notification with css class!", {
    //     position: "bottom-right",
    //     className: 'foo-bar'
    // });

    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-right",
                autoClose: 2000
            });
            break;
        case "warning":
            toast.warn(message, {
                position: "top-right",
                autoClose: 2000
            });
            break;
    }
};