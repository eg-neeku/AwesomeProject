import { createDrawerNavigator } from "@react-navigation/drawer";
import UTK from "./UTK";
import KTU from "./KTU";

export default function BusDrawerScreen(){
    const Drawer = createDrawerNavigator();
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="UTK" component={UTK} />
            <Drawer.Screen name="KTU" component={KTU} />
        </Drawer.Navigator>
    )
}