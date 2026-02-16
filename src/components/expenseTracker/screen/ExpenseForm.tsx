import { KeyboardTypeOptions, Platform, Pressable, StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { ExpensePropDTO } from "./expensecommon";

type TextInputProps = {
    keyboardType: KeyboardTypeOptions,
    maxLength: number,
    placeholder: string,
    multiline: boolean,
    // autoCorrect: boolean, default value is true
    value: string | undefined,
    onChangeText?: ((text: string) => void) | undefined
}

type InputProps = {
    label: string,
    textInputConfig?: Partial<TextInputProps>,
    style?: StyleProp<ViewStyle>
}

function Input({ label, textInputConfig, style }: InputProps) {

    const styles = StyleSheet.create({
        inputContainer: {
            marginHorizontal: 4,
            marginVertical: 8
        },
        label: {
            fontSize: 14,
            color: Colors.primary100,
            marginBottom: 4
        },
        input: {
            backgroundColor: Colors.primary100,
            padding: 8,
            borderRadius: 8,
            fontSize: 18,
            color: Colors.primary700
        },
        inputMulitline: {
            minHeight: 100,
            textAlignVertical: "top"
        }
    });

    const inputStyles: any = [styles.input];
    if (textInputConfig && textInputConfig.multiline) inputStyles.push(styles.inputMulitline)

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}


export default function ExpenseForm({ submitButtonLabel, onCancel, onConfirm }: any) {
    const [inputValues, setInputValues] = useState({ amount: "", date: "", description: "" });

    const styles = StyleSheet.create({
        forms: {
            marginTop: Platform.OS == "ios" ? 80 : 50,
        },
        titleHead: {
            fontSize: 24,
            color: "#fff",
            fontWeight: "bold",
            marginVertical: 20,
            textAlign: "center"
        },
        inputRows: {
            flexDirection: "row",
            justifyContent: "space-around"
        },
        myRowStyle: {
            flex: 1
        },
        buttonsContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        buttons: {
            minWidth: 120,
            marginHorizontal: 8
        }
    });

    const inputHandlerChange = (inputIdentifier: string, enteredValue: string) => {
        setInputValues(prevInput => {
            return {
                ...prevInput,
                [inputIdentifier]: enteredValue
            }
        })
    }

    const onSubmitHandler = () => {
        const expenseData : ExpensePropDTO = {
            amount:+inputValues.amount, //converts to number
            date: new Date(inputValues.date),
            description: inputValues.description
        }
        // if(isNaN(date.getTime()))
        onConfirm(expenseData);
    }

    return (
        <View style={styles.forms}>
            <Text style={styles.titleHead}>Your Expenses</Text>
            <View style={styles.inputRows}>
                <Input label="Amount" textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: (enteredAmount) => inputHandlerChange("amount", enteredAmount),
                    value: inputValues.amount
                }}
                    style={styles.myRowStyle}
                />
                <Input label="Date" textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: (enteredDate) => inputHandlerChange("date", enteredDate),
                    value: inputValues.date
                }}
                    style={styles.myRowStyle}
                />
            </View>
            <Input label="Description" textInputConfig={{
                multiline: true,
                onChangeText: (enteredDescrp) => inputHandlerChange("description", enteredDescrp),
                value: inputValues.description
            }} />
            <View style={styles.buttonsContainer}>
                <Button style={styles.buttons} mode="flat" onPress={onCancel}>Cancel</Button>
                <Button style={styles.buttons} mode="flat" onPress={onSubmitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}


const Button = ({ children, onPress, mode, style }: { children: React.ReactNode, onPress: () => void, mode: string, style: StyleProp<ViewStyle> }) => {
    const styles = StyleSheet.create({
        button: {
            borderRadius: 4,
            padding: 8,
            backgroundColor: Colors.primary500
        },
        flat: {
            backgroundColor: "transparent"
        },
        buttonText: {
            color: "#fff",
            textAlign: "center"
        },
        flatText: {
            color: Colors.primary200
        },
        pressed: {
            opacity: 0.75,
            backgroundColor: Colors.primary100,
            borderRadius: 4,
            color: '#fff'
        }
    });
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}