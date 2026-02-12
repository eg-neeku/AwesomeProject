import { ImageBackground, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import OpponentScreen from "./OpponentScreen";
import GameOverScreen from "./GameOverScreen";
import GameStartScreen from "./GameStartScreen";
import { StatusProp } from "./commonGG";
import { useState } from "react";

const MainScreen = () => {
    const [userNumber, setUserNumber] = useState(NaN);
    const [gameIsOver, setGameIsOver] = useState(false);
    const [trialStatus, setTrailStatus] = useState<StatusProp>({ trails: 0, status: false });

    const pickedNumberHandler = (pickedNumber: number) => {
        setUserNumber(pickedNumber);
    }

    const gameOverHandler = (newTrailStatus: StatusProp) => {
        setGameIsOver(true);
        setTrailStatus(newTrailStatus);
    }

    const startNewGameHandler = () => {
        setUserNumber(NaN);
        setGameIsOver(false);
    }

    let screen = <GameStartScreen onPickNumber={pickedNumberHandler} />
    if (!Number.isNaN(userNumber)) {
        screen = (
            <OpponentScreen userNumber={userNumber} onGameOver={gameOverHandler} />
        );
    }
    if (gameIsOver && trialStatus.status) {
        screen = <GameOverScreen trailStatus={trialStatus} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
    }

    return (
        <LinearGradient colors={[Colors.primary600, Colors.accent500]} style={styles.rootStyle}>
            <ImageBackground source={require('../../../assets/images/background.png')}
                resizeMode='cover' style={styles.rootStyle} imageStyle={styles.bgImgStyle}>
                <SafeAreaView>
                    <ScrollView>
                        {screen}
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootStyle: {
        flex: 1
    },
    bgImgStyle: {
        opacity: 0.25,
    }
});

export default MainScreen;