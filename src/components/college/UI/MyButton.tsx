import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";

type MyButtonProps = {
    title: string;
    beforeBgColor?: string;
    afterBgColor?: string;
    beforeTextColor?: string;
    afterTextColor?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
};

export default function MyButton({ title, beforeBgColor = "#1e40af", afterBgColor = "#1e3a8a",
    beforeTextColor = Colors.white, afterTextColor = "#e5e7eb", onPress }: MyButtonProps) {
    const styles = StyleSheet.create({
        containerBase: {
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 8,
        },
        innerPadding: {
            padding: 6,
        },
    });

    return (
        <Pressable onPress={onPress}>
            {({ pressed }) => (
                <View
                    style={[
                        styles.containerBase,
                        { backgroundColor: pressed ? afterBgColor : beforeBgColor },
                        pressed && { opacity: 0.35 },
                    ]}>
                    <View style={styles.innerPadding}>
                        <Text style={{ color: pressed ? afterTextColor : beforeTextColor }}>{title}</Text>
                    </View>
                </View>
            )}
        </Pressable>
    );
}