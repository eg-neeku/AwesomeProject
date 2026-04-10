import { useContext } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackScreenCRUD from './navigationscreen/StackScreenCRUD';
import BuildingContextProvider from './database/BuildingContextProvider';
import AppContextProvider, { AppContext } from './database/AppContextProvider';
import AuthContextProvider from './database/AuthContentProvider';

export default function AppContent() {
  const { isDarkMode } = useContext(AppContext);
  return (
    <AppContextProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthContextProvider>
        <NavigationContainer>
          <BuildingContextProvider>
            <StackScreenCRUD />
          </BuildingContextProvider>
        </NavigationContainer>
      </AuthContextProvider>
    </AppContextProvider>
  )
}