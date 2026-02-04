import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from '../../constants/colors'

type PrimaryButtonProp = {
    children: React.ReactNode,
    onPress?: ((event: GestureResponderEvent) => void) | (() => void)
}

const PrimaryButton = ({ children, onPress }: PrimaryButtonProp) => {
    const styles = StyleSheet.create({
        buttonOuterContainer: {
            borderRadius: 28,
            margin: '2%',
            overflow: 'hidden',
        },
        buttonInnerContainer: {
            backgroundColor: Colors.primary500,
            paddingVertical: '6%',
            paddingHorizontal: '12%',
            elevation: 2
        },
        buttonText: {
            color: 'white',
            textAlign: 'center'
        },
        pressed: {
            opacity: 0.75
        }
    });

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                onPress={onPress} android_ripple={{ color: '#98e836' }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;