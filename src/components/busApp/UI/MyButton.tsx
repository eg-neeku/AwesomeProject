import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import { MyButtonProps } from "../common/common";

const getBackgroundColor = (variant?: string) => {
    switch (variant) {
        case "primary": return "#00f";
        case "danger": return "#f00";
        case "warning": return "#ffc107";
        case "secondary": return "#0ff";
        case "success": return "#28a745";
        case "dark": return "#000";
        default: return "#000";
    }
}

export const MyButton = ({ variant, title, onPress, isIcon = false, iconSize, iconColor="#000" }: MyButtonProps) => {
    const styles = StyleSheet.create({
        outerbuttoncontainer: {
            margin: 8,
            padding: 2,
            borderColor: getBackgroundColor(variant),
            elevation: 4,
            shadowColor: getBackgroundColor(variant),
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.75,
            shadowRadius: 10
        },
        innerbuttonContainer: {
            backgroundColor: getBackgroundColor(variant),
            borderRadius: 10,
            padding: 10,
        },
        pressed: {
            opacity: 0.75,
            color: '#000'
        },
        buttonText: {
            color: "#fff",
        },
        afterpressbuttontext: {
            color: "#000",
            ...(variant == "dark" && { color: "#fff" })
        }
    });
    return (
        <View style={styles.outerbuttoncontainer}>
            <Pressable onPress={onPress}>
                {({ pressed }) => (
                    <View style={[styles.innerbuttonContainer, pressed && styles.pressed]}>
                        {isIcon && <Icon name={title} size={iconSize} color={getBackgroundColor(iconColor)} />}
                        {!isIcon && <Text style={pressed ? styles.afterpressbuttontext : styles.buttonText}>{title}</Text>}
                    </View>
                )}
            </Pressable>
        </View>
    )
}