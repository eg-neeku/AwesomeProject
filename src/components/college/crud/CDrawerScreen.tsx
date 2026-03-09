import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Home from "../screen/Home";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Image, View, StyleSheet } from "react-native";
import About from "../screen/About";
import PrivacyPolicy from "../screen/PrivacyPolicy";

export default function CDrawerScreen() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="Home" component={Home}
                options={({ navigation }) => ({
                    drawerIcon: ({ color, size }) => <IonIcons name="home" color={color} size={size} />,
                    headerRight: ({ tintColor }) => <IonIcons name="add" style={{ marginRight: 15 }} color={tintColor} size={20} onPress={() => navigation.navigate("ManageBuilding")} />
                })}
            />
            <Drawer.Screen name="FacilitySearch" component={Home}
                options={{
                    title: "Facility Search",
                    drawerIcon: ({ color, size }) => <IonIcons name="search" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="Message" component={Home}
                options={{
                    drawerIcon: ({ color, size }) => <MaterialIcons name="message" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="NotificationHistory" component={Home}
                options={{
                    title: "Notification History",
                    drawerIcon: ({ color, size }) => <MaterialIcons name="notifications-active" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="UserPreference" component={Home}
                options={{
                    title: "User Preference",
                    drawerIcon: ({ color, size }) => <IonIcons name="person-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="About" component={About}
                options={{
                    drawerIcon: ({ color, size }) => <IonIcons name="information-circle-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy}
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
            <DrawerItemList {...props} />
            <View style={styles.container}></View>
            <View style={styles.footer}>
                <Image
                    source={require("../../../../assets/images/goal.png")}
                    style={styles.logo}
                />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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