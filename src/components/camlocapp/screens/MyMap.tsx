import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, UrlTile } from "react-native-maps";
import IconButton from "../IconButton";

type MapProps = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export default function MyMap({ navigation }: any) {
    const [selectedLocation, setSelectedLocation] = useState<MapProps>({ latitude: 37.78, longitude: -122.43, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("No location picked!", "You have to pick a location (by tapping on the map) first")
            return;
        }
        navigation.navigate("AddPlace", {
            pickedLatitude: selectedLocation.latitude,
            pickedLongitude: selectedLocation.longitude,
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }: { tintColor: string }) => <IconButton icon="save"
                color={tintColor} size={24} onPress={savePickedLocationHandler} />
        })
    }, [navigation, savePickedLocationHandler]);

    const selectLocationHandler = (event: MapPressEvent) => {
        console.log(event);
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation(prevVal => ({ ...prevVal, latitude: lat, longitude: lng }));
    }

    return (
        <MapView initialRegion={selectedLocation} style={styles.map}
            onPress={selectLocationHandler}>
            <UrlTile urlTemplate="https://tiles.openfreemap.org/styles/liberty/{z}/{x}/{y}.png"
                maximumZ={19}
            />
            {selectedLocation && <Marker coordinate={{ latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }} />}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        marginVertical: 2,
        marginHorizontal: 5
    }
});