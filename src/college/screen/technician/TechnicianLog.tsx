import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { View, FlatList, Pressable, TextInput } from "react-native";
import { doNothing, GOTO_S_ASSIGNED_COMPLAINT_PAGE, GOTO_S_MANAGE_TECHNICIAN_PAGE, TechnicianDetailsProps } from "../../database/model";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { fetchTechnicianData } from "../../database/technicianhttp";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import TechnicianItemDetails from "./TechnicianItemDetails";
import { logStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import { AuthContext } from "../../database/AuthContentProvider";


function TechnicianItem({ item, navigation }: { item: TechnicianDetailsProps, navigation: any }) {
    const { authItems } = useContext(AuthContext);
    const handleTechnicianPress = () => {
        navigation.navigate(GOTO_S_MANAGE_TECHNICIAN_PAGE, {
            technicianId: item.id
        });
    }

    const handleComplaintAssigned = () => {
        navigation.navigate(GOTO_S_ASSIGNED_COMPLAINT_PAGE, {
            technicianId: item.id
        })
    }

    return (
        <Pressable onPress={authItems.role === "admin" ? handleTechnicianPress : doNothing}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}>
            <TechnicianItemDetails item={item} />
            <View style={logStyles.itemOptions}>
                <MyIcon onPress={handleComplaintAssigned} iconBgColor={Colors.lightRed} paddingInsideIcon={6}>
                    <Icon name="arrow-forward" size={20} color={Colors.dark} />
                </MyIcon>
            </View>
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
        <View style={logStyles.container}>
            <InputWithSearch>
                <MIcon name="magnify" size={22} color="#222" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Search by technician info...."
                    value={searchTechnician}
                    onChangeText={(text) => {
                        setSearchTechnician(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (!text) setDemo(technicianDetails);
                    }}
                    style={logStyles.searchInput}
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
                        <MIcon name="close-circle" size={20} color={Colors.gray} />
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