import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import LoginPage from '../pages/AuthenticationPage/LoginPage'
import Loading from '../components/shared/Loading'

export default function ProtectedRoute({ children }) {
    const { user, userDataLoading } = useContext(AuthContext)
    if (userDataLoading) {
        return <Loading />
    }
    if (!user) {
        return <LoginPage />
    }
    return children
}
