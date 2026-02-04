import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({ children }: any) => {

    const styles = StyleSheet.create({
        container: {
            borderWidth: 4,
            borderColor: Colors.accent500,
            padding: '5%',
            margin: '5%',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center'
        },
        numberText: {
            color: Colors.accent500,
            fontSize: 36,
            fontWeight: 'bold'
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer;