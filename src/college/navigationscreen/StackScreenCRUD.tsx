import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ComplaintForm from "../screen/complaint/ComplaintForm";
import Icon from "react-native-vector-icons/Ionicons";
import CDrawerScreen from "./CDrawerScreen";
import ManageBuilding from "../screen/building/ManageBuilding";
import ComplaintLog from "../screen/complaint/ComplaintLog";
import { GOTO_D_TECHNICIAN_LOG_PAGE, GOTO_S_ASSIGNED_COMPLAINT_PAGE, GOTO_S_COMPLAINT_ASSIGN_PAGE, GOTO_S_COMPLAINT_FORM_PAGE, GOTO_S_COMPLAINT_IN_DETAIL_PAGE, GOTO_S_COMPLAINT_LOG_PAGE, GOTO_S_MANAGE_BUILDING_PAGE, GOTO_S_MANAGE_TECHNICIAN_PAGE, GOTO_SD_MAIN_PAGE } from "../database/model";
import ManageTechnician from "../screen/technician/ManageTechnician";
import AssignedComplaint from "../screen/technician/AssingedComplaint";
import ComplaintAssign from "../screen/complaint/ComplaintAssign";
import Colors from "../../constants/colors";
import ComplaintInDetail from "../screen/technician/ComplaintInDetail";

export default function StackScreenCRUD() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={GOTO_SD_MAIN_PAGE} component={CDrawerScreen}
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name={GOTO_S_COMPLAINT_FORM_PAGE} component={ComplaintForm}
                options={({ navigation }) => ({
                    title: "Register Complaint",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_MANAGE_TECHNICIAN_PAGE} component={ManageTechnician}
                options={({ navigation }) => ({
                    title: "Manage Technician",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_MANAGE_BUILDING_PAGE} component={ManageBuilding}
                options={({ navigation }) => ({
                    title: "Manage Building",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_COMPLAINT_ASSIGN_PAGE} component={ComplaintAssign}
                options={({ navigation }) => ({
                    title: "Complaint Assign",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_ASSIGNED_COMPLAINT_PAGE} component={AssignedComplaint}
                options={({ navigation }) => ({
                    title: "Assinged Complaint",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={navigation.goBack} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_COMPLAINT_LOG_PAGE} component={ComplaintLog}
                options={({ navigation }) => ({
                    title: "Complaint Log",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: GOTO_SD_MAIN_PAGE }]
                    })} style={{ marginRight: 15 }} />)
                })} />
            <Stack.Screen name={GOTO_S_COMPLAINT_IN_DETAIL_PAGE} component={ComplaintInDetail}
                options={({ navigation }) => ({
                    title: "Complaint Indetail",
                    headerLeft: () => (<Icon name="arrow-back" size={24} color={Colors.dark} onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: GOTO_SD_MAIN_PAGE, state: { routes: [{ name: GOTO_D_TECHNICIAN_LOG_PAGE }] } }]
                    })} style={{ marginRight: 15 }} />)
                })} />
        </Stack.Navigator>
    )
}