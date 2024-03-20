import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [singleProjectData, setSingleProjectData] = useState({})
    const currentUrl = window.location.href;
    const { isLoading: projectDataIsLoading, error: projectsDataError, data: projectsData, refetch: projectsDataRefetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            axios.get('/projects_api/get_projects')
                .then((res) => res.data)
    })

    const handleSingleProjectData = (id) => {
        const findSingleProjectData = projectsData.find(project => project._id == id)
        setSingleProjectData(findSingleProjectData)
    }

    // global info
    const GlobalInfo = {
        currentUrl,
        projectsData,
        projectsDataRefetch,
        handleSingleProjectData,
        singleProjectData
    };
    return (
        <GlobalContext.Provider value={GlobalInfo}>
            {children}
        </GlobalContext.Provider>
    );
};
