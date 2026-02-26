import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../../constants/colors";
import MyImagePicker from "./MyImagePicker";
import MyLocationPicker from "./MyLocationPicker";
import { Place } from "../models/place";

export default function AddPlace({ navigation }: any) {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | undefined>("");
    const [pickedLocation, setPickedLocation] = useState({ lat: 0, lng: 0 });

    const changeTitleHandler = (enteredText: string) => {
        setEnteredTitle(enteredText);
    }

    const pickLocationHandler = useCallback((location: typeof pickedLocation) => {
        setPickedLocation(location);
    }, [])

    const pickImageHandler = (imageUri: string | undefined) => {
        setSelectedImage(imageUri);
    }

    const savePlaceHandler = () => {
        // console.log(`Entered Title: ${enteredTitle}`);
        // console.log(`Selected Image: ${selectedImage}`);
        // console.log(`Picked Location: ${pickedLocation}`);

        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        navigation.navigate("AllPlaces", {
            placeData: placeData
        });
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <MyImagePicker onImagePick={pickImageHandler} />
            <MyLocationPicker onLocationPick={pickLocationHandler} />
            <Button title="Add Place" onPress={savePlaceHandler} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
});