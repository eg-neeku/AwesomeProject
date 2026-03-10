import { StyleSheet, Text, View } from "react-native";

const ErrorOverlay = ({ message }: { message: string }) => {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
                {message}
            </Text>
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    emptyState: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptyText: { color: "#666", textAlign:"center" },
});