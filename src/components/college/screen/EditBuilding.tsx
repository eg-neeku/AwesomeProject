import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Input from "../UI/Input";
import Slider from "@react-native-community/slider";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type TaskProps = {
    name: string,
    description: string,
    comment: string,
    priority: number,
    startDate: Date
};

export default function EditBuilding() {
    const [task, setTask] = useState<TaskProps>({ name: "", description: "", comment: "", priority: 0, startDate: new Date() });
    const [datepick, setDatePick] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date): void => {
        // close if user didnt selected the date
        if (event.type === "dismissed") {
            setDatePick(false);
            return;
        }
        setDatePick(false); // user has selected the date
        if (datepick) {
            setTask({ ...task, startDate: selectedDate ?? task.startDate })
        }
    }

    return (
        <View style={styles.container}>
            {/* <BuildingItem item={route.params.item} /> */}
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
            <Pressable style={({ pressed }) => [pressed && styles.pressed]} onPress={() => setDatePick(true)}>
                <Input label={`Start Date: ${task.startDate.toDateString()}`}><></></Input>
            </Pressable>
            {
                datepick &&
                <DateTimePicker mode="date" value={task.startDate} minimumDate={new Date()}
                    onChange={handleDateChange}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        margin: 5,
        padding: 5,
    },
    pressed: {
        opacity: 0.35
    },
    textinput: {
        flex: 1,
        borderBottomWidth: 1,
        height: 50,
        lineHeight: 2
    },
});