import { Alert, TextInput, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import { useState } from "react";
import { RegisterDTOProps } from "../../database/model";
import { updateProfile } from "../../database/registerhttp";
import { useFormStyles } from "../screenStyles";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";
import ErrorMessage from "../../UI/ErrorMessage";

export default function EditMyProfile({ authItems, onCancel, onSaved }: { authItems: RegisterDTOProps; onCancel: () => void; onSaved: (updated: RegisterDTOProps) => void; }) {
    const [editValues, setEditValues] = useState({
        firstName: {
            value: authItems.firstName ?? "",
            isValid: true
        },
        lastName: {
            value: authItems.lastName ?? "",
            isValid: true
        },
        phoneNumber: {
            value: authItems.phoneNumber ?? 0,
            isValid: true
        },
        gender: {
            value: authItems.gender ?? "",
            isValid: true
        },
    });
    const formStyles = useFormStyles();

    const inputHandler = (field: string, text: string) => {
        if (field === "phoneNumber")
            setEditValues(prev => ({ ...prev, [field]: { value: +text, isValid: true } }));
        else
            setEditValues(prev => ({ ...prev, [field]: { value: text, isValid: true } }));
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleSaveProfile = async () => {
        const firstNameValid = editValues.firstName.value.trim().length > 0;
        const lastNameValid = editValues.lastName.value.trim().length > 0;
        const phoneValid = `${editValues.phoneNumber.value}`.trim().length === 10;
        const genderValid = editValues.gender.value.trim().toLowerCase() === "m" || editValues.gender.value.trim().toLowerCase() === "f";

        if (!firstNameValid || !lastNameValid || !phoneValid || !genderValid) {
            setEditValues(prev => ({
                firstName: { value: prev.firstName.value, isValid: firstNameValid },
                lastName: { value: prev.lastName.value, isValid: lastNameValid },
                phoneNumber: { value: prev.phoneNumber.value, isValid: phoneValid },
                gender: { value: prev.gender.value, isValid: genderValid },
            }));
            return;
        }

        try {
            const updatedData = {
                firstName: editValues.firstName.value.trim(),
                lastName: editValues.lastName.value.trim(),
                phoneNumber: editValues.phoneNumber.value,
                gender: editValues.gender.value.trim().toUpperCase(),
            };
            await updateProfile(authItems.emailId, updatedData);
            onSaved({ ...authItems, ...updatedData });
            Alert.alert("", "Profile updated successfully", [{ text: "OK" }]);
        } catch (error) {
            console.log("Profile update error:", error);
            Alert.alert("Error", "Unable to update profile. Check your internet connection.", [{ text: "OK" }]);
        }
    };

    return (
        <View>
            <InputWithLabel label="First Name">
                <TextInput
                    value={editValues.firstName.value}
                    onChangeText={(text) => inputHandler("firstName", text)}
                    maxLength={25}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={[formStyles.input, !editValues.firstName.isValid && formStyles.errortextinput]}
                />
                {!editValues.firstName.isValid && <ErrorMessage message="First name is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Last Name">
                <TextInput
                    value={editValues.lastName.value}
                    onChangeText={(text) => inputHandler("lastName", text)}
                    maxLength={25}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={[formStyles.input, !editValues.lastName.isValid && formStyles.errortextinput]}
                />
                {!editValues.lastName.isValid && <ErrorMessage message="Last name is required." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput
                    value={`${editValues.phoneNumber.value}`}
                    onChangeText={(text) => inputHandler("phoneNumber", text)}
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={[formStyles.input, !editValues.phoneNumber.isValid && formStyles.errortextinput]}
                />
                {!editValues.phoneNumber.isValid && <ErrorMessage message="Phone number must be 10 digits." formStyles={formStyles} />}
            </InputWithLabel>
            <InputWithLabel label="Gender (M / F)">
                <TextInput
                    value={editValues.gender.value}
                    onChangeText={(text) => inputHandler("gender", text)}
                    maxLength={1}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    placeholder="Enter M if Male else F"
                    style={[formStyles.input, !editValues.gender.isValid && formStyles.errortextinput]}
                />
                {!editValues.gender.isValid && <ErrorMessage message="Please enter M for Male or F for Female." formStyles={formStyles} />}
            </InputWithLabel>
            <View style={[formStyles.buttonsContainer, { marginTop: 10 }]}>
                <MyButton title="Save"
                    beforeBgColor={Colors.success} afterBgColor={Colors.success}
                    onPress={handleSaveProfile} />
                <MyButton title="Cancel"
                    beforeBgColor={Colors.normalRed} afterBgColor={Colors.normalRed}
                    onPress={handleCancel} />
            </View>
        </View>
    )
}