import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../../../constants/colors";
import { useState } from "react";
import { BuildingDetailsDTO, BuildingDetailsProp } from "../../database/model";
import { InputWithLabel } from "../../UI/Input";
import MyButton from "../../UI/MyButton";

type BuildingFormProps = {
    onCancel: () => void,
    onConfirm: (newBuildingData: BuildingDetailsDTO) => Promise<void>,
    selectedBuilding: BuildingDetailsProp | undefined,
    isEditing: boolean,
    deleteBuildingHandler: () => void
}

export default function BuildingForm({ onCancel, onConfirm, selectedBuilding, isEditing, deleteBuildingHandler }: BuildingFormProps) {
    const [inputValues, setInputValues] = useState({
        name: {
            value: selectedBuilding ? selectedBuilding.name.toString() : "",
            isValid: true
        },
        address: {
            value: selectedBuilding ? selectedBuilding.address.toString() : "",
            isValid: true
        },
        city: {
            value: selectedBuilding ? selectedBuilding.city.toString() : "",
            isValid: true
        },
        state: {
            value: selectedBuilding ? selectedBuilding.state.toString() : "",
            isValid: true
        },
        country: {
            value: selectedBuilding ? selectedBuilding.country.toString() : "",
            isValid: true
        },
        floors: {
            value: selectedBuilding ? selectedBuilding.floors : 0,
            isValid: true
        },
        pincode: {
            value: selectedBuilding ? selectedBuilding.pincode : 0,
            isValid: true
        },
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
            address: inputValues.address.value,
            city: inputValues.city.value,
            state: inputValues.state.value,
            pincode: inputValues.pincode.value,
            country: inputValues.country.value,
            floors: inputValues.floors.value,
        }

        const nameIsValid = buildingdata.name.trim().length > 0;
        const addressIsValid = buildingdata.address.trim().length > 0;
        const cityIsValid = buildingdata.city.trim().length > 0;
        const stateIsValid = buildingdata.state.trim().length > 0;
        const countryIsValid = buildingdata.country.trim().length > 0;
        const floors = buildingdata.floors > 0;
        const pincode = `${buildingdata.pincode}`.length >= 0;

        if (!nameIsValid || !addressIsValid) {
            setInputValues(prevInputs => {
                return {
                    name: { value: prevInputs.name.value, isValid: nameIsValid },
                    address: { value: prevInputs.address.value, isValid: addressIsValid },
                    city: { value: prevInputs.city.value, isValid: cityIsValid },
                    state: { value: prevInputs.state.value, isValid: stateIsValid },
                    country: { value: prevInputs.country.value, isValid: countryIsValid },
                    floors: { value: prevInputs.floors.value, isValid: floors },
                    pincode: { value: prevInputs.pincode.value, isValid: pincode },
                }
            })
            return;
        }
        onConfirm(buildingdata);
    }
    const formIsInValid = !inputValues.name.isValid || !inputValues.address.isValid ||
        !inputValues.state.isValid || !inputValues.city.isValid || !inputValues.country.isValid ||
        !inputValues.floors.isValid || !inputValues.floors.isValid;

    return (
        <View style={styles.forms}>
            <Text style={styles.titleHead}>Building Form</Text>
            <InputWithLabel label="Building Name">
                <TextInput value={inputValues.name.value}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredName) => inputHandlerChange("name", enteredName)}
                />
            </InputWithLabel>
            <InputWithLabel label="Address">
                <TextInput value={inputValues.address.value} multiline
                    style={[styles.input, styles.inputMulitline, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredAddress) => inputHandlerChange("address", enteredAddress)}
                />
            </InputWithLabel>
            <InputWithLabel label="City">
                <TextInput value={inputValues.city.value} maxLength={170}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredCity) => inputHandlerChange("city", enteredCity)}
                />
            </InputWithLabel>
            <InputWithLabel label="State">
                <TextInput value={inputValues.state.value} maxLength={70}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredState) => inputHandlerChange("state", enteredState)}
                />
            </InputWithLabel>
            <InputWithLabel label="Pincode">
                <TextInput value={`${inputValues.pincode.value}`}
                    keyboardType="decimal-pad" maxLength={10}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredPincode) => inputHandlerChange("pincode", enteredPincode)}
                />
            </InputWithLabel>
            <InputWithLabel label="Country">
                <TextInput value={inputValues.country.value} maxLength={70}
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredcountry) => inputHandlerChange("country", enteredcountry)}
                />
            </InputWithLabel>
            <InputWithLabel label="Floors">
                <TextInput value={`${inputValues.floors.value}`} keyboardType="numeric"
                    style={[styles.input, formIsInValid && styles.errortextinput]}
                    onChangeText={(enteredFloors) => inputHandlerChange("floors", enteredFloors)}
                    maxLength={3}
                />
            </InputWithLabel>
            {formIsInValid && <Text style={styles.errortext}>Invalid Input values - please check your entered data!</Text>}
            <View style={styles.buttonsContainer}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title="Cancel"
                    onPress={onCancel} beforeTextColor="#fff" afterTextColor="#000" />
                <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title={isEditing ? "Update" : "Add"}
                    onPress={onSubmitHandler} beforeTextColor="#fff" afterTextColor="#000" />
                {isEditing && <MyButton beforeBgColor={Colors.danger} afterBgColor={"#da4343"} title="Delete" onPress={deleteBuildingHandler} beforeTextColor="#fff" afterTextColor="#000" />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    forms: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        margin: 16,
        elevation: 3,              // Android shadow
        shadowColor: "#000",       // iOS shadow
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    titleHead: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
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