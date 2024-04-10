import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
    const [singleProjectData, setSingleProjectData] = useState({})
    const [singleControlData, setSingleControlData] = useState({})
    const [openClosedStatus, setOpenClosedStatus] = useState("open")
    const currentUrl = window.location.href;
    const projectID = currentUrl.split('/')[7]
    const status = currentUrl.split('/')[6]

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
            axios.get(`/risks_api/get-risks?project_id=${projectID}`)
                .then((res) => res.data)
    })

    useEffect(() => {
        controlsDataRefeatch()
        risksDataRefeatch()
    }, [projectID, status])

    const handleSingleProjectData = (id) => {
        const findSingleProjectData = projectsData.find(project => project._id == id)
        setSingleProjectData(findSingleProjectData)
    }
    const handleSingleControlData = (id) => {
        const findSingleControlData = controlsData.find(control => control._id == id)
        setSingleControlData(findSingleControlData)
    }

    // global info
    const GlobalInfo = {
        currentUrl,
        projectsData,
        projectDataIsLoading,
        projectsDataRefetch,
        handleSingleProjectData,
        singleProjectData,
        usersData,
        usersDataRefeatch,
        controlsData,
        controlsDataLoading,
        controlsDataRefeatch,
        risksData,
        risksDataLoading,
        risksDataRefeatch,
        openClosedStatus,
        setOpenClosedStatus,
        projectID,
        handleSingleControlData,
        singleControlData
    };
    return (
        <GlobalContext.Provider value={GlobalInfo}>
            {children}
        </GlobalContext.Provider>
    );
};
