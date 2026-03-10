import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#fff" size="large" style={{}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    }
});