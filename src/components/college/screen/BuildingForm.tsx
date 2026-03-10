import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { BuildingDetailsDTO } from "../database/model";
import Input from "../UI/Input";
import MyButton from "../UI/MyButton";

export default function BuildingForm({ submitButtonLabel, onCancel, onConfirm, selectedBuilding }: any) {
    const [inputValues, setInputValues] = useState(
        {
            name: {
                value: selectedBuilding ? selectedBuilding.name.toString() : "",
                isValid: true
            },
            location: {
                value: selectedBuilding ? selectedBuilding.location.toString() : "",
                isValid: true
            }
        }
    );

    const styles = StyleSheet.create({
        forms: {
            marginTop: Platform.OS == "ios" ? 80 : 50,
        },
        titleHead: {
            fontSize: 24,
            fontWeight: "bold",
            marginVertical: 20,
            textAlign: "center"
        },
        buttonsContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5
        },
        errortext: {
            color: Colors.error500,
            margin: 8,
            fontSize: 12,
            textAlign: "center"
        },
        input: {
            backgroundColor: "#ccc",
            padding: 8,
            borderRadius: 8,
            fontSize: 18,
        },
        inputMulitline: {
            minHeight: 100,
            textAlignVertical: "top"
        },
        errortextinput: {
            borderColor: Colors.error500,
            backgroundColor: Colors.error500,
            borderWidth: 1
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
        const buildingdata: BuildingDetailsDTO = {
            name: inputValues.name.value,
            location: inputValues.location.value
        }

        const nameIsValid = buildingdata.name.trim().length > 0;
        const locationIsValid = buildingdata.location.trim().length > 0;

        if (!nameIsValid || !locationIsValid) {
            setInputValues(prevInputs => {
                return {
                    name: { value: prevInputs.name.value, isValid: nameIsValid },
                    location: { value: prevInputs.location.value, isValid: locationIsValid },
                }
            })
            return;
        }
        onConfirm(buildingdata);
    }

    const formIsInValid = !inputValues.name.isValid || !inputValues.location.isValid;

    return (
        <View style={styles.forms}>
            <Text style={styles.titleHead}>Building Form</Text>
            <Input label="Building Name">
                <TextInput value={inputValues.name.value}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredName) => inputHandlerChange("name", enteredName)}
                />
            </Input>
            <Input label="Location" >
                <TextInput value={inputValues.location.value} multiline
                    style={[styles.input, styles.inputMulitline, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredLocation) => inputHandlerChange("location", enteredLocation)}
                />
            </Input>
            {formIsInValid && <Text style={styles.errortext}>Invalid Input values - please check your entered data!</Text>}
            <View style={styles.buttonsContainer}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title="Cancel" onPress={onCancel} beforeTextColor="#fff" afterTextColor="#000"/>
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title={`${submitButtonLabel}`} onPress={onSubmitHandler} beforeTextColor="#fff" afterTextColor="#000"/>
            </View>
        </View>
    )
}