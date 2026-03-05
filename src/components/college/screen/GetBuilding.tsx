import { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

type DetailsProp = {
    id: string,
    name: string,
}

const BUILDING_DATA: DetailsProp[] = [
    {
        id: "a",
        name: "testa"
    },
    {
        id: "b",
        name: "testb"
    }
];

export function BuildingItem({ item }: { item: DetailsProp }) {
    return (
        <Pressable style={({ pressed }) => [styles.beforePressed, pressed && styles.afterPressed]}>
            <View style={styles.buildItemContainer}>
                <Text style={styles.textColor}>{item.id} - {item.name}</Text>
            </View>
        </Pressable>
    )
}

export default function GetBuilding() {
    const [buildingData, setBuildingData] = useState<DetailsProp[]>(BUILDING_DATA);

    return <FlatList data={buildingData} keyExtractor={(item) => `${item.id}`}
        renderItem={(itemData) => { return <BuildingItem item={itemData.item} /> }} />
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
    }
});