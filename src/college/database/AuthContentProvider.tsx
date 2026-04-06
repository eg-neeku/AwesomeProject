import { createContext, useEffect, useState } from "react";
import { ASYNC_STORAGE_APP_TOKEN, ASYNC_STORAGE_EMAIL_ID, AuthContentProps } from "./model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoginDetailDTO } from "./registerhttp";

type AuthProps = {
    emailId: string,
    firstname: string,
    lastname: string,
    token: string,
    setAuth: (data: AuthContentProps) => void
};

export const AuthContext = createContext({
    emailId: "",
    firstname: "",
    lastname: "",
    token: "",
    setAuth: (data: AuthContentProps) => { }
});



export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthContentProps>({ emailId: "", firstname: "", lastname: "", token: "" });

    useEffect(() => {
        async function activateAuth() {
            const emailid = await AsyncStorage.getItem(ASYNC_STORAGE_EMAIL_ID);
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_APP_TOKEN);
            const details = await getLoginDetailDTO(emailid ?? "");
            setAuth({ firstname: details?.firstName ?? "", lastname: details?.lastName ?? "", emailId: emailid ?? "", token: token ?? "" });
        }
        activateAuth();
    }, []);

    const handleSetAuth = async (data: AuthContentProps) => {
        await AsyncStorage.setItem(ASYNC_STORAGE_EMAIL_ID, data.emailId);
        await AsyncStorage.setItem(ASYNC_STORAGE_APP_TOKEN, data.token);
    }

    const value: AuthProps = {
        emailId: auth.emailId,
        firstname: auth.firstname,
        lastname: auth.lastname,
        token: auth.token,
        setAuth: handleSetAuth
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}