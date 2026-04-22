import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import { formStyles } from "../screenStyles";
import { useState } from "react";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";
import { checkPasswordRequirement, GOTO_S_LOGIN_PAGE, RegisterProps } from "../../database/model";
import { storeRegisteredData } from "../../database/registerhttp";
import ErrorMessage from "../../UI/ErrorMessage";

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
        },
        gender: {
            value: "",
            isValid: true
        },
        phoneNumber: {
            value: 0,
            isValid: true
        }
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisible = () => {
        setShowPassword(!showPassword);
    };

    const letsGotoLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: GOTO_S_LOGIN_PAGE }]
        });
    };

    const validateRegisterInfoEnteredByUser = (registerData: RegisterProps) => {
        const firstNameIsValid = registerData.firstName.trim().length > 0;
        const lastNameIsValid = registerData.lastName.trim().length > 0;
        const emailIdIsValid = registerData.emailId.trim().length > 0;
        const passwordIsValid = checkPasswordRequirement(registerData.password);
        const genderIsValid = registerData.gender.trim().toLowerCase() === "m" || registerData.gender.trim().toLowerCase() === "f";
        const phonenumberIsValid = `${registerData.phoneNumber}`.trim().length == 10;

        if (!firstNameIsValid || !lastNameIsValid || !emailIdIsValid || !passwordIsValid
            || !genderIsValid || !phonenumberIsValid) {
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
                    gender: {
                        value: prevValues.gender.value,
                        isValid: genderIsValid
                    },
                    phoneNumber: {
                        value: prevValues.phoneNumber.value,
                        isValid: phonenumberIsValid
                    },
                }
            });
            return false;
        }
        return true;
    };

    const onRegisterHandler = async () => {
        const registerData: RegisterProps = {
            firstName: inputValues.firstName.value,
            lastName: inputValues.lastName.value,
            emailId: inputValues.emailId.value,
            password: inputValues.password.value,
            gender: inputValues.gender.value,
            phoneNumber: inputValues.phoneNumber.value,
            role: "user"
        };
        if (!validateRegisterInfoEnteredByUser(registerData)) return;
        try {
            await storeRegisteredData(registerData);
            Alert.alert("", "Registered Successfully", [
                {
                    text: "Okay",
                    style: "destructive"
                }
            ]);
            letsGotoLogin();
        } catch (error) {
            Alert.alert("Something went wrong!", "Check your internet connection and try again later", [
                {
                    text: "Okay",
                    style: "cancel"
                }
            ]);
        }
    };

    const inputHandler = (inputIdentifier: string, text: string) => {
        if (inputIdentifier === "phoneNumber")
            setInputValues(prevValue => {
                return {
                    ...prevValue,
                    [inputIdentifier]: {
                        value: +text,
                        isValid: true
                    }
                }
            });
        else setInputValues(prevValue => {
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
                            style={[formStyles.input, !inputValues.firstName.isValid && formStyles.errortextinput]}
                        />
                        {!inputValues.firstName.isValid && <ErrorMessage message="First name is required." formStyles={formStyles}/>}
                    </InputWithLabel>
                    <InputWithLabel label="Last Name">
                        <TextInput value={inputValues.lastName.value}
                            onChangeText={(text) => inputHandler("lastName", text)}
                            maxLength={25}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[formStyles.input, !inputValues.lastName.isValid && formStyles.errortextinput]}
                        />
                        {!inputValues.lastName.isValid && <ErrorMessage message="Last name is required." formStyles={formStyles}/>}
                    </InputWithLabel>
                    <InputWithLabel label="EmailId">
                        <TextInput keyboardType="email-address"
                            value={inputValues.emailId.value}
                            onChangeText={(text) => inputHandler("emailId", text)}
                            maxLength={50}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                        />
                        {!inputValues.emailId.isValid && <ErrorMessage message="Email name is required." formStyles={formStyles}/>}
                    </InputWithLabel>
                    <InputWithLabel label="Password">
                        <View style={{ flexDirection: "row" }}>
                            <TextInput value={inputValues.password.value}
                                onChangeText={(text) => inputHandler("password", text)}
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
                        {!inputValues.password.isValid && <ErrorMessage message="Password does not meet requirements." formStyles={formStyles}/>}
                    </InputWithLabel>
                    <InputWithLabel label="Gender">
                        <TextInput
                            value={inputValues.gender.value}
                            onChangeText={(text) => inputHandler("gender", text)}
                            maxLength={1}
                            autoCorrect={false}
                            autoCapitalize="characters"
                            placeholder="Enter M if Male else F"
                            style={[formStyles.input, !inputValues.gender.isValid && formStyles.errortextinput]}
                        />
                        {!inputValues.gender.isValid && <ErrorMessage message="Please enter M for Male or F for Female." formStyles={formStyles} />}
                    </InputWithLabel>
                    <InputWithLabel label="Phone Number">
                        <TextInput keyboardType="phone-pad"
                            value={`${inputValues.phoneNumber.value}`}
                            onChangeText={(text) => inputHandler("phoneNumber", text)}
                            maxLength={10}
                            autoCorrect={false}
                            style={[formStyles.input, !inputValues.phoneNumber.isValid && formStyles.errortextinput]}
                        />
                        {!inputValues.phoneNumber.isValid && <ErrorMessage message="Phone number must be 10 digits." formStyles={formStyles} />}
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