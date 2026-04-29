import { Text, TextInput, View } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { checkEmailIdRequirement, checkFirstNameRequirement, checkGenderRequirement, checkLastNameRequirement, RegisterDTOProps, TechnicianFormProps } from "../../database/model";
import { InputWithLabel } from "../../UI/Input";
import MyButton from "../../UI/MyButton";
import { useFormStyles } from "../screenStyles";
import ErrorMessage from "../../UI/ErrorMessage";
import MyDropDown from "../../UI/MyDropDown";

export default function TechnicianForm({ onCancel, onConfirm, selectedTechnician, isEditing, deleteTechnicianHandler }: any) {
    const formStyles = useFormStyles();
    const [inputValues, setInputValues] = useState({
        firstName: {
            value: selectedTechnician ? selectedTechnician.firstName.toString() : "",
            isValid: true
        },
        lastName: {
            value: selectedTechnician ? selectedTechnician.lastName.toString() : "",
            isValid: true
        },
        emailId: {
            value: selectedTechnician ? selectedTechnician.emailId.toString() : "",
            isValid: true
        },
        gender: {
            value: selectedTechnician ? selectedTechnician.gender.toString() : "",
            isValid: true
        },
        phoneNumber: {
            value: selectedTechnician ? selectedTechnician.phoneNumber : 0,
            isValid: true
        }
    });
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState("" as RegisterDTOProps["gender"]);

    const handleGenderSelect = (val: string) => {
        setValue(val as RegisterDTOProps["gender"]);
        setInputValues(prev => ({ ...prev, gender: { ...prev.gender, isValid: true } }));
    };
    const genderOptions = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
    ];

    const inputHandlerChange = (inputIdentifier: string, enteredValue: string) => {
        setInputValues(prevInput => {
            return {
                ...prevInput,
                [inputIdentifier]: {
                    value: enteredValue, isValid: true
                }
            }
        });
    };

    const onSubmitHandler = () => {
        const technicianData: TechnicianFormProps = {
            firstName: inputValues.firstName.value,
            lastName: inputValues.lastName.value,
            emailId: inputValues.emailId.value,
            password: "Password@1",
            phoneNumber: inputValues.phoneNumber.value,
            gender: value,
            role: "techni",
        };

        const firstnameIsValid = checkFirstNameRequirement(technicianData.firstName);
        const lastnameIsValid = checkLastNameRequirement(technicianData.lastName);
        const emailIdIsValid = checkEmailIdRequirement(technicianData.emailId);
        const genderIsValid = checkGenderRequirement(value);
        const phnoIsValid = `${technicianData.phoneNumber}`.length >= 9;

        if (!firstnameIsValid || !lastnameIsValid || !emailIdIsValid || !genderIsValid || !phnoIsValid) {
            setInputValues(prevInputs => {
                return {
                    firstName: { value: prevInputs.firstName.value, isValid: firstnameIsValid },
                    lastName: { value: prevInputs.lastName.value, isValid: lastnameIsValid },
                    emailId: { value: prevInputs.emailId.value, isValid: emailIdIsValid },
                    gender: { value: prevInputs.gender.value, isValid: genderIsValid },
                    phoneNumber: { value: prevInputs.phoneNumber.value, isValid: phnoIsValid },
                }
            });
            return;
        }
        onConfirm(technicianData);
    }

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Technician Form</Text>
            <InputWithLabel label="First name">
                <TextInput value={inputValues.firstName.value}
                    style={[formStyles.input, !inputValues.firstName.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredFirstName) => inputHandlerChange("firstName", enteredFirstName)}
                />
                {!inputValues.firstName.isValid && <ErrorMessage message="First name is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Last name">
                <TextInput value={inputValues.lastName.value}
                    style={[formStyles.input, !inputValues.lastName.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredLastName) => inputHandlerChange("lastName", enteredLastName)}
                />
                {!inputValues.lastName.isValid && <ErrorMessage message="Last name is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Email Address">
                <TextInput value={inputValues.emailId.value}
                    style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredEmailAddress) => inputHandlerChange("emailId", enteredEmailAddress)}
                />
                {!inputValues.emailId.isValid && <ErrorMessage message={inputValues.emailId.value.trim().length == 0 ? "Email is required." : "Invalid email address."} formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Gender">
                <MyDropDown
                    focus={isFocus}
                    itemList={genderOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Gender"
                    searchPlaceholder="Search Gender"
                    selectedValue={handleGenderSelect}
                />
                {!inputValues.gender.isValid && <ErrorMessage message="Kindly select a gender." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput value={inputValues.phoneNumber.value} maxLength={10}
                    style={[formStyles.input, !inputValues.phoneNumber.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredPhoneNumber) => inputHandlerChange("phoneNumber", enteredPhoneNumber)}
                />
                {!inputValues.phoneNumber.isValid && <ErrorMessage message="Phone number must be 10 digits." formStyles={formStyles} />}
            </InputWithLabel>
            <View style={formStyles.buttonsContainer}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Cancel"
                    onPress={onCancel} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title={isEditing ? "Update" : "Add"}
                    onPress={onSubmitHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
                {isEditing && <MyButton beforeBgColor={Colors.danger} afterBgColor={Colors.normalRed} title="Delete" onPress={deleteTechnicianHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />}
            </View>
        </View>
    )
}