import UTK from "./UTK";
import KTU from "./KTU";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";

export default function BusDrawerScreen(){
    const BottomTab = createNativeBottomTabNavigator();
    return(
        <BottomTab.Navigator>
            <BottomTab.Screen name="UTK" component={UTK} />
            <BottomTab.Screen name="KTU" component={KTU} />
        </BottomTab.Navigator>
    )
}