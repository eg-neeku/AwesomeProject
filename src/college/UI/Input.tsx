import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { AppContext } from "../database/AppContextProvider";

type InputProps = {
    label: string,
    children: React.ReactNode,
}

export function InputWithLabel({ label, children }: InputProps) {
    const { isDarkMode } = useContext(AppContext);
    const styles = StyleSheet.create({
        inputContainer: {
            marginHorizontal: 4,
            marginVertical: 8
        },
        labelText: {
            fontSize: 14,
            marginBottom: 4,
            color: isDarkMode ? Colors.white : Colors.dark
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
            borderRadius: 8,
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