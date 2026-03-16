import { StyleSheet, Text, View } from "react-native";
import { ComplaintDetailsProps } from "../../database/model";

export default function ComplaintItemDetails({ item }: { item: ComplaintDetailsProps }) {
    return (
        <View style={styles.complaintInnerContainer}>
            <Text>ComplaintId: {item.id}</Text>
            <Text>Person Name: {item.name}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Comment: {item.comment}</Text>
            <Text>Priority: {item.priority}</Text>
            <Text>
                Date of complaint registered:
                {item.startDate
                    ? (typeof item.startDate === "string"
                        ? new Date(item.startDate)
                        : item.startDate
                    )?.toDateString()
                    : "-"}
            </Text>
            {item.status && <Text>Status: {item.status.toString().toUpperCase()}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    complaintInnerContainer: { padding: 12 },
})