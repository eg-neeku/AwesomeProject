import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RegisterProblem from "../screen/RegisterProblem";
import Icon from "react-native-vector-icons/Ionicons";
import CDrawerScreen from "./CDrawerScreen";
import ManageBuilding from "../screen/ManageBuilding";
import ComplaintLog from "../screen/ComplaintLog";

export default function StackScreenCRUD() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={CDrawerScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="ComplaintBuilding" component={RegisterProblem}
                options={({ navigation }) => ({
                    title: "Register Complaint",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color="#000" onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name="ManageBuilding" component={ManageBuilding}
                options={({ navigation }) => ({
                    title: "Manage Building",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color="#000" onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name="ComplaintLog" component={ComplaintLog}
                options={({ navigation }) => ({
                    title: "Complaint Log", /*() => navigation.navigate("MainPage", { screen: "Home" })*/
                    headerLeft: () => (<Icon name="arrow-back" size={24} color="#000" onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
        </Stack.Navigator>
    )
}