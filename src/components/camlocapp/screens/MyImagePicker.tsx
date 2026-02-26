import { useState } from "react";
import { Alert, Button, Image, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import ImagePicker, { Image as CropImage } from "react-native-image-crop-picker";
import { Colors } from "../../../constants/colors";

export default function MyImagePicker({ onImagePick }: { onImagePick: (val: string | undefined) => void }) {
    const [selectedImage, setSelectedImage] = useState<CropImage | null>();

    const ensureCameraPermission = async () => {
        if (Platform.OS !== "android") return true;
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    const takeImageHandler = async () => {
        const ok = await ensureCameraPermission();
        if (!ok) {
            Alert.alert("Insufficient Permission!", "You need to grant camera permission to use this app");
            return;
        }

        ImagePicker.openCamera({
            mediaType: "photo",
            assetRepresentationMode: "compatible",
            compressImageQuality: 0.5,
            cropping: true,
            // freeStyleCropEnabled: true,
            // cropperToolbarTitle: "Crop your photo",
        }).then((image) => {
            if (Array.isArray(image)) {
                const first: CropImage = image[0];
                if (first && "path" in first) {
                    setSelectedImage(first as CropImage);
                    onImagePick(first.path);
                }
                return;
            }
            
            if ("path" in image){
                setSelectedImage(image as CropImage);
                onImagePick(image.path);
            } 
            console.log(`Displaying in MyImagePicker:${image}`);
        }).catch((error) => {
            Alert.alert("Insufficient Permission!", "You need to grant camera permission to use this app");
            console.log(error);
        });
    }

    let imagePreview = <Text>No image selected/taken</Text>

    if (selectedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: selectedImage?.path }} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <Button title="Take Image" onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%"
    }
})