import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import Registration from "../screen/Registration";
import { GOTO_S_LOGIN_PAGE, GOTO_S_REGISTER_PAGE } from "../database/model";

export default function BeforeLoginStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={GOTO_S_LOGIN_PAGE} component={Login}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name={GOTO_S_REGISTER_PAGE} component={Registration}
                options={{
                    headerShown: false
                }} />
        </Stack.Navigator>
    )
}