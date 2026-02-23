import { useContext, useState } from "react";
import AuthContent from "../Auth/AuthContent";
import { createUser } from "../auth.js"
import LoadingOverlay from "../ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context.js";

export const Signup = () => {
    const authCtx = useContext(AuthContext);
    const [isAuthenicating, setIsAuthenticating] = useState(false);

    async function signupHandler({ email, password }: { email: string, password: string }) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
            setIsAuthenticating(false);
        } catch (error) {
            Alert.alert("Authentication failed!", "Could not create user. Please check you input and try again later");
            setIsAuthenticating(false);
        }
    }

    if (isAuthenicating) return <LoadingOverlay message="Creating User...." />

    return <AuthContent onAuthenticate={signupHandler} />
}