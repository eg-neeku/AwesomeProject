import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native"
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";
import NumberContainer from "./NumberContainer";
import Card from "./Card";
import Icon from 'react-native-vector-icons/FontAwesome';
import { OpponentScreenProps, StatusProp } from "./commonGG";

const generateRandomBetween = (min: number, max: number, exclude: number) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
    else return rndNum;
}

const OpponentScreen = ({ userNumber, onGameOver }: OpponentScreenProps) => {
    const styles = StyleSheet.create({
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
        }
    });

    let minBoundary = 1, maxBoundary = 100
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);// below trailStatus thing can be modified if you use a array store all the guessed number.
    const [trialStatus, setTrailStatus] = useState<StatusProp>({ trails: 0, status: false });
    const [screenMessage, setScreenMessage] = useState("");

    useEffect(() => {
        minBoundary = 1; maxBoundary = 100;
    }, []);

    const nextGuessHandler = (direction: string) => {
        if ((direction === 'lower' && currentGuess < userNumber)
            || (direction === 'upper' && currentGuess > userNumber)) {
            Alert.alert('Dont Lie!', "You know that this is wrong....", [
                { text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (currentGuess > userNumber)
            setScreenMessage("Hint: Guess the Lower number");
        else if (currentGuess < userNumber)
            setScreenMessage("Hint: Guess the Higher number");
        else {
            setTrailStatus({ ...trialStatus, status: true });
            setScreenMessage("You Guessed the number");
            onGameOver(trialStatus);
            return;
        }
        if (direction === 'lower') maxBoundary = currentGuess;
        else if (direction === 'upper') minBoundary = currentGuess + 1;
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setTrailStatus({ ...trialStatus, trails: trialStatus.trails + 1 });
    }
    return (
        <Card>
            <Text style={styles.title}>Opponents Guess</Text>
            <View>
                <Text style={styles.outputMessage}>{screenMessage}</Text>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonSubContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                            <Icon name="minus" color="#000" size={24} />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonSubContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, "upper")}>
                            <Icon name="plus" color="#000" size={24} />
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Card>
    )
}

export default OpponentScreen;