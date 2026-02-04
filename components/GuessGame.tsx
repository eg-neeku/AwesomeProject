import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native"

const PrimaryButton = ({ children, onPress }: any) => {
    const styles = StyleSheet.create({
        buttonOuterContainer: {
            borderRadius: 28,
            margin: '2%',
            overflow: 'hidden',
        },
        buttonInnerContainer: {
            backgroundColor: '#72063c',
            paddingVertical: '6%',
            paddingHorizontal: '12%',
            elevation: 2
        },
        buttonText: {
            color: 'white',
            textAlign: 'center'
        },
        pressed: {
            opacity: 0.75
        }
    });

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                onPress={onPress} android_ripple={{ color: '#98e836' }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

const GameStartScreen = () => {
    const styles = StyleSheet.create({
        inputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            marginHorizontal: '10%',
            padding: '6%',
            backgroundColor: '#4e0328',
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
            color: '#ddb52f'
        },
        numberInput: {
            height: '35%',
            width: '35%',
            textAlign: 'center',
            fontSize: 32,
            borderBottomColor: '#ddb52f',
            borderBottomWidth: 2,
            color: '#ddb52f',
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
                [{ text: 'Okay', style:'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        Alert.alert('Valid number');
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
            {enteredNumber.length !== 0?<View>
                <Text style={styles.outputText}>Entered Value is {enteredNumber}</Text>
            </View>:<></>}
        </View>
    )
}

const GameOver = () => {

}

const GuessGame = () => {
    const styles = StyleSheet.create({
    });
    return (
        <View>
            <GameStartScreen />
        </View>
    )
}

export default GuessGame;