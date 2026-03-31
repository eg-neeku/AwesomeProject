import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ComplaintDetailsProps } from "../../database/model";
import ComplaintItemDetails from "../complaint/ComplaintItemDetails";
import { useRoute } from "@react-navigation/native";

export default function ComplaintInDetail() {
    const route: any = useRoute();
    const complaintItem: ComplaintDetailsProps = route?.params?.item;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ComplaintItemDetails item={complaintItem} />
            <View style={styles.imageSection}>
                {complaintItem.imageURL
                    ? <Image source={{ uri: complaintItem.imageURL }} style={styles.image} resizeMode="cover" />
                    : <Text style={styles.noImageText}>No image found! Kindly put the image for proof.</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    imageSection: {
        margin: 16,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 10,
    },
    noImageText: {
        color: "#888",
        fontStyle: "italic",
        textAlign: "center",
        padding: 16,
    },
})