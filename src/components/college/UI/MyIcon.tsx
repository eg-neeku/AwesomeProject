import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

type MyIconProps = {
    children: React.ReactNode,
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined,
    iconBgColor?: string,
    afterIconBgColor?: string,
    paddingInsideIcon?: number,
}

export default function MyIcon({ children, onPress = () => { }, iconBgColor = Colors.pink, afterIconBgColor = Colors.yellow, paddingInsideIcon = 10 }: MyIconProps) {

    const styles = StyleSheet.create({
        iconcontainer: {
            borderRadius: 800,
            backgroundColor: iconBgColor,
            padding: paddingInsideIcon,
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
