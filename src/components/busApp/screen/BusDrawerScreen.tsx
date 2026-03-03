import UTK from "./UTK";
import KTU from "./KTU";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import Icon from "react-native-vector-icons/Ionicons";

export default function BusDrawerScreen() {
    const BottomTab = createNativeBottomTabNavigator();
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false
        }}>
            <BottomTab.Screen name="KTU" component={KTU}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const active = Icon.getImageSourceSync("arrow-forward-circle", 24, "#000");
                        const inActive = Icon.getImageSourceSync("arrow-forward-circle", 24, "#888686");
                        return ({
                            type: "image",
                            source: focused ? active : inActive
                        })
                    },
                    title:""
                }}
                />
            <BottomTab.Screen name="UTK" component={UTK}
                options={{
                    tabBarIcon: ({ focused }) => {
                        const active = Icon.getImageSourceSync("arrow-back-circle", 24, "#000");
                        const inActive = Icon.getImageSourceSync("arrow-back-circle", 24, "#888686");
                        return ({
                            type: "image",
                            source: focused ? active : inActive
                        })
                    },
                    title:""
                }}
            />
        </BottomTab.Navigator>
    )
}