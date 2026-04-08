import { Text, View } from "react-native";
import { ComplaintDetailsProps, formatPostalAddress } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";
import { useEffect, useState } from "react";
import { fetchBuildingDataById } from "../../database/buildinghttp";

export default function ComplaintItemDetails({ item }: { item: ComplaintDetailsProps }) {
    const itemDetailStyles = useItemDetailStyles();
    const [building, setBuilding] = useState({ name: "", location: "" });
    
    useEffect(() => {
        async function getBuildingDetails() {
            try {
                const response = await fetchBuildingDataById(item.buildingId);
                setBuilding({ name: response.name, location: formatPostalAddress(response.address, response.pincode, response.city, response.state, response.country) })
            } catch (error) {
                console.log("Unable to fetch the building data");
            }
        }
        getBuildingDetails();
    }, []);

    return (
        <View style={itemDetailStyles.itemContainer}>
            <Text style={itemDetailStyles.description}>ComplaintId: {item.id}</Text>
            <Text style={itemDetailStyles.description}>Building details: {building.name} - {building.location}</Text>
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