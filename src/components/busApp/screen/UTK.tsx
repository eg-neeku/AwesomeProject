import { StyleSheet, Text, View } from "react-native";

export default function UTK() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bus Detail from Udupi to K</Text>
            </View>
            <View style={styles.main}>
                <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque aliquam nisi, maiores ipsum ut odio! 
                    Beatae officia nisi in rem illum odit ab at suscipit consequatur ipsam iusto accusamus fugit ex reprehenderit
                     praesentium repudiandae fuga aspernatur modi asperiores, iste voluptatibus pariatur. Tempora at vel inventore!
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },
    header: {
        marginTop:15,
        backgroundColor: "#ff0",
        alignItems: "center",
        justifyContent: "center",
        padding:15
    },
    headerText: {
        textAlign: "center",
        fontSize: 15
    },
    main: {
        backgroundColor: "#f0f",
        marginVertical:15,
        padding:10
    }
});