import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useState } from "react";
import { View, FlatList, Pressable, TextInput } from "react-native";
import { BuildingDetailsProp, doNothing, GOTO_S_COMPLAINT_FORM_PAGE, GOTO_S_MANAGE_BUILDING_PAGE } from "../../database/model";
import { BuildingContext } from "../../database/BuildingContextProvider";
import { fetchBuildingData } from "../../database/buildinghttp";
import Icon from "react-native-vector-icons/Ionicons";
import MyIcon from "../../UI/MyIcon";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BuildingItemDetails from "./BuildingItemDetails";
import { logStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import { AuthContext } from "../../database/AuthContentProvider";

function BuildingItem({ item, navigation }: { item: BuildingDetailsProp, navigation: any }) {
    const { authItems } = useContext(AuthContext);
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
        <Pressable onPress={authItems.role === "admin" ? handleBuildingPress : doNothing}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}>
            <BuildingItemDetails item={item} />
            <View style={logStyles.itemOptions}>
                <MyIcon onPress={handleComplaintPress} iconBgColor={Colors.lightRed} paddingInsideIcon={6}>
                    <Icon name="pencil-sharp" size={20} color={Colors.dark} />
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

    // this is going to run whenever this screen becomes visible(useful to reflect the changes when moving from once screen to another or vice-versa)
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
        <View style={logStyles.container}>
            <InputWithSearch>
                <MIcon name="magnify" size={22} color="#222" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Search by building info...."
                    value={building}
                    onChangeText={(text) => {
                        setBuilding(text);
                        // If you want instant reset on clear even without live search:(i.e retrieve all list)
                        if (!text) setDemo(buildingCtx.buildingData);
                    }}
                    style={logStyles.searchInput}
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
                        <MIcon name="close-circle" size={20} color={Colors.gray} />
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