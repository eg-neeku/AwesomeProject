import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

type InputProps = {
    label: string,
    children: React.ReactNode,
}

export function InputWithLabel({ label, children }: InputProps) {
    const styles = StyleSheet.create({
        inputContainer: {
            marginHorizontal: 4,
            marginVertical: 8
        },
        labelText: {
            fontSize: 14,
            marginBottom: 4
        },
        errorlabel: {
            color: Colors.error500
        }
    });

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>{label}</Text>
            {children}
        </View>
    )
}

export function InputWithSearch({ children }: { children: React.ReactNode }) {
    const styles = StyleSheet.create({
        complaintSearch: { marginBottom: 12 },
        searchRow: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1, borderColor: "#ddd", borderRadius: 8,
            paddingHorizontal: 10, paddingVertical: 8,
        },
    });

    return (
        <View style={styles.complaintSearch}>
            <View style={styles.searchRow}>
                {children}
            </View>
        </View>
    )
}

export function HorizontalFilterSet({ children }: { children: React.ReactNode }) {
    return (
        <View style={{ margin: 8, alignItems: "center" }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 5, flexDirection: "row" }}>
                {children}
            </ScrollView>
        </View>
    )
}