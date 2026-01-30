/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import { useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View, Button, TextInput, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';

function App() {
  const [text, setText] = useState("")
  const [hide, setHide] = useState(true)
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>😊Login Page</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          placeholder='TextInput to enter text value'
          maxLength={45}
        />
        <View style={styles.passwordBox}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={hide}
            placeholder='Password Field'
            clearButtonMode="always"
            maxLength={15}
          />
          <TouchableOpacity onPress={() => setHide(!hide)} style={styles.loginButton}>
            <Text>{hide ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.feedBack}
          editable multiline
          numberOfLines={4}
          maxLength={250}
          placeholder='Enter your Feedback'
        />
        <Button title='Login' />
        <Text>Don't have an account Click here</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textInput: {
    borderColor: "aqua",
    borderWidth: 2,
    width: 300,
    padding: 1,
    margin: 5,
    borderRadius: 12,
    height: 45
  },
  passwordInput: {
    borderColor: "aqua",
    borderWidth: 2,
    width: 250,
    padding: 1,
    borderRadius: 12,
    height: 45
  },
  feedBack: {
    borderColor: "aqua",
    margin: 12,
    padding: 10,
    borderWidth: 1,
    width: 300
  },
  passwordBox: {
    display:"flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  loginButton: {
    backgroundColor:"aqua",
    width:40
  }
});

export default App;
