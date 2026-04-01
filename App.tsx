/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContextProvider from './src/college/database/AppContextProvider';
import AppContent from './src/college/AppContent';

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContextProvider>
          <AppContent />
        </AppContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;