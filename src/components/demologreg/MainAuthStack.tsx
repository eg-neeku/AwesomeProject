import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screen/Login";
import { Signup } from "./screen/Signup";
import { AuthContext, AuthContextProvider } from "./store/auth-context";
import { useContext, useEffect } from "react";
import { Welcome } from "./screen/Welcome";
import IconButton from "./ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#62036b" },
                headerTintColor: "#fff",
                contentStyle: { backgroundColor: "#d000dd", }
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    )
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext);
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#62036b" },
                headerTintColor: "#fff",
                contentStyle: { backgroundColor: "#d000dd", }
            }}>
            <Stack.Screen name="Welcome" component={Welcome}
                options={{
                    headerRight: ({ tintColor }) => (
                        <IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout} />
                    )
                }} />
        </Stack.Navigator>
    )
}

function Navigation() {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
        }
        fetchToken();
    }, []);

    return (
        <NavigationContainer>
            {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default function MainAuthStack() {
    return (
        <AuthContextProvider>
            <Navigation />
        </AuthContextProvider>
    )
} 