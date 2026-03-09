import { StyleSheet, Text, View } from "react-native";
import GetBuilding from "./GetBuilding";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <Text style={styles.headertext}>Displaying the list of buildings</Text>
                <GetBuilding />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginHorizontal: 15,
        flex: 1,
    },
    headertext: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        marginVertical:16
    },
    innercontainer: {
        flex: 1,
        margin: 15
    },
});