import { StyleSheet, Text, View } from "react-native";
import { TechnicianDetailsProps } from "../../database/model";

export default function TechnicianItemDetails({ item }: { item: TechnicianDetailsProps }) {
    return (
        <View style={styles.technicianItemContainer}>
            <Text style={styles.textColor}>Name: {item.name}</Text>
            <Text style={styles.textColor}>Email Address: {item.emailId}</Text>
            <Text style={styles.textColor}>Phone number: {item.phno}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    technicianItemContainer: {
        padding: 16
    },
    textColor: {
        color: "#000"
    },
})