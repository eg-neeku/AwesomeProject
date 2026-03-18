import { Text, TextInput, View } from "react-native";
import Colors from "../../../../constants/colors";
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
    const formIsInValid = !inputValues.name.isValid || !inputValues.emailId.isValid ||
        !inputValues.phno.isValid;

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Technician Form</Text>
            <InputWithLabel label="Name">
                <TextInput value={inputValues.name.value}
                    style={[formStyles.input, formIsInValid && formStyles.errortextinput]}
                    onChangeText={(enteredName) => inputHandlerChange("name", enteredName)}
                />
            </InputWithLabel>
            <InputWithLabel label="Email Address">
                <TextInput value={inputValues.emailId.value}
                    style={[formStyles.input, formIsInValid && formStyles.errortextinput]}
                    onChangeText={(enteredEmailAddress) => inputHandlerChange("emailId", enteredEmailAddress)}
                />
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput value={inputValues.phno.value} maxLength={10}
                    style={[formStyles.input, formIsInValid && formStyles.errortextinput]}
                    onChangeText={(enteredPhno) => inputHandlerChange("phno", enteredPhno)}
                />
            </InputWithLabel>
            {formIsInValid && <Text style={formStyles.errortext}>Invalid Input values - please check your entered data!</Text>}
            <View style={formStyles.buttonsContainer}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title="Cancel"
                    onPress={onCancel} beforeTextColor="#fff" afterTextColor="#000" />
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title={isEditing ? "Update" : "Add"}
                    onPress={onSubmitHandler} beforeTextColor="#fff" afterTextColor="#000" />
                {isEditing && <MyButton beforeBgColor={Colors.danger} afterBgColor={"#da4343"} title="Delete" onPress={deleteTechnicianHandler} beforeTextColor="#fff" afterTextColor="#000" />}
            </View>
        </View>
    )
}