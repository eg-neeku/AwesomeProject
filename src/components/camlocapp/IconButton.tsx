import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function IconButton({ icon, color, size, onPress }: { icon: string, color: string | undefined, size: number, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={onPress}
        >
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding:8,
        margin: 4,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 20,
    },
    pressed: {
        opacity: 0.7,
    },
});