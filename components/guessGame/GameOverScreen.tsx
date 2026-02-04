import { Text, View, StyleSheet } from "react-native"
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
        }
    });
    return (
        <Card>
            <Text style={styles.title}>Game Over!!</Text>
            {trailStatus.status ? <View>
                <Text style={[styles.outputMessage, styles.test]}>Total {trailStatus.trails} trails took to guess the number</Text>
            </View> : <></>}
        </Card>
    )
}

export default GameOverScreen;