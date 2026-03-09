import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

type InputProps = {
    label: string,
    children: React.ReactNode,
}

export default function Input({ label, children }: InputProps) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelText}>{label}</Text>
            {children}
        </View>
    )
}

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