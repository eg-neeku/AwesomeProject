import { Text, View } from "react-native";
import { TechnicianDetailsProps } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";

export default function TechnicianItemDetails({ item }: { item: TechnicianDetailsProps }) {
    const itemDetailStyles = useItemDetailStyles();
    return (
        <View style={itemDetailStyles.itemContainer}>
            <Text style={itemDetailStyles.description}>Name: {item.name}</Text>
            <Text style={itemDetailStyles.description}>Email Address: {item.emailId}</Text>
            <Text style={itemDetailStyles.description}>Phone number: {item.phno}</Text>
        </View>
    )
}