import { Text, TextInput, View } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { TechnicianFormProps } from "../../database/model";
import { InputWithLabel } from "../../UI/Input";
import MyButton from "../../UI/MyButton";
import { formStyles } from "../screenStyles";

export default function TechnicianForm({ onCancel, onConfirm, selectedTechnician, isEditing, deleteTechnicianHandler }: any) {
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
            password: "Password@123",
            phoneNumber: inputValues.phoneNumber.value,
            gender: inputValues.gender.value,
            role: "techni",
        };

        const firstnameIsValid = technicianData.firstName.trim().length > 0;
        const lastnameIsValid = technicianData.lastName.trim().length > 0;
        const emailIdIsValid = technicianData.emailId.trim().length > 0;
        const genderIsValid = technicianData.gender.trim().toLowerCase() === "m" || technicianData.gender.trim().toLowerCase() === "f";
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
                    placeholder={!inputValues.firstName.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.firstName.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredFirstName) => inputHandlerChange("firstName", enteredFirstName)}
                />
            </InputWithLabel>
            <InputWithLabel label="Last name">
                <TextInput value={inputValues.lastName.value}
                    placeholder={!inputValues.lastName.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.lastName.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredLastName) => inputHandlerChange("lastName", enteredLastName)}
                />
            </InputWithLabel>
            <InputWithLabel label="Email Address">
                <TextInput value={inputValues.emailId.value}
                    placeholder={!inputValues.emailId.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredEmailAddress) => inputHandlerChange("emailId", enteredEmailAddress)}
                />
            </InputWithLabel>
            <InputWithLabel label="Gender">
                <TextInput value={inputValues.gender.value} maxLength={1}
                    placeholder={!inputValues.gender.isValid ? "Please fill out the field" : "Enter M if Male else F"}
                    style={[formStyles.input, !inputValues.gender.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredGender) => inputHandlerChange("gender", enteredGender)}
                />
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput value={inputValues.phoneNumber.value} maxLength={10}
                    placeholder={!inputValues.phoneNumber.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.phoneNumber.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredPhoneNumber) => inputHandlerChange("phoneNumber", enteredPhoneNumber)}
                />
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