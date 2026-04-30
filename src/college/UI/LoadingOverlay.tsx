import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function LoadingOverlay({ color, message }: { color: string, message?: string }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator color={color} size="large" />
            {!!message && <Text style={styles.message}>{message}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    message: {
        marginTop: 16,
        fontSize: 15,
        textAlign: "center",
        color: "#0ff",
    }
});