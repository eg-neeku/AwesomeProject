import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screen/Home";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, View } from "react-native";

export default function CDrawerScreen() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home}
                options={{
                    drawerIcon: ({ color, focused, size }) => <IonIcons name="home" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="FacilitySearch" component={Home}
                options={{
                    title:"Facility Search",
                    drawerIcon: ({ color, focused, size }) => <IonIcons name="search" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="Message" component={Home}
                options={{
                    drawerIcon: ({ color, focused, size }) => <MaterialIcons name="message" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="NotificationHistory" component={Home}
                options={{
                    title:"Notification History",
                    drawerIcon: ({ color, focused, size }) => <MaterialIcons name="notifications-active" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="UserPreference" component={Home}
                options={{
                    title:"User Preference",
                    drawerIcon: ({ color, focused, size }) => <IonIcons name="person-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="About" component={Home}
                options={{
                    drawerIcon: ({ color, focused, size }) => <IonIcons name="information-circle-sharp" color={color} size={size} />
                }}
            />
            <Drawer.Screen name="PrivacyPolicy" component={Home}
                options={{
                    title:"Privacy Policy",
                    drawerIcon: ({ color, focused, size }) => <MaterialIcons name="book" color={color} size={size} />
                }}
            />
        </Drawer.Navigator>
    )
}