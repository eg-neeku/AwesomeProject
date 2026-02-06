import { Text, View, StyleSheet, Image, Dimensions } from "react-native"
import Colors from "../../constants/colors";
import Card from "./Card";
import PrimaryButton from "./PrimaryButton";

type StatusProp = { trails: number, status: boolean };
type GameStatusProp = { trailStatus: StatusProp, userNumber: number, onStartNewGame: () => void }
const GameOverScreen = ({ trailStatus, userNumber, onStartNewGame }: GameStatusProp) => {
    const deviceWidth = Dimensions.get("window").width;
    const styles = StyleSheet.create({
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: "red",
            textAlign: 'center',
            borderWidth: 1,
            padding: '4%'
        },
        outputMessage: {
            color: Colors.accent500,
            fontSize: 15,
            textAlign: 'center',
            margin: '5%'
        },
        test: {
            fontSize: 20
        },
        goalImage: {
            width: deviceWidth < 380 ? 150 : '100%',
            height: deviceWidth < 380 ? 150 : 300,
            borderRadius: deviceWidth < 380 ? 75 : 200,
            borderWidth: 3
        }
    });
    return (
        <Card>
            <Text style={styles.title}>Game Over!!</Text>
            {trailStatus.status ? <View>
                <Text style={[styles.outputMessage, styles.test]}>Total {trailStatus.trails} trails took to guess the number {userNumber}</Text>
            </View> : <></>}
            <Image source={require('../../assets/images/goal.png')} style={styles.goalImage} />
            <PrimaryButton onPress={onStartNewGame}>Start new Game</PrimaryButton>
        </Card>
    )
}

export default GameOverScreen;