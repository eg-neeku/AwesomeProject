import { View, TextInput, StyleSheet, StyleProp } from "react-native"
import { MyButton } from "./MyButton"
import { BusProps, MyButtonProps } from "../common/common"

type TextInputProps = {
    value: BusProps["busName"],
    onChangeText?: ((text: string) => void) | undefined,
    onFocus?: ((e: FocusEvent) => void) | undefined,
    onPress?: (() => any),
    placeholder?: string | undefined,
    maxLength?: number | undefined,
}

type InputWithSearchProps = TextInputProps & MyButtonProps;

export function Input({ placeholder, value, onChangeText, onFocus, maxLength, onPress }: TextInputProps) {
    return <TextInput style={styles.textinput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        maxLength={maxLength}
        onSubmitEditing={onPress}
        returnKeyType="search"
    />
}

export default function InputWithSearch({ value, placeholder, maxLength,
    onChangeText = () => { }, onFocus = () => { }, isIcon = false, variant,
    title, onPress, iconSize = 20, iconColor = "" }: InputWithSearchProps) {
    return (
        <View style={styles.subMain}>
            <Input
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                maxLength={maxLength}
                onPress={onPress}
            />
            <MyButton isIcon={isIcon} variant={variant} title={title} iconColor={iconColor} iconSize={iconSize} onPress={onPress} />
        </View>
    )
}



const styles = StyleSheet.create({
    subMain: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    },
    textinput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        elevation: 4,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
});