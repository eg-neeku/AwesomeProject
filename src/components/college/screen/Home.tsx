import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import GetBuilding from "./GetBuilding";

export default function Home({ navigation }: any) {

    const handlePress = () => {
        navigation.navigate("Edit");
    }

    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                <Text style={styles.headertext}>Displaying the list of buildings</Text>
                <GetBuilding />
            </View>
            <Pressable style={styles.iconcontainer}
                onPress={handlePress} >
                <Icon name="pencil-sharp" size={24} color="#000" />
            </Pressable>
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
    iconcontainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 800,
        position: "absolute",
        backgroundColor: "#f1a9f1",
        padding: 16,
        bottom: 0,
        // left: 0,
        right: 0,
        zIndex: 2,
    }
});