import { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackScreenCRUD from './navigationscreen/StackScreenCRUD';
import BuildingContextProvider from './database/BuildingContextProvider';
import { AppContext } from './database/AppContextProvider';

export default function AppContent() {
  const deviceData = useContext(AppContext);
  return (
    <>
      <StatusBar barStyle={deviceData.isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <BuildingContextProvider>
          <StackScreenCRUD />
        </BuildingContextProvider>
      </NavigationContainer>
    </>
  )
}