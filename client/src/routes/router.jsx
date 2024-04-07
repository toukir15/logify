import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import RiskViewDetails from "../pages/ProjectPages/ProjectLogsPages/RiskViewDetails";
import SignUpPage from "../pages/AuthenticationPage/SignUpPage";
import LoginPage from "../pages/AuthenticationPage/LoginPage";
import VerifyPage from "../pages/AuthenticationPage/VerifyPage";
import Loading from "../components/shared/Loading";
import CheckEmailPage from "../pages/AuthenticationPage/CheckEmailPage";
import AddControlRisk from "../pages/ProjectPages/ProjectLogsPages/AddControlRisk";
import AddControlRiskEdit from "../pages/ProjectPages/ProjectLogsPages/AddControlRiskEdit";
const Projects = lazy(() => import("../pages/ProjectPages/Projects"))
const ProtectedRoute = lazy(() => import("./ProtectedRoute"))
const EditProject = lazy(() => import("../pages/ProjectPages/EditProjects"))
const AddProject = lazy(() => import("../pages/ProjectPages/AddProject"))
const ViewProject = lazy(() => import("../pages/ProjectPages/ProjectLogsPages/ViewProject"))
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
        element: <Suspense fallback={<Loading />}><ProtectedRoute> <MainLayout /></ProtectedRoute></Suspense>,
        children: [
            {
                path: "/",
                element: <Navigate to='/projects' />
            },
            {
                path: "/projects",
                element: <Suspense fallback={<Loading />}><Projects /></Suspense>
            },
            {
                path: "/profile/settings",
                element: <Suspense fallback={<Loading />}><SettingsPage /></Suspense>
            },
            {
                path: "/profile/users",
                element: <Suspense fallback={<Loading />}><Users /></Suspense>
            },
            {
                path: "/projects/add-project",
                element: <Suspense fallback={<Loading />}><AddProject /></Suspense>
            },
            {
                path: "/projects/edit-project",
                element: <Suspense fallback={<Loading />}><EditProject /></Suspense>
            },
            {
                path: "/projects/view-project",
                element: <Suspense fallback={<Loading />}><ViewProject /></Suspense>
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
                        element: <Suspense fallback={<Loading />}><ControlOpen /></Suspense>
                    },
                    {
                        path: "/projects/logs/control/closed/:slag",
                        element: <Suspense fallback={<Loading />}><ControlClosed /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/open/:slag",
                        element: <Suspense fallback={<Loading />}><RiskOpen /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/closed/:slag",
                        element: <Suspense fallback={<Loading />}><RiskClosed /></Suspense>
                    },
                    {
                        path: "/projects/logs/:open-risk-status/:open-closed-status/add-control-risk/:slag",
                        element: <AddControlRisk />
                    },
                    {
                        path: "/projects/logs/:open-risk-status/:open-closed-status/add-control-risk-edit/:slag",
                        element: <AddControlRiskEdit />
                    },
                    {
                        path: "/projects/logs/:open-risk-status/:open-closed-status/filter/:slag",
                        element: <Suspense fallback={<Loading />}><Filter /></Suspense>
                    },
                    {
                        path: "/projects/logs/control/:open-closed-status/:slag/view-control/:slag",
                        element: <Suspense fallback={<Loading />}><ControlViewDetails /></Suspense>
                    },
                    {
                        path: "/projects/logs/risk/:open-closed-status/:slag/view-risk/:slag",
                        element: <Suspense fallback={<Loading />}><RiskViewDetails /></Suspense>
                    },
                    {
                        path: "/projects/logs/:control-risk/:open-closed/add-control/:slag",
                        element: <Suspense fallback={<Loading />}><AddControl /></Suspense>
                    },
                    {
                        path: "/projects/logs/:control-risk/:open-closed/add-risk/:slag",
                        element: <Suspense fallback={<Loading />}><AddRisk /></Suspense>
                    },
                ]
            },

        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/verify",
        element: <VerifyPage />
    },
    {
        path: "/check-email",
        element: <CheckEmailPage />
    },
]);

export default router;