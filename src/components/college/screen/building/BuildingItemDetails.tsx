import { StyleSheet, Text, View } from "react-native";
import { BuildingDetailsProp, formatPostalAddress } from "../../database/model";

export default function BuildingItemDetails({ item }: { item: BuildingDetailsProp }) {
    return (
        <View style={styles.buildItemContainer}>
            <Text style={styles.textColor}>Name: {item.name}</Text>
            <Text style={styles.textColor}>Location: {formatPostalAddress(item.address, item.pincode, item.city, item.state, item.country)}</Text>
            <Text style={styles.textColor}>There are total {item.floors} floors</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    buildItemContainer: {
        padding: 16
    },
    textColor: {
        color: "#000"
    },
})