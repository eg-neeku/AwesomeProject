import { createContext, useEffect, useState } from "react";
import { ASYNC_STORAGE_APP_TOKEN, ASYNC_STORAGE_EMAIL_ID, AuthContentProps, RegisterDTOProps } from "./model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLoginDetailDTO } from "./registerhttp";

type AuthProps = {
    authItems: RegisterDTOProps,
    token: string,
    setAuth: (data: AuthContentProps) => void
};

export const AuthContext = createContext<AuthProps>({
    authItems: {} as RegisterDTOProps,
    token: "",
    setAuth: (data: AuthContentProps) => { }
});

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<AuthContentProps>();

    useEffect(() => {
        async function activateAuth() {
            const emailid = await AsyncStorage.getItem(ASYNC_STORAGE_EMAIL_ID);
            const token = await AsyncStorage.getItem(ASYNC_STORAGE_APP_TOKEN);
            const details = await getLoginDetailDTO(emailid ?? "");
            setAuth({ authItems: details ?? {} as RegisterDTOProps, token: token ?? "" });
        }
        activateAuth();
    }, []);

    const handleSetAuth = async (data: AuthContentProps) => {
        if (data.authItems.emailId) {
            await AsyncStorage.setItem(ASYNC_STORAGE_EMAIL_ID, data.authItems.emailId);
        } else {
            await AsyncStorage.removeItem(ASYNC_STORAGE_EMAIL_ID);
        }
        if (data.token) {
            await AsyncStorage.setItem(ASYNC_STORAGE_APP_TOKEN, data.token);
        } else {
            await AsyncStorage.removeItem(ASYNC_STORAGE_APP_TOKEN);
        }
        setAuth(data);
    }

    const value: AuthProps = {
        authItems: auth?.authItems ?? {} as RegisterDTOProps,
        token: auth?.token ?? "",
        setAuth: handleSetAuth
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}