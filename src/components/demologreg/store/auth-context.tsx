import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type AuthProp = {
    token: string | null,
    isAuthenticated: boolean,
    authenticate: (token: string) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthProp>({
    token: "",
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { },
})

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [authToken, setAuthToken] = useState<string | null>("");

    // if you useEffect here, it will invoke continuously so shift it to App.tsx;
    // useEffect(()=>{
    //     async function fetchToken() {
    //         const storedToken = await storage.getItem("token");
    //         if(storedToken){
    //             setAuthToken(storedToken);
    //         }
    //     }
    //     fetchToken();
    // },[]);

    const authenticate = (token: string) => {
        setAuthToken(token);
        AsyncStorage.setItem("token", token);
    }

    const logout = () => {
        setAuthToken(null);
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}