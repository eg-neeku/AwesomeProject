import { Text, View, StyleSheet } from "react-native"
import Colors from "../../constants/colors";

type StatusProp = { trails: number, status: boolean };
type GameStatusProp = { trailStatus: StatusProp }
const GameOverScreen = ({ trailStatus }: GameStatusProp) => {
    const styles = StyleSheet.create({
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
        <View>
            <Text>Game Over</Text>
            {trailStatus.status ? <View>
                <Text style={[styles.outputMessage, styles.test]}>Total {trailStatus.trails} trails took to guess the number</Text>
            </View> : <></>}
        </View>
    )
}

export default GameOverScreen;