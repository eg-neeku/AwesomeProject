import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import { ComplaintDetailsProps, formatPostalAddress } from "../../database/model";
import { useItemDetailStyles } from "../screenStyles";
import { useEffect, useState } from "react";
import { fetchBuildingDataById } from "../../database/buildinghttp";
import MyButton from "../../UI/MyButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import { updateComplaintStatus } from "../../database/complainthttp";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Colors from "../../../constants/colors";

export default function ComplaintItemDetails({ item, onUpdateSuccess }: { item: ComplaintDetailsProps, onUpdateSuccess?: () => void }) {
    const itemDetailStyles = useItemDetailStyles();
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
                    action ? <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={statusOptions}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Change Complaint Status..."
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    /> :
                        <Text style={itemDetailStyles.description}>Status: {item.status.toString().toUpperCase()}</Text>
                }
                <MyButton title={action ? "Update" : "Change"} onPress={action ? handleComplaintStatusUpdate : () => setAction(true)} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buildItemContainer: {
        padding: 16
    },
    assigningSection: {
        marginTop: 25,
        flex: 0.25
    }
});