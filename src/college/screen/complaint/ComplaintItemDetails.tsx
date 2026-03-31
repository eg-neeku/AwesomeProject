import { Text, View } from "react-native";
import { ComplaintDetailsProps } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";

export default function ComplaintItemDetails({ item }: { item: ComplaintDetailsProps }) {
    const itemDetailStyles = useItemDetailStyles();
    return (
        <View style={itemDetailStyles.itemContainer}>
            <Text style={itemDetailStyles.description}>ComplaintId: {item.id}</Text>
            <Text style={itemDetailStyles.description}>Person Name: {item.name}</Text>
            <Text style={itemDetailStyles.description}>Description: {item.description}</Text>
            <Text style={itemDetailStyles.description}>Comment: {item.comment}</Text>
            <Text style={itemDetailStyles.description}>Priority: {item.priority}</Text>
            <Text style={itemDetailStyles.description}>
                Date of complaint registered:
                {item.startDate
                    ? (typeof item.startDate === "string"
                        ? new Date(item.startDate)
                        : item.startDate
                    )?.toDateString()
                    : "-"}
            </Text>
            {item.status && <Text style={itemDetailStyles.description}>Status: {item.status.toString().toUpperCase()}</Text>}
        </View>
    )
}