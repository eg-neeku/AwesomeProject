import { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";
import Card from "./Card";

type GameStartScreenProps = {
    onPickNumber: (val: number) => void
}

const GameStartScreen = ({ onPickNumber }: GameStartScreenProps) => {
    const styles = StyleSheet.create({
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Card>
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
            </Card>
        </KeyboardAvoidingView>
    )
}

export default GameStartScreen;