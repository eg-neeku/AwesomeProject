import { Alert, TextInput, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import { useState } from "react";
import { RegisterDTOProps } from "../../database/model";
import { updateProfile } from "../../database/registerhttp";
import { formStyles } from "../screenStyles";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";


export default function EditMyProfile({ authItems, onCancel, onSaved }: { authItems: RegisterDTOProps; onCancel: () => void; onSaved: (updated: RegisterDTOProps) => void; }) {
    const [editValues, setEditValues] = useState({
        firstName: authItems.firstName ?? "",
        lastName: authItems.lastName ?? "",
        phoneNumber: `${authItems.phoneNumber ?? ""}`,
        gender: authItems.gender ?? "",
    });

    const inputHandler = (field: string, value: string) => {
        setEditValues(prev => ({ ...prev, [field]: value }));
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleSaveProfile = async () => {
        const firstNameValid = editValues.firstName.trim().length > 0;
        const lastNameValid = editValues.lastName.trim().length > 0;
        const phoneValid = `${editValues.phoneNumber}`.trim().length === 10;
        const genderValid = editValues.gender.trim().length > 0;

        if (!firstNameValid || !lastNameValid || !phoneValid || !genderValid) {
            Alert.alert("Validation Error", "Please fill all fields correctly. Phone number must be 10 digits.", [{ text: "OK" }]);
            return;
        }

        try {
            const updatedData = {
                firstName: editValues.firstName.trim(),
                lastName: editValues.lastName.trim(),
                phoneNumber: +editValues.phoneNumber,
                gender: editValues.gender.trim().toUpperCase(),
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
                    value={editValues.firstName}
                    onChangeText={(text) => inputHandler("firstName", text)}
                    maxLength={25}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={formStyles.input}
                />
            </InputWithLabel>
            <InputWithLabel label="Last Name">
                <TextInput
                    value={editValues.lastName}
                    onChangeText={(text) => inputHandler("lastName", text)}
                    maxLength={25}
                    autoCapitalize="words"
                    autoCorrect={false}
                    style={formStyles.input}
                />
            </InputWithLabel>
            <InputWithLabel label="Phone Number">
                <TextInput
                    value={editValues.phoneNumber}
                    onChangeText={(text) => inputHandler("phoneNumber", text)}
                    keyboardType="phone-pad"
                    maxLength={10}
                    style={formStyles.input}
                />
            </InputWithLabel>
            <InputWithLabel label="Gender (M / F)">
                <TextInput
                    value={editValues.gender}
                    onChangeText={(text) => inputHandler("gender", text)}
                    maxLength={1}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    style={formStyles.input}
                />
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