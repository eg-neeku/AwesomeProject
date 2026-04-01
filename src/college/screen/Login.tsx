import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputWithLabel } from "../UI/Input";
import { formStyles } from "./screenStyles";
import { useState } from "react";
import MyIcon from "../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MyButton from "../UI/MyButton";
import Colors from "../../constants/colors";
import { GOTO_S_REGISTER_PAGE } from "../database/model";

export default function Login({ navigation }: any) {
    const [inputValues, setInputValues] = useState({
        emailId: {
            value: "",
            isValid: true
        },
        password: {
            value: "",
            isValid: true
        }
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisible = () => {
        setShowPassword(!showPassword);
    }

    const onLoginHandler = () => {
        const loginData = {
            emailId: inputValues.emailId.value,
            password: inputValues.password.value
        }
        const emailIsValid = inputValues.emailId.value.trim().length > 0;
        const passwordIsValid = inputValues.password.value.trim().length > 0;

        if (!emailIsValid || !passwordIsValid) {
            setInputValues(prevValues => {
                return {
                    emailId: {
                        value: prevValues.emailId.value,
                        isValid: emailIsValid,
                    },
                    password: {
                        value: prevValues.password.value,
                        isValid: passwordIsValid,
                    }
                }
            });
            return;
        }
        console.log(inputValues);
    }

    const inputHandler = (inputIdentifier: string, text: string) => {
        setInputValues(prevValue => {
            return {
                ...prevValue,
                [inputIdentifier]: {
                    value: text,
                    isValid: true
                }
            }
        })
    }

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Welcome Back</Text>
            <View>
                <InputWithLabel label="Email Address">
                    <TextInput keyboardType="email-address"
                        value={inputValues.emailId.value}
                        onChangeText={(enteredText) => inputHandler("emailId", enteredText)}
                        maxLength={50}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={!inputValues.emailId.isValid ? "Please fill out the field" : ""}
                        style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                    />
                </InputWithLabel>
                <InputWithLabel label="Password">
                    <View style={{ flexDirection: "row" }}>
                        <TextInput value={inputValues.password.value}
                            onChangeText={(enteredText) => inputHandler("password", enteredText)}
                            secureTextEntry={!showPassword}
                            maxLength={50}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={!inputValues.password.isValid ? "Please fill out the field" : ""}
                            style={[{ flex: 1 }, formStyles.input, !inputValues.password.isValid && formStyles.errortextinput]}
                        />
                        <MyIcon onPress={togglePasswordVisible} >
                            <Icon name={showPassword ? "eye" : "eye-off"} size={18} />
                        </MyIcon>
                    </View>
                </InputWithLabel>
            </View>
            <View style={{ marginTop: 10 }}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Login"
                    onPress={onLoginHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
            </View>
            <View style={formStyles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: GOTO_S_REGISTER_PAGE }]
                })} >
                    <Text style={{ marginTop: 10 }}>Don't have an account? Click here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}