import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { assignComplaintToTechnician, fetchComplaintDataById } from "../../database/complainthttp";
import MyButton from "../../UI/MyButton";
import LoadingOverlay from "../../UI/LoadingOverlay";
import { ComplaintDetailsProps, GOTO_D_TECHNICIAN_LOG_PAGE, GOTO_SD_MAIN_PAGE, sendEmail, TechnicianDetailsProps } from "../../database/model";
import { fetchTechnicianDataById } from "../../database/technicianhttp";
import TechnicianItemDetails from "../technician/TechnicianItemDetails";
import Colors from "../../../constants/colors";
import MyDropDown from "../../UI/MyDropDown";
import { AppContext } from "../../database/AppContextProvider";

export default function ComplaintAssign({ navigation, route }: any) {
    const complaintItem: ComplaintDetailsProps = route.params?.complaintItem;
    const complaintId: ComplaintDetailsProps["id"] = complaintItem.id;
    const technicianList: TechnicianDetailsProps[] = route.params?.technicianList;
    const { isDarkMode } = useContext(AppContext);

    const dropdownTechnicianList = technicianList?.map((technician) => ({
        label: technician.firstName + " " + technician.lastName,
        value: technician.emailId,
    }));

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        textColor: {
            color: isDarkMode ? Colors.white : Colors.dark
        },
        assigningSection: {
            marginBottom: 50,
            flex: 0.25
        }
    });

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
        })();
    }, []);

    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [loading, setLoading] = useState(false);

    const getTechnicianId = () => {
        const reponse = technicianList.find((technician) => technician.emailId === value);
        return reponse?.id;
    };

    const handleAssignComplaint = async () => {
        setLoading(true);
        try {
            const technicianId = getTechnicianId();
            await assignComplaintToTechnician(complaintId, technicianId ?? "", "assigned");
            console.log("Complaint Assigned");
            await sendEmail(value, "Please Fix this issue", `Hi ${technician?.firstName} ${technician?.lastName}, This is ${complaintItem?.name}.\n\t${complaintItem?.description + complaintItem?.comment}\n\nThankyou!`);
            navigation.navigate(GOTO_SD_MAIN_PAGE, {
                screen: GOTO_D_TECHNICIAN_LOG_PAGE
            });
        } catch (error) {
            console.log("Unable to assign the complaint");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingOverlay color={Colors.navy} />;
    }

    return (
        <View style={styles.container}>
            {technician?.emailId && <View style={styles.assigningSection}>
                <Text style={styles.textColor}>The complaint is already assigned to technician named {technician.firstName} {technician.lastName}</Text>
                <Text style={styles.textColor}> Do you wanna reassign to someone else?</Text>
                <TechnicianItemDetails item={technician} />
            </View>
            }
            <MyDropDown
                focus={isFocus}
                itemList={dropdownTechnicianList}
                labelField="label"
                valueField="value"
                placeholder="Assign Complaint To..."
                searchPlaceholder="Search..."
                selectedValue={setValue}
                isDarkMode={isDarkMode}
            />
            <View style={{ alignItems: "center" }}>
                <MyButton title="Assign Complaint" onPress={handleAssignComplaint} />
            </View>
        </View>
    )
}