import { Alert, TextInput, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import { useState } from "react";
import { checkFirstNameRequirement, checkGenderRequirement, checkLastNameRequirement, RegisterDTOProps } from "../../database/model";
import { updateProfile } from "../../database/registerhttp";
import { useFormStyles } from "../screenStyles";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";
import ErrorMessage from "../../UI/ErrorMessage";
import MyDropDown from "../../UI/MyDropDown";

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
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState("" as RegisterDTOProps["gender"]);

    const handleGenderSelect = (val: string) => {
        setValue(val as RegisterDTOProps["gender"]);
        setEditValues(prev => ({ ...prev, gender: { ...prev.gender, isValid: true } }));
    };
    const genderOptions = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
    ];
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
        const firstNameValid = checkFirstNameRequirement(editValues.firstName.value);
        const lastNameValid = checkLastNameRequirement(editValues.lastName.value);
        const phoneValid = `${editValues.phoneNumber.value}`.trim().length === 10;
        const genderValid = checkGenderRequirement(value);

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
                gender: value.trim().toUpperCase(),
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
                <MyDropDown
                    focus={isFocus}
                    itemList={genderOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Gender"
                    searchPlaceholder="Search Gender"
                    selectedValue={handleGenderSelect}
                />
                {/* <TextInput claude --resume 0a1bcf55-8384-49c6-a096-c997a960f39f
                    value={editValues.gender.value}
                    onChangeText={(text) => inputHandler("gender", text)}
                    maxLength={1}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    placeholder="Enter M if Male else F"
                    style={[formStyles.input, !editValues.gender.isValid && formStyles.errortextinput]}
                /> */}
                {!editValues.gender.isValid && <ErrorMessage message="Kindly select your gender" formStyles={formStyles} />}
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