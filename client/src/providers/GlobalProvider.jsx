import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [projectID, setProjectID] = useState("")
    const currentUrl = window.location.href;
    const id = currentUrl.split('/')[7]
    const openClosedStatus = currentUrl.split('/')[6]
    const [initialFetch, setInitialFetch] = useState(false)
    const [userInitalFetch, setUserInitialFetch] = useState(false)

    const { isLoading: projectDataIsLoading, error: projectsDataError, data: projectsData, refetch: projectsDataRefetch } = useQuery({
        queryKey: ['projectData'],
        queryFn: () =>
            axios.get('/projects_api/get_projects')
                .then((res) => res.data)
    })
    const { isLoading: usersDataLoading, error: usersDataError, data: usersData, refetch: usersDataRefeatch } = useQuery({
        queryKey: ['usersData', userInitalFetch],
        queryFn: () =>
            axios.get('/users_api/get_users')
                .then((res) => res.data)
    })
    const { isLoading: controlsDataLoading, error: controlsDataError, data: controlsData, refetch: controlsDataRefeatch } = useQuery({
        queryKey: ['controlsData', initialFetch],
        queryFn: () =>
            axios.get(`/controls_api/get_controls?project_id=${id}`)
                .then((res) => res.data)
    })
    const { isLoading: risksDataLoading, error: risksDataError, data: risksData, refetch: risksDataRefeatch } = useQuery({
        queryKey: ['risksData', initialFetch],
        queryFn: () =>
            axios.get(`/risks_api/get-risks?project_id=${id}`)
                .then((res) => res.data)
    })
    // global info
    const GlobalInfo = {
        currentUrl,
        projectsData,
        projectDataIsLoading,
        projectsDataRefetch,
        usersData,
        usersDataRefeatch,
        controlsData,
        controlsDataLoading,
        controlsDataRefeatch,
        risksData,
        risksDataLoading,
        risksDataRefeatch,
        projectID,
        openClosedStatus,
        setInitialFetch,
        setUserInitialFetch,
        setProjectID
    };
    return (
        <GlobalContext.Provider value={GlobalInfo}>
            {children}
        </GlobalContext.Provider>
    );
};
