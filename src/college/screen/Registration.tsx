import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputWithLabel } from "../UI/Input";
import { formStyles } from "./screenStyles";
import { useState } from "react";
import MyIcon from "../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MyButton from "../UI/MyButton";
import Colors from "../../constants/colors";
import { GOTO_S_LOGIN_PAGE } from "../database/model";

export default function Registration({ navigation }: any) {
    const [inputValues, setInputValues] = useState({
        firstName: {
            value: "",
            isValid: true
        },
        lastName: {
            value: "",
            isValid: true
        },
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

    const letsGotoLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: GOTO_S_LOGIN_PAGE }]
        })
    }

    const onRegisterHandler = () => {
        const registerData = {
            firstName: inputValues.firstName.value,
            lastName: inputValues.lastName.value,
            emailId: inputValues.emailId.value,
            password: inputValues.password.value
        }
        const firstNameIsValid = inputValues.firstName.value.trim().length > 0;
        const lastNameIsValid = inputValues.lastName.value.trim().length > 0;
        const emailIdIsValid = inputValues.emailId.value.trim().length > 0;
        const passwordIsValid = inputValues.password.value.trim().length > 0;

        if (!firstNameIsValid || !lastNameIsValid || !emailIdIsValid || !passwordIsValid) {
            setInputValues(prevValues => {
                return {
                    firstName: {
                        value: prevValues.firstName.value,
                        isValid: firstNameIsValid
                    },
                    lastName: {
                        value: prevValues.lastName.value,
                        isValid: lastNameIsValid
                    },
                    emailId: {
                        value: prevValues.emailId.value,
                        isValid: emailIdIsValid
                    },
                    password: {
                        value: prevValues.password.value,
                        isValid: passwordIsValid
                    },
                }
            });
            return;
        }
        console.log(inputValues);
        letsGotoLogin();
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={formStyles.forms}>
                <Text style={formStyles.titleHead}>Create Account</Text>
                <View>
                    <InputWithLabel label="First Name">
                        <TextInput value={inputValues.firstName.value}
                            onChangeText={(text) => inputHandler("firstName", text)}
                            maxLength={25}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={!inputValues.firstName.isValid ? "Please fill out the field" : ""}
                            style={[formStyles.input, !inputValues.firstName.isValid && formStyles.errortextinput]}
                        />
                    </InputWithLabel>
                    <InputWithLabel label="Last Name">
                        <TextInput value={inputValues.lastName.value}
                            onChangeText={(text) => inputHandler("lastName", text)}
                            maxLength={25}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={!inputValues.lastName.isValid ? "Please fill out the field" : ""}
                            style={[formStyles.input, !inputValues.lastName.isValid && formStyles.errortextinput]}
                        />
                    </InputWithLabel>
                    <InputWithLabel label="EmailId">
                        <TextInput keyboardType="email-address"
                            value={inputValues.emailId.value}
                            onChangeText={(text) => inputHandler("emailId", text)}
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
                                onChangeText={(text) => inputHandler("password", text)}
                                secureTextEntry={!showPassword}
                                maxLength={50}
                                autoCapitalize="none"
                                placeholder={!inputValues.password.isValid ? "Please fill out the field" : ""}
                                autoCorrect={false}
                                style={[{ flex: 1 }, formStyles.input, !inputValues.password.isValid && formStyles.errortextinput]}
                            />
                            <MyIcon onPress={togglePasswordVisible} >
                                <Icon name={showPassword ? "eye" : "eye-off"} size={18} />
                            </MyIcon>
                        </View>
                    </InputWithLabel>
                </View>
                <View style={{ marginTop: 10 }}>
                    <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Submit"
                        onPress={onRegisterHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
                </View>
                <View style={formStyles.buttonsContainer}>
                    <TouchableOpacity onPress={letsGotoLogin}>
                        <Text style={{ marginTop: 10 }}>Already have an account? Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}