import { useState } from "react";
import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/colors";
import MyButton from "./MyButton";
import { launchCamera } from "react-native-image-picker";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function MyImagePicker({ onImagePick, defaultImageURL = "" }: { onImagePick: (val: string) => void, defaultImageURL?: string }) {

    const [selectedImage, setSelectedImage] = useState<string | null>();
    const styles = StyleSheet.create({
        imagePreview: {
            width: "100%",
            ...((selectedImage || defaultImageURL) && { height: 200 }),
            marginVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary100,
            borderRadius: 4,
            minHeight: 35
        },
        image: {
            width: "100%",
            height: "100%"
        },
        imageContainer: {
            marginBottom: 20
        }
    })

    const ensureImagePermission = async () => {
        if (Platform.OS !== "android") return true;
        const cameraPermission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) return false;

        const readCameraRollPermission = Number(Platform.Version) >= 33 ?
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
            : await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        return readCameraRollPermission === PermissionsAndroid.RESULTS.GRANTED;
    }

    const takeImageHandler = async () => {
        const ok = await ensureImagePermission();
        if (!ok) {
            Alert.alert("Insufficient Permission!", "You need to grant camera permission to use this feature");
            return;
        }

        try {
            // return the temp uri path, but saves in gallery app
            const image = await launchCamera({
                mediaType: "photo",
                assetRepresentationMode: "compatible",
                quality: 0.5,
                saveToPhotos: true
            })
            if (!image.assets || image.assets.length <= 0) return;

            // once photo clicked, fetch the recent pic. 
            const photos = await CameraRoll.getPhotos({
                first: 1,
                assetType: "Photos"
            });

            const galleryUri = photos.edges[0]?.node?.image?.uri;
            if (galleryUri) {
                console.log("Gallery path to the image is: ", galleryUri);
                setSelectedImage(galleryUri);
                onImagePick(galleryUri);
            }
        } catch (error) {
            console.log("Error in fetching image:", error);
        };
    }

    let imagePreview = <Text>No image selected/taken</Text>

    if (selectedImage || !!defaultImageURL) {
        imagePreview = <Image style={styles.image} source={{ uri: selectedImage ?? defaultImageURL }} />
    }

    return (
        <View style={styles.imageContainer}>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <View style={{ alignItems: "center" }}>
                <MyButton title="Take Image" onPress={takeImageHandler} />
            </View>
        </View>
    )
}
