import { useCallback, useState } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { fetchComplaintDataByBuilding } from "../../database/complainthttp";
import { ComplaintDetailsProps, TechnicianDetailsProps } from "../../database/model";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import { fetchTechnicianData } from "../../database/technicianhttp";
import { useFocusEffect } from "@react-navigation/native";
import { useLogStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import ComplaintItem from "./ComplaintItem";

export default function ComplaintLog({ navigation, route }: any) {
    const logStyles = useLogStyles();
    const buildingId: string = route?.params?.buildingId;

    // Keep a full copy and a filtered copy
    const [allComplaints, setAllComplaints] = useState<ComplaintDetailsProps[]>([]);
    const [demo, setDemo] = useState<ComplaintDetailsProps[]>([]);
    const [output, setOutput] = useState<TechnicianDetailsProps[]>([]);
    const [complaintSearch, setComplaintSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getTechnicianList();
            getRefreshList();
        }, [buildingId])
    );

    const getTechnicianList = async () => {
        setLoading(true);
        try {
            const output = await fetchTechnicianData();
            setOutput(output);
        } catch (error) {
            console.log("No technician found for the complaint to be assigned");
        } finally {
            setLoading(false);
        }
    };

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
        return <LoadingOverlay color={Colors.blue} />;
    }

    return (
        <View style={logStyles.container}>
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
                    style={logStyles.searchInput}
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
                    renderItem={(itemData) => (
                        <ComplaintItem item={itemData.item} onRefresh={getRefreshList} navigation={navigation} technicianList={output} />
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