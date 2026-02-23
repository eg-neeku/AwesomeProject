import { useContext, useState } from "react";
import AuthContent from "../Auth/AuthContent";
import { login } from "../auth";
import LoadingOverlay from "../ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

export const Login = () => {
    const authCtx = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function loginInHandler({ email, password }: { email: string, password: string }) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
            setIsAuthenticating(false);
        } catch (error) {
            Alert.alert("Authentication failed!","Could not log you in. Please check your credentials or try again later");
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) return <LoadingOverlay message="Logging you in...." />

    return <AuthContent isLogin={true} onAuthenticate={loginInHandler}/>
}