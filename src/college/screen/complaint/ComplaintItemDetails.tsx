import { Linking, Platform, Text, View } from "react-native";
import { ComplaintDetailsProps, formatPostalAddress } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";
import { useContext, useEffect, useState } from "react";
import { fetchBuildingDataById } from "../../database/buildinghttp";
import MyButton from "../../UI/MyButton";
import { updateComplaintStatus } from "../../database/complainthttp";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Colors from "../../../constants/colors";
import { AuthContext } from "../../database/AuthContentProvider";
import MyDropDown from "../../UI/MyDropDown";

export default function ComplaintItemDetails({ item, onUpdateSuccess }: { item: ComplaintDetailsProps, onUpdateSuccess?: () => void }) {
    const itemDetailStyles = useItemDetailStyles();
    const { authItems } = useContext(AuthContext);
    const [building, setBuilding] = useState({ name: "", location: "" });

    const [action, setAction] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("" as ComplaintDetailsProps["status"]);
    const statusOptions = [
        { label: "In progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
    ];

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

    const openMapLocation = (address: string) => {
        const encoded = encodeURIComponent(address);

        const url = Platform.select({
            ios: `maps://?q=${encoded}`,
            android: `geo:0,0?q=${encoded}`,
        });

        Linking.openURL(url ?? "").catch((error) => console.log("Could not load the page", error));
    }

    const handleComplaintStatusUpdate = async () => {
        if (value?.length === 0) return;
        setLoading(true);
        try {
            await updateComplaintStatus(item.id, value);
        } catch (error) {
            console.log("Unable to update the status of the complaint: ", error);
        } finally {
            setAction(false);
            setLoading(false);
            setValue("" as ComplaintDetailsProps["status"]);
            onUpdateSuccess?.();
        }
    };

    if (loading) return <LoadingOverlay color={Colors.blue} />

    return (
        <View style={itemDetailStyles.itemContainer}>
            <Text style={itemDetailStyles.description}>ComplaintId: {item.id}</Text>
            <Text style={itemDetailStyles.description} onPress={() => openMapLocation(`${building.name}: ${building.location}`)}>Building details: {building.name} - {building.location}</Text>
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
            {item.status && <View>
                {
                    action ? <MyDropDown
                        focus={isFocus}
                        itemList={statusOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Change Complaint Status..."
                        searchPlaceholder="Search..."
                        selectedValue={setValue}
                    />  :
                        <Text style={itemDetailStyles.description}>Status: {item.status.toString().toUpperCase()}</Text>
                }
                {authItems.role === "techni" && <MyButton title={action ? "Update" : "Change"} onPress={action ? handleComplaintStatusUpdate : () => setAction(true)} />}
            </View>}
        </View>
    )
}