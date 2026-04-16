import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image, View, StyleSheet } from "react-native";
import About from "../screen/About";
import PrivacyPolicy from "../screen/PrivacyPolicy";
import MyIcon from "../UI/MyIcon";
import { GOTO_D_ABOUT_PAGE, GOTO_D_FACILITY_SEARCH_PAGE, GOTO_D_HOME_PAGE, GOTO_D_NOTIFICATION_HISTORY_PAGE, GOTO_D_PRIVACY_POLICY_PAGE, GOTO_D_MY_PROFILE_PAGE, GOTO_S_MANAGE_BUILDING_PAGE, GOTO_S_MANAGE_TECHNICIAN_PAGE, GOTO_D_TECHNICIAN_LOG_PAGE, GOTO_D_COMPLAINT_LIST_PAGE } from "../database/model";
import TechnicianLog from "../screen/technician/TechnicianLog";
import BuildingLog from "../screen/building/BuildingLog";
import MyProfile from "../screen/profile/MyProfile";
import { useContext } from "react";
import { AuthContext } from "../database/AuthContentProvider";
import ComplaintList from "../screen/technician/ComplaintList";

export default function CDrawerScreen() {
    const { authItems } = useContext(AuthContext);
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name={GOTO_D_HOME_PAGE} component={BuildingLog}
                options={({ navigation }) => ({
                    title: "Building Log",
                    drawerIcon: ({ color, size }) => <IonIcons name="home" color={color} size={size} />,
                    headerRight: authItems.role === "admin" ? ({ tintColor }) => (<MyIcon onPress={() => navigation.navigate(GOTO_S_MANAGE_BUILDING_PAGE)}><IonIcons name="add" color={tintColor} size={20} /></MyIcon>) : undefined
                })}
            />
            <Drawer.Screen name={GOTO_D_FACILITY_SEARCH_PAGE} component={About}
                options={{
                    title: "Facility Search",
                    drawerIcon: ({ color, size }) => <IonIcons name="search" color={color} size={size} />
                }}
            />
            {
                authItems.role === "techni" &&
                <Drawer.Screen name={GOTO_D_COMPLAINT_LIST_PAGE} component={ComplaintList}
                    options={({ navigation }) => ({
                        title: "Complaint List",
                        drawerIcon: ({ color, size }) => <MaterialIcons name="engineering" color={color} size={size} />,
                    })}
                />
            }
            {
                (authItems.role === "admin" || authItems.role == "user") &&
                <Drawer.Screen name={GOTO_D_TECHNICIAN_LOG_PAGE} component={TechnicianLog}
                    options={({ navigation }) => ({
                        title: "Technician Log",
                        drawerIcon: ({ color, size }) => <MaterialIcons name="engineering" color={color} size={size} />,
                        headerRight: authItems.role === "admin" ? ({ tintColor }) => (<MyIcon onPress={() => navigation.navigate(GOTO_S_MANAGE_TECHNICIAN_PAGE)}><IonIcons name="add" color={tintColor} size={20} /></MyIcon>) : undefined
                    })}
                />
            }
            <Drawer.Screen name={GOTO_D_NOTIFICATION_HISTORY_PAGE} component={About}
                options={{
                    title: "Notification History",
                    drawerIcon: ({ color, size }) => <MaterialIcons name="notifications-active" color={color} size={size} />
                }}
            />
            <Drawer.Screen name={GOTO_D_MY_PROFILE_PAGE} component={MyProfile}
                options={{
                    title: "My Profile",
                    drawerIcon: ({ color, size }) => <IonIcons name="person-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name={GOTO_D_ABOUT_PAGE} component={About}
                options={{
                    drawerIcon: ({ color, size }) => <IonIcons name="information-circle-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name={GOTO_D_PRIVACY_POLICY_PAGE} component={PrivacyPolicy}
                options={{
                    title: "Privacy Policy",
                    drawerIcon: ({ color, size }) => <MaterialIcons name="book" color={color} size={size} />
                }}
            />
        </Drawer.Navigator>
    )
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.container}></View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                <Image
                    source={require("../../../assets/images/goal.png")}
                    style={styles.logo}
                />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5
    },
    logo: {
        width: 200,
        height: 100,
        opacity: 0.9
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 45
    }
})