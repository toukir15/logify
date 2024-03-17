import { createContext } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const currentUrl = window.location.href;
    // global info
    const GlobalInfo = {
        currentUrl,
    };
    return (
        <GlobalContext.Provider value={GlobalInfo}>
            {children}
        </GlobalContext.Provider>
    );
};
