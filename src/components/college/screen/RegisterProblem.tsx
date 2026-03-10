import { useContext, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "../UI/Input";
import Slider from "@react-native-community/slider";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ComplaintPropsDTO } from "../database/model";
import { storeComplaintData } from "../database/complainthttp";
import MyButton from "../UI/MyButton";
import Colors from "../../../constants/colors";
import { AppContext } from "../database/AppContextProvider";

export default function RegisterProblem() {
    const route: any = useRoute();
    const navigation: any = useNavigation();
    const deviceData = useContext(AppContext);
    const [task, setTask] = useState<ComplaintPropsDTO>({ buildingId: route.params.buildingId, name: "", description: "", comment: "", priority: 0, startDate: new Date() });
    const [datepick, setDatePick] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        // close if user didnt selected the date
        if (event.type === "dismissed") {
            setDatePick(false);
            return;
        }
        setDatePick(false); // user has selected the date
        if (datepick) {
            setTask({ ...task, startDate: selectedDate ?? task.startDate });
        }
    }

    const handleComplaintSubmit = async () => {
        try {
            if (task.comment.length === 0 || task.description.length === 0 || task.name.length === 0) {
                Alert.alert("", "Please fill out the necessary field");
                return;
            }
            await storeComplaintData(task);
        } catch (error) {
            console.log(error);
        }
        console.log("Form Submitted");
        navigation.goBack();
    }

    const handleComplaintList = () => {
        navigation.navigate("ComplaintLog", {
            buildingId: route.params.buildingId
        });
    }

    let registerProblemScreen = <View style={styles.container}>
        <Text style={styles.headerText}>Building Name : {route.params.buildingName}</Text>
        <Input label="Name">
            <TextInput style={styles.textinput} value={task.name}
                onChangeText={(enteredValue) => setTask({ ...task, name: enteredValue })}
            />
        </Input>
        <Input label="Description">
            <TextInput style={styles.textinput} value={task.description}
                onChangeText={(enteredValue) => setTask({ ...task, description: enteredValue })}
            />
        </Input>
        <Input label="Comment">
            <TextInput style={styles.textinput} value={task.comment}
                onChangeText={(enteredValue) => setTask({ ...task, comment: enteredValue })}
            />
        </Input>
        <Input label="Set Priority">
            <Text style={{ textAlign: "center", fontSize: 12 }}>{task.priority}</Text>
            <Slider style={{ outlineColor: "#f0f" }} value={task.priority}
                minimumValue={0} maximumValue={6} step={0}
                minimumTrackTintColor="#f00" maximumTrackTintColor="#0f0" thumbTintColor="#00f"
                onValueChange={(selectedValue) => setTask({ ...task, priority: Math.round(selectedValue) })}
            />
        </Input>
        <Pressable style={({ pressed }) => [{ paddingVertical: 15 }, pressed && styles.pressed]} onPress={() => setDatePick(true)}>
            <Input label={`Start Date: ${task.startDate.toDateString()}`}>
                {
                    datepick &&
                    <DateTimePicker mode="date" value={task.startDate} minimumDate={new Date()}
                        onChange={handleDateChange}
                    />
                }
            </Input>
        </Pressable>
        <View style={styles.buttonContainer}>
            <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title="Submit" onPress={handleComplaintSubmit} beforeTextColor="#fff" afterTextColor="#000" />
            <MyButton beforeBgColor={Colors.primary} afterBgColor="#0ff" title="Complaint Log" onPress={handleComplaintList} beforeTextColor="#fff" afterTextColor="#000" />
        </View>
    </View>;

    return deviceData.isPotrait ? (
        <>
            {registerProblemScreen}
        </>
    ) : (
        <ScrollView style={{marginBottom:25}}>
            {registerProblemScreen}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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