import MyMap from './screens/MyMap';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../constants/colors';
import AllPlaces from './screens/AllPlaces';
import IconButton from './IconButton';
import AddPlace from './screens/AddPlace';

const Stack = createNativeStackNavigator();

export default function CamLocNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: Colors.gray700,
                contentStyle: { backgroundColor: Colors.gray700 }
            }}>
                <Stack.Screen name="AllPlaces" component={AllPlaces}
                    options={({ navigation }) => ({
                        title: "Your Favorite Places",
                        headerRight: ({ tintColor }) => (
                            <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate("AddPlace")} />
                        )
                    })} />
                <Stack.Screen name="AddPlace" component={AddPlace}
                    options={{
                        title: "Add new Place",
                        presentation: "modal"
                    }} />
                <Stack.Screen name="Map" component={MyMap} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}