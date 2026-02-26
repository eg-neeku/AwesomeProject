import { Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { Colors } from "../../../constants/colors.js";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

type PlaceItemProp = {
    id: string,
    title: string,
    imageUri: string,
    address: string,
    location: string,
}

const renderPlaceList = (place: PlaceItemProp) => {
    const styles = StyleSheet.create({
        fallbackContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        fallbackText: {
            fontSize: 16,
            color: Colors.primary200
        },
        item: {
            flexDirection: "row",
            alignItems: "flex-start",
            borderRadius: 6,
            marginVertical: 12,
            backgroundColor: Colors.primary500,
            elevation: 2,
            shadowColor: 'black',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
        },
        image: {
            flex: 1,
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
            height: 100
        },
        pressed: {
            opacity: 0.75
        },
        placedetails: {
            flex: 2,
            padding: 12
        }
    });

    if (!place) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No place added yet - start adding some!</Text>
            </View>
        )
    }

    return (
        <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
            <Image style={styles.image} source={{ uri: place.imageUri }} />
            <View style={styles.placedetails}>
                <Text style={{ color: Colors.gray700 }}>{place.title}</Text>
                <Text style={{ color: Colors.gray700 }}>{place.address}</Text>
            </View>
        </Pressable>
    )
}


export default function AllPlaces({ route }: any) {
    const [placeData, setPlaceData] = useState<PlaceItemProp[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params?.placeData) {
            setPlaceData(prevPlaceData => [...prevPlaceData, route.params.placeData]);
        }
    }, [isFocused]);

    return (
        <FlatList style={{ margin: 24 }}
            data={placeData}
            renderItem={(itemData) => renderPlaceList(itemData.item)}
            keyExtractor={(item) => item.id}
        />
    )
}