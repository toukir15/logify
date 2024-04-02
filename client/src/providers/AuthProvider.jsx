import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const { isLoading: userDataLoading, error: userDataError, data: user, refetch: userDataRefetch } = useQuery({
        queryKey: ['userData'],
        queryFn: () =>
            axios.get('/users_api/get_user')
                .then((res) => res.data)
    })
    console.log(user)
    // auth info
    const AuthInfo = {
        user,
        userDataRefetch,
        userDataLoading
    };
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};
