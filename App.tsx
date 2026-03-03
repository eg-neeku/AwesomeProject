/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, useColorScheme, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ItemList from './src/components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feature from './src/Feature';
import { useEffect } from 'react';
import { BUS_DETAILS_KTU } from './src/components/busApp/common/common';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // as soon as app loads, execute this data
  useEffect(()=>{
    async function getBusData() {
      await AsyncStorage.setItem("BUS_DETAILS_KTU",JSON.stringify(BUS_DETAILS_KTU));
    }
    getBusData();
  },[])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* <ItemList /><Text>This Thing UPDATE LOgin has to be implmented </Text> */}
        <NavigationContainer>
          <Feature />

        {/* <BusDrawerScreen />*/}

        {/* <TestThis /> */}

          </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;

const TestThis = () => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", padding: 2, marginVertical: 45 }}>
      <Text style={{ color: "#000", fontSize: 45 }}>Does this works </Text>
    </View>
  )
}