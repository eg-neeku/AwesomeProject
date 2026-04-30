import { useState } from "react";
import { ComplaintDetailsProps, doNothing, GOTO_S_COMPLAINT_ASSIGN_PAGE, TechnicianDetailsProps } from "../../database/model";
import { Alert, Pressable, View } from "react-native";
import { deleteComplaintData } from "../../database/complainthttp";
import LoadingOverlay from "../../UI/LoadingOverlay";
import Colors from "../../../constants/colors";
import { useLogStyles } from "../screenStyles";
import ComplaintItemDetails from "./ComplaintItemDetails";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type ComplaintItemProps = {
    item: ComplaintDetailsProps,
    onRefresh: () => void,
    navigation: any,
    technicianList: TechnicianDetailsProps[]
}

export default function ComplaintItem({ item, onRefresh, navigation, technicianList }: ComplaintItemProps) {
    const logStyles = useLogStyles();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const deleteComplaintHandler = () => {
        Alert.alert("Delete Complaint!", "Are you sure you want to delete it?", [
            {
                text: "Okay",
                onPress: async () => {
                    setIsSubmitting(true);
                    try {
                        await deleteComplaintData(item.id);
                        onRefresh();
                    } catch (error) {
                        console.log("Unable to delete the complaint data", error);
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                style: "destructive",
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    const handleAssignComplaint = () => {
        navigation.navigate(GOTO_S_COMPLAINT_ASSIGN_PAGE, {
            complaintItem: { ...item, startDate: item.startDate?.toISOString() },
            technicianList: technicianList
        });
    };

    if (isSubmitting) {
        return <LoadingOverlay color={Colors.blue} />;
    }

    return (
        <Pressable
            onPress={doNothing}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}
        >
            <ComplaintItemDetails item={item} />
            <View>
                <View style={logStyles.itemOptions}>
                    <MyIcon onPress={deleteComplaintHandler} iconBgColor={Colors.lightRed} paddingInsideIcon={8}>
                        <Icon name="delete" size={20} color={Colors.white} />
                    </MyIcon>
                    <MyIcon onPress={handleAssignComplaint} iconBgColor={Colors.lightRed} paddingInsideIcon={6}>
                        <Icon name="location-exit" size={20} color={Colors.white} />
                    </MyIcon>
                </View>
            </View>
        </Pressable>
    );
}