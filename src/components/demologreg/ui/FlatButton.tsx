import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles.js';

function FlatButton({ children, onPress }: { children: React.ReactNode, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.primary100,
  },
});