import { StyleSheet, Text, View } from "react-native"

export const Welcome = () => {
    const styles = StyleSheet.create({
        welcomeContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 32
        },
        title: {

        }
    });
    return (
        <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Welcome User</Text>
            <Text>You authenticated successfully!</Text>
        </View>
    )
}