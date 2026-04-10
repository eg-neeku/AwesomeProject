import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputWithLabel } from "../UI/Input";
import { formStyles } from "./screenStyles";
import { useState } from "react";
import MyIcon from "../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MyButton from "../UI/MyButton";
import Colors from "../../constants/colors";
import { checkPasswordRequirement, GOTO_S_LOGIN_PAGE, LoginProps } from "../database/model";
import { updatePassword } from "../database/registerhttp";

export default function ForgotPassword({ navigation }: any) {
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
    };

    const validateLoginInfoEnteredByUser = (loginData: LoginProps) => {
        const emailIsValid = loginData.emailId.trim().length > 0;
        const passwordIsValid = checkPasswordRequirement(loginData.password);

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
    };

    const letsGotoLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: GOTO_S_LOGIN_PAGE }]
        })
    };

    const onLoginHandler = async () => {
        const loginData = {
            emailId: inputValues.emailId.value,
            password: inputValues.password.value
        };
        validateLoginInfoEnteredByUser(loginData);
        try {
            await updatePassword(loginData);
            Alert.alert("", "Password updated Successfully", [
                {
                    text: "Okay",
                    style: "destructive"
                }
            ]);
        } catch (error) {
            Alert.alert("Something went wrong!", "Check your internet connection and try again later", [
                {
                    text: "Okay",
                    style: "cancel"
                }
            ]);
        } finally {
            letsGotoLogin();
        }
    };

    const inputHandler = (inputIdentifier: string, text: string) => {
        setInputValues(prevValue => {
            return {
                ...prevValue,
                [inputIdentifier]: {
                    value: text,
                    isValid: true
                }
            }
        });
    };

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Password Reset</Text>
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
                <InputWithLabel label="New Password">
                    <View style={{ flexDirection: "row" }}>
                        <TextInput value={inputValues.password.value}
                            onChangeText={(enteredText) => inputHandler("password", enteredText)}
                            secureTextEntry={!showPassword}
                            maxLength={10}
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
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Update Password"
                    onPress={onLoginHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
            </View>
            <View style={formStyles.buttonsContainer}>
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: GOTO_S_LOGIN_PAGE }]
                })} >
                    <Text style={{ marginTop: 10 }}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}