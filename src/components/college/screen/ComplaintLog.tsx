import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { deleteComplaint, fetchComplaintDataByBuilding } from "../database/complainthttp";
import { TaskProps } from "../database/model";
import Colors from "../../../constants/colors";
import MyButton from "../UI/MyButton";

function ComplaintItem({ item }: { item: TaskProps }) {

    const deleleComplaintHandler = async () => {
        try {
            await deleteComplaint(item.id);
        } catch (error) {
            console.log("Unable to delete the complaint data");
        }
    }

    return (
        <Pressable onPress={() => { }}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <View style={styles.complaintInnerContainer}>
                <Text style={styles.textColor}>ComplaintId:{item.id}</Text>
                <Text style={styles.textColor}>Person Name:{item.name}</Text>
                <Text style={styles.textColor}>Description{item.description}</Text>
                <Text style={styles.textColor}>Comment: {item.comment}</Text>
                <Text style={styles.textColor}>Priority{item.priority}</Text>
                <Text style={styles.textColor}>Date of complaint registered: {item.startDate?.toDateString()}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <MyButton beforeBgColor={Colors.danger} afterBgColor={"#da4343"} title="DD" onPress={deleleComplaintHandler} beforeTextColor="#fff" afterTextColor="#000" />
            </View>
        </Pressable>
    )
}

export default function ComplaintLog({ route }: any) {
    const [demo, setDemo] = useState<TaskProps[]>([]);
    useEffect(() => {
        (async function getComplaintData() {
            try {
                const res = await fetchComplaintDataByBuilding(route.params.buildingId);
                setDemo(res);
            } catch (error) {
                console.log("Could fetch data", error);
            }
        })()
    }, [demo]);

    if (demo.length > 0) {
        return (
            <View style={styles.complaintOuterContainer}>
                <Text style={styles.complaintHeader}>List of the complaint details</Text>
                <FlatList data={demo}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => { return <ComplaintItem item={itemData.item} /> }}
                />
            </View>
        )
    }
    return (
        <View>
            <Text>No Complaint found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    complaintOuterContainer: {
        paddingHorizontal: 15
    },
    complaintInnerContainer: {
        padding: 16
    },
    complaintHeader: {
        textAlign: "center",
        padding: 5,
        margin: 15,
        fontSize: 20
    },
    textColor: {
        color: "#000"
    },
    beforePressed: {
        backgroundColor: "#ccc",
        padding: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    afterPressed: {
        opacity: 0.35,
        backgroundColor: "#ff0"
    },
})