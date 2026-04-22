import { useContext, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { InputWithLabel } from "../../UI/Input";
import Slider from "@react-native-community/slider";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ComplaintPropsDTO, GOTO_S_COMPLAINT_LOG_PAGE } from "../../database/model";
import { storeComplaintData } from "../../database/complainthttp";
import MyButton from "../../UI/MyButton";
import Colors from "../../../constants/colors";
import { AppContext } from "../../database/AppContextProvider";
import MyImagePicker from "../../UI/MyImagePicker";
import { AuthContext } from "../../database/AuthContentProvider";
import ErrorMessage from "../../UI/ErrorMessage";
import { formStyles } from "../screenStyles";

export default function ComplaintForm() {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const { isPotrait } = useContext(AppContext);
    const { authItems } = useContext(AuthContext);

    const [inputValues, setInputValues] = useState({
        description: { value: "", isValid: true },
        comment: { value: "", isValid: true },
        priority: { value: 0, isValid: true },
        startDate: { value: new Date(), isValid: true },
        imageURL: { value: "", isValid: true },
    });
    const [datepick, setDatePick] = useState(false);

    const inputHandlerChange = (identifier: string, value: string) => {
        setInputValues(prev => ({
            ...prev,
            [identifier]: { value, isValid: true }
        }));
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        if (event.type === "dismissed") {
            setDatePick(false);
            return;
        }
        setDatePick(false);
        setInputValues(prev => ({
            ...prev,
            startDate: { value: selectedDate ?? prev.startDate.value, isValid: true }
        }));
    };

    const handleComplaintSubmit = async () => {
        const descriptionIsValid = inputValues.description.value.trim().length > 0;
        const commentIsValid = inputValues.comment.value.trim().length > 0;

        if (!descriptionIsValid || !commentIsValid) {
            setInputValues(prev => ({
                ...prev,
                description: { value: prev.description.value, isValid: descriptionIsValid },
                comment: { value: prev.comment.value, isValid: commentIsValid },
            }));
            return;
        }

        const complaintData: ComplaintPropsDTO = {
            buildingId: route.params.buildingId,
            name: `${authItems.firstName} ${authItems.lastName}`,
            description: inputValues.description.value.trim(),
            comment: inputValues.comment.value.trim(),
            priority: inputValues.priority.value,
            status: "open",
            startDate: inputValues.startDate.value,
            imageURL: inputValues.imageURL.value,
        };

        try {
            await storeComplaintData(complaintData);
            Alert.alert("", "Complaint Submitted", [{ text: "Okay", style: "destructive" }]);
            navigation.navigate(GOTO_S_COMPLAINT_LOG_PAGE, { buildingId: route.params.buildingId });
        } catch (error) {
            console.log(error);
        }
    };

    const handleComplaintList = () => {
        navigation.navigate(GOTO_S_COMPLAINT_LOG_PAGE, {
            buildingId: route.params.buildingId
        });
    };

    let registerProblemScreen = <View style={styles.container}>
        <Text style={styles.headerText}>Building Name : {route.params.buildingName}</Text>
        <InputWithLabel label="Your Name">
            <TextInput style={styles.textinput} value={`${authItems.firstName} ${authItems.lastName}`} readOnly />
        </InputWithLabel>
        <InputWithLabel label="Description">
            <TextInput style={[styles.textinput, !inputValues.description.isValid && formStyles.errortextinput]}
                value={inputValues.description.value} maxLength={200}
                onChangeText={(text) => inputHandlerChange("description", text)}
            />
            {!inputValues.description.isValid && <ErrorMessage message="Description is required." formStyles={formStyles} />}
        </InputWithLabel>
        <InputWithLabel label="Comment">
            <TextInput style={[styles.textinput, !inputValues.comment.isValid && formStyles.errortextinput]}
                value={inputValues.comment.value} maxLength={200}
                onChangeText={(text) => inputHandlerChange("comment", text)}
            />
            {!inputValues.comment.isValid && <ErrorMessage message="Comment is required." formStyles={formStyles} />}
        </InputWithLabel>
        <InputWithLabel label="Set Priority">
            <Text style={{ textAlign: "center", fontSize: 12 }}>{inputValues.priority.value}</Text>
            <Slider style={{ outlineColor: Colors.purple }} value={inputValues.priority.value}
                minimumValue={0} maximumValue={6} step={0} minimumTrackTintColor={Colors.danger} 
                maximumTrackTintColor={Colors.green} thumbTintColor={Colors.blue}
                onValueChange={(val) => setInputValues(prev => ({ ...prev, priority: { value: Math.round(val), isValid: true } }))}
            />
        </InputWithLabel>
        <Pressable style={({ pressed }) => [{ paddingVertical: 15 }, pressed && styles.pressed]} onPress={() => setDatePick(true)}>
            <InputWithLabel label={`Start Date: ${inputValues.startDate.value.toDateString()}`}>
                {datepick &&
                    <DateTimePicker mode="date" value={inputValues.startDate.value} minimumDate={new Date()}
                        onChange={handleDateChange}
                    />
                }
            </InputWithLabel>
        </Pressable>
        <InputWithLabel label="Proof of complaint">
            <MyImagePicker onImagePick={(val: string) => inputHandlerChange("imageURL", val)} />
        </InputWithLabel>
        <View style={styles.buttonContainer}>
            <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Submit" onPress={handleComplaintSubmit} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
            <MyButton beforeBgColor={Colors.primary} afterBgColor={Colors.aqua} title="Complaint Log" onPress={handleComplaintList} beforeTextColor={Colors.white} afterTextColor={Colors.dark} />
        </View>
    </View>;

    return isPotrait ? (
        <>
            {registerProblemScreen}
        </>
    ) : (
        <ScrollView style={{ marginBottom: 25 }}>
            {registerProblemScreen}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        margin: 5,
        padding: 5,
        justifyContent: "center"
    },
    pressed: {
        opacity: 0.35
    },
    headerText: {
        textAlign: "center",
        fontSize: 20,
        paddingVertical: 10
    },
    textinput: {
        borderBottomWidth: 1,
        height: 50,
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    }
});
