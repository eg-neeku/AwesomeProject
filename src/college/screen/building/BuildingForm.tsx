import { Text, TextInput, View } from "react-native";
import Colors from "../../../constants/colors";
import { useState } from "react";
import { BuildingDetailsDTO, BuildingDetailsProp, checkGeneralTextRequirement } from "../../database/model";
import { InputWithLabel } from "../../UI/Input";
import MyButton from "../../UI/MyButton";
import MyImagePicker from "../../UI/MyImagePicker";
import { useFormStyles } from "../screenStyles";
import ErrorMessage from "../../UI/ErrorMessage";

type BuildingFormProps = {
    onCancel: () => void,
    onConfirm: (newBuildingData: BuildingDetailsDTO) => Promise<void>,
    selectedBuilding: BuildingDetailsProp | undefined,
    isEditing: boolean,
    deleteBuildingHandler: () => void
};

export default function BuildingForm({ onCancel, onConfirm, selectedBuilding, isEditing, deleteBuildingHandler }: BuildingFormProps) {
    const formStyles = useFormStyles();
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
        imageURL: {
            value: selectedBuilding ? selectedBuilding.imageURL.toString() : "",
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
    };

    const onSubmitHandler = () => {
        const buildingdata: BuildingDetailsDTO = {
            name: inputValues.name.value,
            address: inputValues.address.value,
            city: inputValues.city.value,
            state: inputValues.state.value,
            pincode: inputValues.pincode.value,
            country: inputValues.country.value,
            floors: inputValues.floors.value,
            imageURL: inputValues.imageURL.value,
        };

        const nameIsValid = checkGeneralTextRequirement(buildingdata.name);
        const addressIsValid = checkGeneralTextRequirement(buildingdata.address);
        const cityIsValid = checkGeneralTextRequirement(buildingdata.city);
        const stateIsValid = checkGeneralTextRequirement(buildingdata.state);
        const countryIsValid = checkGeneralTextRequirement(buildingdata.country);
        const floorsIsValid = buildingdata.floors > 0;
        const pincodeisValid = `${buildingdata.pincode}`.length >= 0;
        const imageURLIsValid = buildingdata.imageURL.trim().length > 0;

        if (!nameIsValid || !addressIsValid) {
            setInputValues(prevInputs => {
                return {
                    name: { value: prevInputs.name.value, isValid: nameIsValid },
                    address: { value: prevInputs.address.value, isValid: addressIsValid },
                    city: { value: prevInputs.city.value, isValid: cityIsValid },
                    state: { value: prevInputs.state.value, isValid: stateIsValid },
                    country: { value: prevInputs.country.value, isValid: countryIsValid },
                    floors: { value: prevInputs.floors.value, isValid: floorsIsValid },
                    pincode: { value: prevInputs.pincode.value, isValid: pincodeisValid },
                    imageURL: { value: prevInputs.imageURL.value, isValid: imageURLIsValid },
                }
            });
            return;
        }
        onConfirm(buildingdata);
    };

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>Building Form</Text>
            <InputWithLabel label="Building Name">
                <TextInput value={inputValues.name.value} maxLength={50}
                    style={[formStyles.input, !inputValues.name.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredName) => inputHandlerChange("name", enteredName)}
                />
                {!inputValues.name.isValid && <ErrorMessage message="Building name is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Address">
                <TextInput value={inputValues.address.value} multiline maxLength={200}
                    style={[formStyles.input, formStyles.inputMulitline, !inputValues.address.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredAddress) => inputHandlerChange("address", enteredAddress)}
                />
                {!inputValues.address.isValid && <ErrorMessage message="Address is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="City">
                <TextInput value={inputValues.city.value} maxLength={170}
                    style={[formStyles.input, !inputValues.city.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredCity) => inputHandlerChange("city", enteredCity)}
                />
                {!inputValues.city.isValid && <ErrorMessage message="City is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="State">
                <TextInput value={inputValues.state.value} maxLength={70}
                    style={[formStyles.input, !inputValues.state.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredState) => inputHandlerChange("state", enteredState)}
                />
                {!inputValues.state.isValid && <ErrorMessage message="State is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Pincode">
                <TextInput value={`${inputValues.pincode.value}`}
                    keyboardType="decimal-pad" maxLength={10}
                    style={[formStyles.input, !inputValues.pincode.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredPincode) => inputHandlerChange("pincode", enteredPincode)}
                />
                {!inputValues.pincode.isValid && <ErrorMessage message="Pincode is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Country">
                <TextInput value={inputValues.country.value} maxLength={70}
                    style={[formStyles.input, !inputValues.country.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredcountry) => inputHandlerChange("country", enteredcountry)}
                />
                {!inputValues.country.isValid && <ErrorMessage message="Country is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Floors">
                <TextInput value={`${inputValues.floors.value}`} keyboardType="numeric"
                    style={[formStyles.input, !inputValues.floors.isValid && formStyles.errortextinput]}
                    onChangeText={(enteredFloors) => inputHandlerChange("floors", enteredFloors)}
                    maxLength={3}
                />
                {!inputValues.floors.isValid && <ErrorMessage message="Floors must be greater than 0." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Select building image">
                <MyImagePicker onImagePick={(val: string) => inputHandlerChange("imageURL", val)} defaultImageURL={inputValues.imageURL.value} />
            </InputWithLabel>
            <View style={formStyles.buttonsContainer}>
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Cancel"
                    onPress={onCancel} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
                <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title={isEditing ? "Update" : "Add"}
                    onPress={onSubmitHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
                {isEditing && <MyButton beforeBgColor={Colors.danger} afterBgColor={Colors.appleRed} title="Delete" onPress={deleteBuildingHandler} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />}
            </View>
        </View>
    )
}