import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import { useFormStyles } from "../screenStyles";
import { useContext, useState } from "react";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";
import { AuthContentProps, checkEmailIdRequirement, checkPasswordRequirement, GOTO_S_FORGOT_PASSWORD_PAGE, GOTO_S_REGISTER_PAGE, LoginProps, RegisterProps } from "../../database/model";
import { checkLoginCredentials } from "../../database/registerhttp";
import { nanoid } from "nanoid";
import { AuthContext } from "../../database/AuthContentProvider";
import ErrorMessage from "../../UI/ErrorMessage";

export default function Login({ navigation }: any) {
    const formStyles = useFormStyles();
    const authCtx = useContext(AuthContext);
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
        const emailIsValid = checkEmailIdRequirement(loginData.emailId);
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
            return false;
        }
        return true;
    };

    const onLoginHandler = async () => {
        const loginData = {
            emailId: inputValues.emailId.value,
            password: inputValues.password.value
        };
        if (!validateLoginInfoEnteredByUser(loginData)) return;
        try {
            const dbData: RegisterProps | null = await checkLoginCredentials(loginData.emailId);
            if (dbData?.emailId == loginData.emailId && dbData?.password == loginData.password) {
                const authToken = nanoid() + Math.random() * 100;
                const { password: _password, ...authItemsData } = dbData;
                const store: AuthContentProps = {
                    authItems: authItemsData,
                    token: authToken,
                };
                authCtx.setAuth(store);
                console.log("Is it working", store);
            } else {
                Alert.alert("Account does not exists!", "Kindly create a new account before logging in", [{ text: "Okay", style: "cancel" }]);
            }
        } catch (error) {
            console.log("Unable to login");
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
            <Text style={formStyles.titleHead}>Welcome Back</Text>
            <View>
                <InputWithLabel label="Email Address">
                    <TextInput keyboardType="email-address"
                        value={inputValues.emailId.value}
                        onChangeText={(enteredText) => inputHandler("emailId", enteredText)}
                        maxLength={50}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                    />
                    {!inputValues.emailId.isValid && <ErrorMessage message={inputValues.emailId.value.trim().length == 0 ? "Email is required." : "Invalid email address."} formStyles={formStyles} />}
                </InputWithLabel>
                <InputWithLabel label="Password">
                    <View style={{ flexDirection: "row" }}>
                        <TextInput value={inputValues.password.value}
                            onChangeText={(enteredText) => inputHandler("password", enteredText)}
                            secureTextEntry={!showPassword}
                            maxLength={10}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[{ flex: 1 }, formStyles.input, !inputValues.password.isValid && formStyles.errortextinput]}
                        />
                        <MyIcon onPress={togglePasswordVisible} >
                            <Icon name={showPassword ? "eye" : "eye-off"} size={18} />
                        </MyIcon>
                    </View>
                    {!inputValues.password.isValid && <ErrorMessage message={inputValues.password.value.trim().length == 0 ? "Password is required." : "Password does not meet requirements."} formStyles={formStyles} />}
                </InputWithLabel>
            </View>
            <View style={{ marginTop: 10 }}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Login"
                    onPress={onLoginHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
            </View>
            <View style={[formStyles.buttonsContainer, { flexDirection: "column" }]}>
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: GOTO_S_FORGOT_PASSWORD_PAGE }]
                })} >
                    <Text style={[formStyles.simpleText, { marginTop: 15 }]}>Forgot Password? Click here</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.reset({
                    index: 0,
                    routes: [{ name: GOTO_S_REGISTER_PAGE }]
                })} >
                    <Text style={formStyles.simpleText}>Don't have an account? Click here</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}