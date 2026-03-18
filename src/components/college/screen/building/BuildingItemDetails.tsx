import { Text, View } from "react-native";
import { BuildingDetailsProp, formatPostalAddress } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";

export default function BuildingItemDetails({ item }: { item: BuildingDetailsProp }) {
    const itemDetailStyles = useItemDetailStyles();
    return (
        <View style={itemDetailStyles.itemContainer}>
            <Text style={itemDetailStyles.description}>Name: {item.name}</Text>
            <Text style={itemDetailStyles.description}>Location: {formatPostalAddress(item.address, item.pincode, item.city, item.state, item.country)}</Text>
            <Text style={itemDetailStyles.description}>There are total {item.floors} floors</Text>
        </View>
    )
}