import React from "react";
import { StyleSheet, Text, View } from "react-native";

type InputProps = {
    label: string,
    children: React.ReactNode
}

export default function Input({ label, children }: InputProps) {
    return (
        <View style={styles.inputTextContainer}>
            <Text style={styles.labelText}>{label}</Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputTextContainer: {
        marginVertical: 25,
        marginHorizontal: 15
    },
    labelText: {
        marginBottom:15
    }
});