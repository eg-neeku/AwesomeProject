import { createContext, useState } from "react";
import { AuthContentProps } from "./model";

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

    const handleSetAuth = (data: AuthContentProps) => {
        setAuth(data);
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