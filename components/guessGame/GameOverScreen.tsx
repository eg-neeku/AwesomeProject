import { Text, View, StyleSheet, Image } from "react-native"
import Colors from "../../constants/colors";
import Card from "./Card";

type StatusProp = { trails: number, status: boolean };
type GameStatusProp = { trailStatus: StatusProp }
const GameOverScreen = ({ trailStatus }: GameStatusProp) => {
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
            width: '100%',
            height: 400,
            borderRadius: 200,
            borderWidth: 3
        }
    });
    return (
        <Card>
            <Text style={styles.title}>Game Over!!</Text>
            {trailStatus.status ? <View>
                <Text style={[styles.outputMessage, styles.test]}>Total {trailStatus.trails} trails took to guess the number</Text>
            </View> : <></>}
            <Image source={require('../../assets/images/goal.png')} style={styles.goalImage} />
        </Card>
    )
}

export default GameOverScreen;