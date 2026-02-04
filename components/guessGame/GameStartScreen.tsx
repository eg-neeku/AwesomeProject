import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";

type GameStartScreenProps = {
    onPickNumber: (val: number) => void
}

const GameStartScreen = ({ onPickNumber }: GameStartScreenProps) => {
    const styles = StyleSheet.create({
        inputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            marginHorizontal: '10%',
            padding: '6%',
            backgroundColor: Colors.primary600,
            borderRadius: '6%',
            elevation: 8, //box shadow in css(only on android)
            shadowColor: '#949292',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.75,
            shadowRadius: 5
        },
        welcomeText: {
            fontSize: 32,
            textAlign: 'center',
            fontFamily: 'cursive',
            fontWeight: 'bold',
            color: Colors.accent500
        },
        numberInput: {
            height: '35%',
            width: '35%',
            textAlign: 'center',
            fontSize: 32,
            borderBottomColor: Colors.accent500,
            borderBottomWidth: 2,
            color: Colors.accent500,
            marginVertical: '2%',
            fontWeight: 'bold'
        },
        buttonContainer: {
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonSubContainer: {
            flex: 1
        },
        outputText: {
            marginTop: '10%',
            color: 'green',
            fontSize: 20
        }
    });

    const resetInputHandler = () => {
        setEnteredNumber('');
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be within range of 1 to 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        onPickNumber(chosenNumber);
    }

    const [enteredNumber, setEnteredNumber] = useState('');
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.welcomeText}>Welcome to Number Guessing</Text>
            <TextInput style={styles.numberInput}
                maxLength={2} keyboardType="numeric"
                value={enteredNumber}
                onChangeText={(text: string) => setEnteredNumber(text)}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.buttonSubContainer}>
                    <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonSubContainer}>
                    <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                </View>
            </View>
            {enteredNumber.length !== 0 ? <View>
                <Text style={styles.outputText}>Entered Value is {enteredNumber}</Text>
            </View> : <></>}
        </View>
    )
}

export default GameStartScreen;