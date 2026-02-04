import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native"
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";
import NumberContainer from "./NumberContainer";

const generateRandomBetween = (min: number, max: number, exclude: number) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
    else return rndNum;
}

type GameScreenProps = {
    userNumber: number,
    onGameOver: ()=>void
}

const GameScreen = ({ userNumber, onGameOver }: GameScreenProps) => {
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            padding: '5%'
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: "white",
            textAlign: 'center',
            borderWidth: 2,
            borderColor: "white",
            padding: '4%'
        },
        buttonContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonSubContainer: {
            flex: 1
        },
        outputMessage: {
            color: Colors.accent500,
            fontSize: 15,
            textAlign: 'center',
            margin: '5%'
        },
        test:{
            fontSize:20
        }
    });

    type StatusProp = { trails: number, status: boolean };
    let minBoundary = 1, maxBoundary = 100
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [trialStatus, setTrailStatus] = useState<StatusProp>({ trails: 0, status: false });
    const [screenMessage, setScreenMessage] = useState("");

    const nextGuessHandler = (direction: string) => {
        if ((direction === 'lower' && currentGuess < userNumber)
            || (direction === 'upper' && currentGuess > userNumber)) {
            Alert.alert('Dont Lie!', "You know that this is wrong....", [
                { text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (currentGuess > userNumber)
            setScreenMessage("Guess the Lower number");
        else if (currentGuess < userNumber)
            setScreenMessage("Guess the Higher number");
        else {
            setTrailStatus({ ...trialStatus, status: true });
            setScreenMessage("You Guessed the number");
            onGameOver();
            return;
        }
        if (direction === 'lower') maxBoundary = currentGuess;
        else if (direction === 'upper') minBoundary = currentGuess + 1;
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setTrailStatus({ ...trialStatus, trails: trialStatus.trails + 1 });
    }
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text style={styles.outputMessage}>{screenMessage}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSubContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>-</PrimaryButton>
                    </View>
                    <View style={styles.buttonSubContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "upper")}>+</PrimaryButton>
                    </View>
                </View>
            </View>
            {trialStatus.status ? <View>
                <Text style={[styles.outputMessage,styles.test]}>Total {trialStatus.trails} trails took to guess the number</Text>
            </View> : <></>}
        </View>
    )
}

export default GameScreen;