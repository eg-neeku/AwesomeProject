import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { BuildingDetailsProp } from "../database/model";
import { BuildingContext } from "../database/BuildingContextProvider";
import { fetchBuildingData } from "../database/buildinghttp";
import Icon from "react-native-vector-icons/Ionicons";
import MyIcon from "../UI/MyIcon";

function BuildingItem({ item, navigation }: { item: BuildingDetailsProp, navigation: any }) {
    const handlePress = () => {
        navigation.navigate("ManageBuilding", {
            buildingId: item.id
        });
    }

    const handleComplaintPress = () => {
        navigation.navigate("ComplaintBuilding", {
            buildingId: item.id,
            buildingName: item.name
        });
    }

    return (
        <Pressable onPress={handlePress}
            style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <View style={styles.buildItemContainer}>
                <Text style={styles.textColor}>{item.name} - {item.location}</Text>
            </View>
            <MyIcon onPress={handleComplaintPress}>
                <Icon name="pencil-sharp" size={24} color="#000" />
            </MyIcon>
        </Pressable>
    )
}

export default function GetBuilding() {
    const buildingCtx = useContext(BuildingContext);
    const navigation: any = useNavigation();

    useEffect(() => {
        (async function getBuildingDetails() {
            try {
                const data = await fetchBuildingData();
                buildingCtx.setBuildingData(data);
            } catch (error) {
                console.log("Error fetching building data: ", error);
                buildingCtx.setBuildingData([] as BuildingDetailsProp[]);
            }
        })();
    }, [])

    return <FlatList data={buildingCtx.buildingData} keyExtractor={(item) => `${item.id}`}
        renderItem={(itemData) => { return <BuildingItem item={itemData.item} navigation={navigation} /> }} />
}

const styles = StyleSheet.create({
    buildItemContainer: {
        padding: 16
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
});