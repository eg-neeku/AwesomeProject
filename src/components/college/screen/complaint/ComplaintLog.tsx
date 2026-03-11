import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { deleteComplaint, fetchComplaintDataByBuilding } from "../../database/complainthttp";
import { ComplaintProps } from "../../database/model";
import LoadingOverlay from "../../UI/LoadingOverlay";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";

function ComplaintItem({
    item,
    onRefresh,
}: {
    item: ComplaintProps;
    onRefresh: () => void;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const deleteComplaintHandler = () => {
        Alert.alert("Delete Complaint!", "Are you sure you want to delete it?", [
            {
                text: "Okay",
                onPress: async () => {
                    setIsSubmitting(true);
                    try {
                        await deleteComplaint(item.id);
                        onRefresh();
                    } catch (error) {
                        console.log("Unable to delete the complaint data", error);
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                style: "destructive",
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    if (isSubmitting) {
        return <LoadingOverlay color="#00f" />;
    }

    return (
        <Pressable
            onPress={() => { }}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}
        >
            <View style={styles.complaintInnerContainer}>
                <Text>ComplaintId: {item.id}</Text>
                <Text>Person Name: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Comment: {item.comment}</Text>
                <Text>Priority: {item.priority}</Text>
                <Text>
                    Date of complaint registered:
                    {item.startDate
                        ? (typeof item.startDate === "string"
                            ? new Date(item.startDate)
                            : item.startDate
                        )?.toDateString()
                        : "-"}
                </Text>
            </View>
            <View style={{ paddingRight: 10 }}>
                <MyIcon onPress={deleteComplaintHandler} iconBgColor="#fa8e8e">
                    <Icon name="delete" size={24} color="#fff" />
                </MyIcon>
            </View>
        </Pressable>
    );
}

export default function ComplaintLog({ route }: any) {
    const buildingId: string = route?.params?.buildingId;

    // Keep a full copy and a filtered copy
    const [allComplaints, setAllComplaints] = useState<ComplaintProps[]>([]);
    const [demo, setDemo] = useState<ComplaintProps[]>([]);
    const [complaintSearch, setComplaintSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getRefreshList();
    }, [buildingId]);

    const getRefreshList = async () => {
        try {
            setLoading(true);
            const res = await fetchComplaintDataByBuilding(buildingId);
            setAllComplaints(res || []);
            setDemo(res || []);
        } catch (error) {
            console.log("Could not fetch data", error);
            setAllComplaints([]);
            setDemo([]);
        } finally {
            setLoading(false);
        }
    };

    const activateRefreshComplaint = async () => {
        try {
            setRefreshing(true);
            await getRefreshList();
            // maintain current search if any
            if (complaintSearch.trim()) {
                applyFilter(complaintSearch.trim());
            }
        } finally {
            setRefreshing(false);
        }
    };

    const applyFilter = (q: string) => {
        const query = q.trim().toLowerCase();
        if (!query) {
            setDemo(allComplaints);
            return;
        }
        setDemo(
            allComplaints.filter((c) => (c.name ?? "").toLowerCase().includes(query) ||
                ((c.description ?? "").toLowerCase().includes(query)) ||
                ((c.comment ?? "").toLowerCase().includes(query)) ||
                ((`${c.priority}`).toLowerCase().includes(query)) ||
                (c.startDate).toDateString().includes(query))
        );
    };

    const handleComplaintSearch = () => {
        applyFilter(complaintSearch);
    };

    if (loading) {
        return <LoadingOverlay color="#00f" />;
    }

    return (
        <View style={styles.complaintOuterContainer}>
            <Text style={styles.complaintHeader}>List of the complaint details</Text>
            <InputWithSearch>
                <Icon name="magnify" size={22} color="#222" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Enter the complaint detail to be searched"
                    value={complaintSearch}
                    onChangeText={(text) => {
                        setComplaintSearch(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (text.trim().length <= 0) setDemo(allComplaints);
                    }}
                    style={styles.input}
                    returnKeyType="search"
                    onSubmitEditing={handleComplaintSearch} // <-- trigger on enter/search
                />
                {complaintSearch.length > 0 && (
                    <Pressable
                        onPress={() => {
                            setComplaintSearch("");
                            setDemo(allComplaints); // reset list
                        }}
                        style={({ pressed }) => [{ paddingHorizontal: 8 }, pressed && { opacity: 0.6 }]}
                    >
                        <Icon name="close-circle" size={20} color="#999" />
                    </Pressable>
                )}
            </InputWithSearch>

            {demo.length > 0 ? (
                <FlatList
                    data={demo}
                    keyExtractor={(item) => item.id}
                    renderItem={(itemData) => (
                        <ComplaintItem item={itemData.item} onRefresh={getRefreshList} />
                    )}
                    contentContainerStyle={{ paddingBottom: 12 }}
                    onRefresh={activateRefreshComplaint}
                    refreshing={refreshing}
                />
            ) : (
                <ErrorOverlay message={complaintSearch.trim()
                    ? "No complaints match your search."
                    : "No complaints found."} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    complaintOuterContainer: { flex: 1, padding: 16 },
    complaintHeader: { fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center" },
    input: { flex: 1, fontSize: 16, color: "#222", backgroundColor: "#fff" },
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
    complaintInnerContainer: { padding: 12 },
});