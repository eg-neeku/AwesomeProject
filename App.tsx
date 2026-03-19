/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackScreenCRUD from './src/components/college/navigationscreen/StackScreenCRUD';
import BuildingContextProvider from './src/components/college/database/BuildingContextProvider';
import AppContextProvider, { AppContext } from './src/components/college/database/AppContextProvider';
import { useContext } from 'react';


function App() {
 const deviceData = useContext(AppContext);
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={deviceData.isDarkMode ? 'light-content' : 'dark-content'} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContextProvider>
          <NavigationContainer>
            <BuildingContextProvider>
              <StackScreenCRUD />
            </BuildingContextProvider>
          </NavigationContainer>
        </AppContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;