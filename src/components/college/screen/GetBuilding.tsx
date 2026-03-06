import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { BUILDING_DATA, DetailsProp } from "../database/model";
// import Icon from "react-native-vector-icons/Ionicons";

export function BuildingItem({ item, navigation }: { item: DetailsProp, navigation: any }) {
    const handlePress = () => {
        navigation.navigate("complaintbuilding", {
            buildingId: item.id,
            buildingName: item.name
        });
    }

    return (
        <Pressable style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]} onPress={handlePress}>
            <View style={styles.buildItemContainer}>
                <Text style={styles.textColor}>{item.id} - {item.name}</Text>
            </View>
            {/* <Pressable style={styles.iconcontainer}
                onPress={handlePress} >
                <Icon name="pencil-sharp" size={24} color="#000" />
            </Pressable> */}
        </Pressable>
    )
}

export default function GetBuilding() {
    const [buildingData, setBuildingData] = useState<DetailsProp[]>(BUILDING_DATA);
    const navigation: any = useNavigation();

    return <FlatList data={buildingData} keyExtractor={(item) => `${item.id}`}
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
        margin: 5
    },
    afterPressed: {
        opacity: 0.35,
        backgroundColor: "#ff0"
    },
    // iconcontainer: {
    //     justifyContent: "center",
    //     alignItems: "center",
    //     borderRadius: 800,
    //     position: "absolute",
    //     backgroundColor: "#f1a9f1",
    //     padding: 16,
    //     bottom: 0,
    //     // left: 0,
    //     right: 0,
    //     zIndex: 2,
    // }
});