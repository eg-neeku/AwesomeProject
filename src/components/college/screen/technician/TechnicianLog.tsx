import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import { GOTO_S_ASSIGNED_COMPLAINT_PAGE, GOTO_S_MANAGE_TECHNICIAN_PAGE, TechnicianDetailsProps } from "../../database/model";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchTechnicianData } from "../../database/technicianhttp";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";


function TechnicianItem({ item, navigation }: { item: TechnicianDetailsProps, navigation: any }) {
    const handleTechnicianPress = () => {
        navigation.navigate(GOTO_S_MANAGE_TECHNICIAN_PAGE, {
            technicianId: item.id
        });
    }
    
    const handleComplaintAssigned = ()=>{
        navigation.navigate(GOTO_S_ASSIGNED_COMPLAINT_PAGE,{
            technicianId: item.id
        })
    }

    return (
        <Pressable onPress={handleTechnicianPress}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <View style={styles.buildItemContainer}>
                <Text style={styles.textColor}>Name: {item.name}</Text>
                <Text style={styles.textColor}>Email Address: {item.emailId}</Text>
                <Text style={styles.textColor}>Phone number: {item.phno}</Text>
            </View>
            <View>
                <MyIcon onPress={handleComplaintAssigned} iconBgColor="#fa8e8e" paddingInsideIcon={6}>
                    <Icon name="exit-outline" size={20} color="#000"/>
                </MyIcon>
            </View>
            {/* pencil symbol same as building log structure. To display the complaints possesed by that technician*/}
        </Pressable>
    )
}

export default function TechnicianLog() {
    const navigation: any = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [searchTechnician, setSearchTechnician] = useState("");
    const [demo, setDemo] = useState<TechnicianDetailsProps[]>([]);
    const [technicianDetails, setTechnicianDetails] = useState<TechnicianDetailsProps[]>([]);

    const activateRefreshTechnician = async () => {
        setRefreshing(true);
        try {
            const data = await fetchTechnicianData();
            setDemo(data);
            setTechnicianDetails(data);
        } catch (error) {
            console.log("Error fetching technician data: ", error);
        } finally {
            setRefreshing(false);
        }
    }

    // this is going to run whenever this becomes screen visible(useful to reflect the changes when moving from once screen to another or vice-versa)
    useFocusEffect(
        useCallback(() => {
            activateRefreshTechnician();
        }, [])
    );

    const handleTechnicianSearch = () => {
        const query = searchTechnician.trim().toLowerCase();
        if (!query) {
            setDemo(technicianDetails);
            return;
        }
        setDemo(demo.filter((technicianItem) =>
            (technicianItem.name.toLocaleLowerCase().includes(query)) ||
            (technicianItem.emailId.toLocaleLowerCase().includes(query)) ||
            (`${technicianItem.phno}`.includes(query)))
        )
    }

    return (
        <View style={styles.container}>
            <InputWithSearch>
                <MIcon name="magnify" size={22} color="#222" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Enter the technician detail to be searched"
                    value={searchTechnician}
                    onChangeText={(text) => {
                        setSearchTechnician(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (text.trim().length <= 0) setDemo(technicianDetails);
                    }}
                    style={styles.searchInput}
                    returnKeyType="search"
                    onSubmitEditing={handleTechnicianSearch} // <-- trigger on enter/search
                />
                {searchTechnician.length > 0 && (
                    <Pressable
                        onPress={() => {
                            setSearchTechnician("");
                            setDemo(technicianDetails); // reset list
                        }}
                        style={({ pressed }) => [{ paddingHorizontal: 8 }, pressed && { opacity: 0.6 }]}
                    >
                        <MIcon name="close-circle" size={20} color="#999" />
                    </Pressable>
                )}
            </InputWithSearch>
            {demo.length > 0 ?
                <FlatList data={demo}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={(itemData) => { return <TechnicianItem item={itemData.item} navigation={navigation} /> }}
                    refreshing={refreshing}
                    onRefresh={activateRefreshTechnician}
                /> :
                <ErrorOverlay message={searchTechnician.trim() ? "No technician data found" : "No technician data found. Check you internet connection and try again later"} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginHorizontal: 15,
        flex: 1,
    },
    buildItemContainer: {
        padding: 16
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
    emptyState: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptyText: { color: "#666", textAlign: "center" },
    searchInput: { flex: 1, fontSize: 16, color: "#222", backgroundColor: "#fff" },
});