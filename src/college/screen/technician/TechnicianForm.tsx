import { Text, TextInput, View } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { TechnicianDetailsDTO } from "../../database/model";
import { InputWithLabel } from "../../UI/Input";
import MyButton from "../../UI/MyButton";
import { formStyles } from "../screenStyles";

export default function TechnicianForm({ onCancel, onConfirm, selectedTechnician, isEditing, deleteTechnicianHandler }: any) {
    const [inputValues, setInputValues] = useState({
        name: {
            value: selectedTechnician ? selectedTechnician.name.toString() : "",
            isValid: true
        },
        emailId: {
            value: selectedTechnician ? selectedTechnician.emailId.toString() : "",
            isValid: true
        },
        phno: {
            value: selectedTechnician ? selectedTechnician.phno : 0,
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
        })
    }

    const onSubmitHandler = () => {
        const technicianData: TechnicianDetailsDTO = {
            name: inputValues.name.value,
            emailId: inputValues.emailId.value,
            phno: inputValues.phno.value
        }

        const nameIsValid = technicianData.name.trim().length > 0;
        const emailIdIsValid = technicianData.emailId.trim().length > 0;
        const phnoIsValid = `${technicianData.phno}`.length >= 9;

        if (!nameIsValid || !emailIdIsValid || !phnoIsValid) {
            setInputValues(prevInputs => {
                return {
                    name: { value: prevInputs.name.value, isValid: nameIsValid },
                    emailId: { value: prevInputs.emailId.value, isValid: emailIdIsValid },
                    phno: { value: prevInputs.phno.value, isValid: phnoIsValid },
                }
            })
            return;
        }
        onConfirm(technicianData);
    }
    
    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Technician Form</Text>
            <InputWithLabel label="Name">
                <TextInput value={inputValues.name.value}
                    placeholder={!inputValues.name.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.name.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredName) => inputHandlerChange("name", enteredName)}
                />
            </InputWithLabel>
            <InputWithLabel label="Email Address">
                <TextInput value={inputValues.emailId.value}
                    placeholder={!inputValues.emailId.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.emailId.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredEmailAddress) => inputHandlerChange("emailId", enteredEmailAddress)}
                />
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput value={inputValues.phno.value} maxLength={10}
                    placeholder={!inputValues.phno.isValid ? "Please fill out the field" : ""}
                    style={[formStyles.input, !inputValues.phno.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredPhno) => inputHandlerChange("phno", enteredPhno)}
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