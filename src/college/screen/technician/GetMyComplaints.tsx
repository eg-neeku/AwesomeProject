import { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { getAssignedComplaintToTechnician } from "../../database/complainthttp";
import { ComplaintDetailsProps } from "../../database/model";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import Colors from "../../../constants/colors";
import AssignedComplaintItem from "./AssignedComplaintItem";
import { useFocusEffect } from "@react-navigation/native";

export default function GetMyComplaints({ selectedTechnicianId }: { selectedTechnicianId: string }) {

    // Keep a full copy and a filtered copy
    const [allComplaints, setAllComplaints] = useState<ComplaintDetailsProps[]>([]);
    const [demo, setDemo] = useState<ComplaintDetailsProps[]>([]);
    const [complaintSearch, setComplaintSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if (!selectedTechnicianId) return;
            getComplaintList();
        }, [selectedTechnicianId])
    );

    const getComplaintList = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getAssignedComplaintToTechnician(selectedTechnicianId);
            setDemo(response);
            setAllComplaints(response);
        } catch (error) {
            console.log("Technician: ", selectedTechnicianId);
            console.log("Unable to get complaints, may be there is no complaint!");
        } finally {
            setLoading(false);
        }
    }, [selectedTechnicianId]);

    const activateRefreshComplaint = async () => {
        try {
            setRefreshing(true);
            await getComplaintList();
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

    const renderItem = useCallback((itemData: { item: ComplaintDetailsProps }) => (
        <AssignedComplaintItem item={itemData.item} onRefresh={getComplaintList} />
    ), [getComplaintList]);

    if (loading) {
        return <LoadingOverlay color={Colors.blue} />;
    }

    return (
        <View style={styles.complaintOuterContainer}>
            <InputWithSearch>
                <TextInput
                    placeholder="Search by complaint info...."
                    placeholderTextColor={Colors.gray}
                    value={complaintSearch}
                    onChangeText={(text) => {
                        setComplaintSearch(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (!text) setDemo(allComplaints);
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
                        <Icon name="close-circle" size={20} color={Colors.gray} />
                    </Pressable>
                )}
            </InputWithSearch>

            {demo.length > 0 ? (
                <FlatList
                    data={demo}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 12 }}
                    onRefresh={activateRefreshComplaint}
                    refreshing={refreshing}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    windowSize={5}
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
    input: { flex: 1, fontSize: 16, color: "#222", backgroundColor: Colors.white },
});