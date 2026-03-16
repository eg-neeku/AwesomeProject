import { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { assignComplaintToTechnician, fetchComplaintDataById } from "../../database/complainthttp";
import MyButton from "../../UI/MyButton";
import LoadingOverlay from "../../UI/LoadingOverlay";
import { ComplaintDetailsProps, GOTO_S_TECHNICIAN_LOG_PAGE, GOTO_SD_MAIN_PAGE, TechnicianDetailsProps } from "../../database/model";
import { fetchTechnicianDataById } from "../../database/technicianhttp";
import TechnicianItemDetails from "../technician/TechnicianItemDetails";

export default function ComplaintAssign({ navigation, route }: any) {
    const complaintItem: ComplaintDetailsProps = route.params?.complaintItem;
    const complaintId: ComplaintDetailsProps["id"] = complaintItem.id;
    const technicianList: TechnicianDetailsProps[] = route.params?.technicianList; //TechnicianDetailsProps[]
    const status = route.params?.status;

    const dropdownTechnicianList = technicianList?.map((technician) => ({
        label: technician.name,
        value: technician.emailId,
    }));

    const [technician, setTechnician] = useState<TechnicianDetailsProps>();

    useEffect(() => {
        (async function getComplaintById() {
            try {
                let response = await fetchComplaintDataById(complaintId);
                response = await fetchTechnicianDataById(response?.technicianId);
                setTechnician(response);
            } catch (error) {
                console.log("Unable to fetch who was assigned to this complaint");
            }
        })()
    }, [])

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Assign Complaint to
                </Text>
            );
        }
        return null;
    };

    const getTechnicianId = () => {
        const reponse = technicianList.find((technician) => technician.emailId === value);
        return reponse?.id;
    }

    const sendEmail = async (to: string = "", subject: string, body: string, cc?: string, bcc?: string) => {
        const queries = new URLSearchParams({
            subject: subject,
            body: body
        });

        cc && queries.append('cc', cc);
        bcc && queries.append('bcc', bcc);

        const params = queries.toString();

        const url = `mailto:${to}?${params}`;
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) {
            console.log("Unable to send email, Please check if mail app is there and you granted the permission");
            return;
        }
        await Linking.openURL(url);
    }

    const handleAssignComplaint = async () => {
        setLoading(true);
        try {
            const technicianId = getTechnicianId();
            await assignComplaintToTechnician(complaintId, technicianId??"", status);
            console.log("Complaint Assigned");
            await sendEmail(technician?.emailId, "Please Fix this issue", `Hi ${technician?.name}, This is ${complaintItem?.name}.\n\t${complaintItem?.description + complaintItem?.comment}\n\nThankyou!`);
            navigation.navigate(GOTO_SD_MAIN_PAGE, {
                screen: GOTO_S_TECHNICIAN_LOG_PAGE
            });
        } catch (error) {
            console.log("Unable to assign the complaint");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingOverlay color="#00f" />;
    }

    return (
        <View style={styles.container}>
            {technician && <>
                <Text>The complaint is already assigned to technician named {technician.name}</Text>
                <TechnicianItemDetails item={technician} />
                <Text style={styles.textColor}> Do you wanna reassign to someone else?</Text>
            </>
            }
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dropdownTechnicianList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
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
            />
            <Text>{value}</Text>
            <View style={{ alignItems: "center" }}>
                <MyButton title="Assign Complaint" onPress={handleAssignComplaint} />
            </View>
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
    textColor: {
        color: "#000"
    },
});