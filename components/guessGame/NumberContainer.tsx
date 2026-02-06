import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = ({ children }: any) => {
    const deviceWidth = Dimensions.get("window").width;
    const styles = StyleSheet.create({
        container: {
            borderWidth: 4,
            borderColor: Colors.accent500,
            padding: deviceWidth < 380 ? 12 : '5%',
            margin: deviceWidth < 380 ? 12 : '5%',
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
