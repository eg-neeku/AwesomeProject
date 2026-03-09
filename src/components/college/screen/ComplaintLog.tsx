import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { deleteComplaint, fetchComplaintDataByBuilding } from "../database/complainthttp";
import { ComplaintProps } from "../database/model";
import Colors from "../../../constants/colors";
import MyButton from "../UI/MyButton";
import LoadingOverlay from "./LoadingOverlay";

function ComplaintItem({ item, onDeleted }: { item: ComplaintProps, onDeleted: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const deleleComplaintHandler = () => {
        Alert.alert("Delete Complaint!", "Are you sure? you want to delete it?", [
            {
                text: "Okay",
                onPress: async () => {
                    setIsSubmitting(true);
                    try {
                        await deleteComplaint(item.id);
                        onDeleted();
                    } catch (error) {
                        console.log("Unable to delete the complaint data");
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                style: "destructive"
            },
            {
                text: "Cancel",
                style: "cancel"
            }
        ]);
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <Pressable onPress={() => { }}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <View style={styles.complaintInnerContainer}>
                <Text style={styles.textColor}>ComplaintId: {item.id}</Text>
                <Text style={styles.textColor}>Person Name: {item.name}</Text>
                <Text style={styles.textColor}>Description: {item.description}</Text>
                <Text style={styles.textColor}>Comment: {item.comment}</Text>
                <Text style={styles.textColor}>Priority: {item.priority}</Text>
                <Text style={styles.textColor}>Date of complaint registered: {item.startDate?.toDateString()}</Text>
            </View>
            <View style={{ padding: 10 }}>
                <MyButton beforeBgColor={Colors.danger} afterBgColor={"#da4343"} title="DD" onPress={deleleComplaintHandler} beforeTextColor="#fff" afterTextColor="#000" />
            </View>
        </Pressable>
    )
}

export default function ComplaintLog({ route }: any) {
    const [demo, setDemo] = useState<ComplaintProps[]>([]);

    useEffect(() => {
        getrefreshList();
    }, [route.params.buildingId]);

    const getrefreshList = async () => {
        try {
            const res = await fetchComplaintDataByBuilding(route.params.buildingId);
            setDemo(res);
        } catch (error) {
            console.log("Could fetch data", error);
        }
    }

    if (demo.length > 0) {
        return (
            <View style={styles.complaintOuterContainer}>
                <Text style={styles.complaintHeader}>List of the complaint details</Text>
                <FlatList data={demo}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => { return <ComplaintItem item={itemData.item} onDeleted={getrefreshList} /> }}
                />
            </View>
        )
    }
    return (
        <View style={styles.complaintOuterContainer}>
            <Text>No Complaint found</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    complaintOuterContainer: {
        paddingHorizontal: 15
    },
    complaintInnerContainer: {
        flex:1,
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
        backgroundColor: "#fff",
        padding: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8
    },
    afterPressed: {
        opacity: 0.35,
        backgroundColor: "#ff0"
    },
})