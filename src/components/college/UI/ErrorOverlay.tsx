import { StyleSheet, Text, View } from "react-native";

const ErrorOverlay = ({ message, textColor = "#666" }: { message: string, textColor?: string }) => {
    const styles = StyleSheet.create({
        emptyState: { flex: 1, alignItems: "center", justifyContent: "center" },
        emptyText: { color: textColor, textAlign: "center" },
    });

    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{message}</Text>
        </View>
    )
}

export default ErrorOverlay;