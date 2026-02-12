import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';

const CommUI = () => {
    const [text, setText] = useState("");
    const [hide, setHide] = useState(true);
    return (
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
                style={styles.textInput}
                editable multiline
                numberOfLines={4}
                maxLength={250}
                placeholder='Enter your Feedback'
            />
            <TextInput
                keyboardType="number-pad"
                placeholder='Enter the date'
                style={styles.textInput}
            />
            <Button title='Login' onPress={() => Alert.alert("Hello User", "Logged In",
                [{ text: "Okay", style:"destructive" }])} />
            <Text>Don't have an account Click here</Text>
        </View>
    )
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
    passwordBox: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5
    },
    loginButton: {
        backgroundColor: "aqua",
        width: 40
    }
});

export default CommUI;