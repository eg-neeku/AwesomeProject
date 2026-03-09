import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

export default function MyIcon({ children, onPress = () => { } }: { children: React.ReactNode, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {

    const styles = StyleSheet.create({
        iconcontainer: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 800,
            backgroundColor: "#f1a9f1",
            padding: 12,
            margin: 2
        },
        afterPressed: {
            opacity: 0.35,
            backgroundColor: "#ff0"
        },
    });

    return (
        <Pressable style={({ pressed }) => [styles.iconcontainer, pressed && styles.afterPressed]}
            onPress={onPress} >
            {children}
        </Pressable>
    )
}
