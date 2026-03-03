import { View, TextInput, StyleSheet, StyleProp } from "react-native"
import { MyButton } from "./MyButton"
import { BusProps } from "../common/common"

type TextInputProps = {
    value: BusProps["busName"],
    onChangeText?: ((text: string) => void) | undefined,
    onFocus?: ((e: FocusEvent) => void) | undefined,
    onPress?: (() => any) | undefined,
    placeholder?: string | undefined,
    variant: string,
    title: string,
    maxLength?: number | undefined,
    isIcon: boolean
}

export default function TextSearch({ value, placeholder, maxLength, onChangeText = () => { }, onFocus = () => { }, isIcon, variant, title, onPress }: TextInputProps) {
    return (
        <View style={styles.subMain}>
            <TextInput style={styles.textinput}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={onFocus}
                maxLength={maxLength}
                onSubmitEditing={onPress}
                returnKeyType="search"
            />
            <MyButton isIcon={isIcon} variant={variant} title={title} iconColor="" iconSize={20} onPress={onPress} />
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