import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [singleProjectData, setSingleProjectData] = useState({})
    const currentUrl = window.location.href;
    const projectID = currentUrl.split("/")[7]

    const { isLoading: projectDataIsLoading, error: projectsDataError, data: projectsData, refetch: projectsDataRefetch } = useQuery({
        queryKey: ['projectData'],
        queryFn: () =>
            axios.get('/projects_api/get_projects')
                .then((res) => res.data)
    })
    const { isLoading: usersDataLoading, error: usersDataError, data: usersData, refetch: usersDataRefeatch } = useQuery({
        queryKey: ['usersData'],
        queryFn: () =>
            axios.get('/users_api/get_users')
                .then((res) => res.data)
    })
    const { isLoading: controlsDataLoading, error: controlsDataError, data: controlsData, refetch: controlsDataRefeatch } = useQuery({
        queryKey: ['controlsData'],
        queryFn: () =>
            axios.get(`/controls_api/get_controls?project_id=${projectID}`)
                .then((res) => res.data)
    })
    const { isLoading: risksDataLoading, error: risksDataError, data: risksData, refetch: risksDataRefeatch } = useQuery({
        queryKey: ['risksData'],
        queryFn: () =>
            axios.get('/risks_api/get-risks')
                .then((res) => res.data)
    })


    const handleSingleProjectData = (id) => {
        controlsDataRefeatch()
        const findSingleProjectData = projectsData.find(project => project._id == id)
        setSingleProjectData(findSingleProjectData)
    }

    // global info
    const GlobalInfo = {
        currentUrl,
        projectsData,
        projectsDataRefetch,
        handleSingleProjectData,
        singleProjectData,
        usersData,
        usersDataRefeatch,
        controlsData,
        controlsDataRefeatch,
        risksData,
        risksDataRefeatch,
    };
    return (
        <GlobalContext.Provider value={GlobalInfo}>
            {children}
        </GlobalContext.Provider>
    );
};
