import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

type MyIconProps = {
    children: React.ReactNode,
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
    iconBgColor?: string,
    afterIconBgColor?: string,
}

export default function MyIcon({ children, onPress = () => { }, iconBgColor = "#f1a9f1", afterIconBgColor = "#ff0" }: MyIconProps) {

    const styles = StyleSheet.create({
        iconcontainer: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 800,
            backgroundColor: iconBgColor,
            padding: 12,
            margin: 2
        },
        afterPressed: {
            opacity: 0.35,
            backgroundColor: afterIconBgColor
        },
    });

    return (
        <Pressable style={({ pressed }) => [styles.iconcontainer, pressed && styles.afterPressed]}
            onPress={onPress}>
            {children}
        </Pressable>
    )
}
