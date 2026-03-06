import { createNativeStackNavigator } from "@react-navigation/native-stack"
import RegisterProblem from "../screen/RegisterProblem";
import Icon from "react-native-vector-icons/Ionicons";
import CDrawerScreen from "./CDrawerScreen";

export default function StackScreenCRUD() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={CDrawerScreen} 
            options={{
                headerShown:false
            }}/>
            <Stack.Screen name="complaintbuilding" component={RegisterProblem}
                options={({ navigation }) => ({
                    title:"Complaint",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color="#000" onPress={navigation.goBack} style={{marginRight:15}}/>)
                })} />
        </Stack.Navigator>
    )
}