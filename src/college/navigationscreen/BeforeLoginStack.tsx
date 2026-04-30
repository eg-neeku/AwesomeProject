import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/onboarding/Login";
import Registration from "../screen/onboarding/Registration";
import { GOTO_S_FORGOT_PASSWORD_PAGE, GOTO_S_LOGIN_PAGE, GOTO_S_REGISTER_PAGE } from "../database/model";
import ForgotPassword from "../screen/onboarding/ForgotPassword";
import { useContext } from "react";
import { AppContext } from "../database/AppContextProvider";
import Colors from "../../constants/colors";

const Stack = createNativeStackNavigator();

export default function BeforeLoginStack() {
    const { isDarkMode } = useContext(AppContext);
    return (
        <Stack.Navigator screenOptions={{
            ...(isDarkMode && {
                contentStyle: { backgroundColor: Colors.dark }
            })
        }}>
            <Stack.Screen name={GOTO_S_LOGIN_PAGE} component={Login}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name={GOTO_S_REGISTER_PAGE} component={Registration}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name={GOTO_S_FORGOT_PASSWORD_PAGE} component={ForgotPassword}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    )
}