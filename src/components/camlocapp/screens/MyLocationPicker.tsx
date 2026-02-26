import { Button, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";

type MyLocPickProp = { lat: number, lng: number }

export default function MyLocationPicker({ onLocationPick }: { onLocationPick: (val: MyLocPickProp) => void }) {
    const [pickedLocation, setPickedLocation] = useState<MyLocPickProp>({ lat: 0, lng: 0 });
    const navigation: any = useNavigation();
    const route: any = useRoute();
    const isFocused: boolean = useIsFocused();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = { lat: route.params.pickedLatitude, lng: route.params.pickedLongitude };
            setPickedLocation(mapPickedLocation);
            onLocationPick(pickedLocation);
        }
    }, [route, isFocused]);

    const getLocationHandler = () => {

    }

    const pickOnMapHandler = () => {
        navigation.navigate("Map");
    }

    return (
        <View>
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <Button title="Locate User" onPress={getLocationHandler} />
                <Button title="Pick on Map" onPress={pickOnMapHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});