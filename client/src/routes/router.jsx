import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import RiskViewDetails from "../pages/ProjectPages/ProjectLogsPages/RiskViewDetails";
const Projects = lazy(() => import("../pages/ProjectPages/Projects"))
const EditProject = lazy(() => import("../pages/ProjectPages/EditProjects"))
const AddProject = lazy(() => import("../pages/ProjectPages/AddProject"))
const ProjectDetails = lazy(() => import("../pages/ProjectPages/ProjectDetails"))
const ControlOpen = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/ControlOpen"))
const ControlClosed = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/ControlClosed"))
const RiskOpen = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/RiskOpen"))
const RiskClosed = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/RiskClosed"))
const ControlViewDetails = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/ControlViewDetails"))
const AddControl = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/AddControl"))
const AddRisk = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/AddRisk"))
const SettingsPage = lazy(() => import("../pages/ProjectPages/SettingsPage"))
const Users = lazy(() => import("../pages/ProjectPages/Users"))
const Filter = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/Filter"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to='/projects' />
            },
            {
                path: "/projects",
                element: <Suspense fallback={"loading..."}><Projects /></Suspense>
            },
            {
                path: "/profile/settings",
                element: <Suspense fallback={"loading..."}><SettingsPage /></Suspense>
            },
            {
                path: "/profile/users",
                element: <Suspense fallback={"loading..."}><Users /></Suspense>
            },
            {
                path: "/projects/add-project",
                element: <Suspense fallback={"loading..."}><AddProject /></Suspense>
            },
            {
                path: "/projects/edit-project",
                element: <Suspense fallback={"loading..."}><EditProject /></Suspense>
            },
            {
                path: "/projects/logs",
                element: <ProjectDetails />,
                children: [
                    {
                        path: "/projects/logs",
                        element: <Navigate to='/projects/logs/control/open' />
                    },
                    {
                        path: "/projects/logs/control/open/:slag",
                        element: <Suspense fallback={"loading..."}><ControlOpen /></Suspense>
                    },
                    {
                        path: "/projects/logs/control/closed/:slag",
                        element: <Suspense fallback={"loading..."}><ControlClosed /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/open/:slag",
                        element: <Suspense fallback={"loading..."}><RiskOpen /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/closed/:slag",
                        element: <Suspense fallback={"loading..."}><RiskClosed /></Suspense>
                    },
                    {
                        path: "/projects/logs/:open-risk-status/:open-closed-status/filter/:slag",
                        element: <Suspense fallback={"loading..."}><Filter /></Suspense>
                    },
                    {
                        path: "/projects/logs/control/:open-closed-status/:slag/view-control/:slag",
                        element: <Suspense fallback={"loading..."}><ControlViewDetails /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/:open-closed-status/:slag/view-risk/:slag",
                        element: <Suspense fallback={"loading..."}><RiskViewDetails /></Suspense>
                    },
                    {
                        path: "/projects/logs/:control-risk/:open-closed/add-control/:slag",
                        element: <Suspense fallback={"loading..."}><AddControl /></Suspense>
                    },
                    {
                        path: "/projects/logs/:control-risk/:open-closed/add-risk/:slag",
                        element: <Suspense fallback={"loading..."}><AddRisk /></Suspense>
                    },
                ]
            },

        ]
    },
]);

export default router;