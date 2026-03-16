import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { View, FlatList, StyleSheet, Pressable, TextInput } from "react-native";
import { BuildingDetailsProp, GOTO_S_COMPLAINT_FORM_PAGE, GOTO_S_MANAGE_BUILDING_PAGE } from "../../database/model";
import { BuildingContext } from "../../database/BuildingContextProvider";
import { fetchBuildingData } from "../../database/buildinghttp";
import Icon from "react-native-vector-icons/Ionicons";
import MyIcon from "../../UI/MyIcon";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BuildingItemDetails from "./BuildingItemDetails";

function BuildingItem({ item, navigation }: { item: BuildingDetailsProp, navigation: any }) {
    const handleBuildingPress = () => {
        navigation.navigate(GOTO_S_MANAGE_BUILDING_PAGE, {
            buildingId: item.id
        });
    }

    const handleComplaintPress = () => {
        navigation.navigate(GOTO_S_COMPLAINT_FORM_PAGE, {
            buildingId: item.id,
            buildingName: item.name
        });
    }

    return (
        <Pressable onPress={handleBuildingPress}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <BuildingItemDetails item={item} />
            <View>
                <MyIcon onPress={handleComplaintPress} iconBgColor="#fa8e8e" paddingInsideIcon={6}>
                    <Icon name="pencil-sharp" size={20} color="#000" />
                </MyIcon>
            </View>
        </Pressable>
    )
}

export default function BuildingLog() {
    const buildingCtx = useContext(BuildingContext);
    const navigation: any = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [building, setBuilding] = useState("");
    const [demo, setDemo] = useState(buildingCtx.buildingData);

    const activateRefreshBuilding = async () => {
        setRefreshing(true);
        try {
            const data = await fetchBuildingData();
            buildingCtx.setBuildingData(data);
            setDemo(data);
        } catch (error) {
            console.log("Error fetching building data: ", error);
            buildingCtx.setBuildingData([] as BuildingDetailsProp[]);
        } finally {
            setRefreshing(false);
        }
    }

    // this is going to run whenever this becomes screen visible(useful to reflect the changes when moving from once screen to another or vice-versa)
    useFocusEffect(
        useCallback(() => {
            activateRefreshBuilding();
        }, [])
    );

    const handleBuildingSearch = () => {
        const query = building.trim().toLowerCase();
        if (!query) {
            setDemo(buildingCtx.buildingData);
            return;
        }
        setDemo(
            demo.filter((buildingItem) =>
                (buildingItem.name.toLocaleLowerCase().includes(query)) ||
                (buildingItem.address.toLocaleLowerCase().includes(query)) ||
                (buildingItem.city.toLocaleLowerCase().includes(query)) ||
                (buildingItem.country.toLocaleLowerCase().includes(query)) ||
                (buildingItem.state.toLocaleLowerCase().includes(query)) ||
                (`${buildingItem.floors}`.includes(query)) ||
                (`${buildingItem.pincode}`.includes(query))
            )
        )
    }

    return (
        <View style={styles.container}>
            <InputWithSearch>
                <MIcon name="magnify" size={22} color="#222" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Enter the building detail to be searched"
                    value={building}
                    onChangeText={(text) => {
                        setBuilding(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (!text) setDemo(buildingCtx.buildingData);
                    }}
                    style={styles.searchInput}
                    returnKeyType="search"
                    onSubmitEditing={handleBuildingSearch} // <-- trigger on enter/search
                />
                {building.length > 0 && (
                    <Pressable
                        onPress={() => {
                            setBuilding("");
                            setDemo(buildingCtx.buildingData); // reset list
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
                    renderItem={(itemData) => { return <BuildingItem item={itemData.item} navigation={navigation} /> }}
                    refreshing={refreshing}
                    onRefresh={activateRefreshBuilding}
                /> :
                <ErrorOverlay message={building.trim() ? "No building data found" : "No building data found. Check you internet connection and try again later"} />
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
    searchInput: { flex: 1, fontSize: 16, color: "#222", backgroundColor: "#fff" },
});