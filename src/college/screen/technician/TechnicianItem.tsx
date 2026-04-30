import { useContext } from "react";
import { AuthContext } from "../../database/AuthContentProvider";
import { doNothing, GOTO_S_ASSIGNED_COMPLAINT_PAGE, GOTO_S_MANAGE_TECHNICIAN_PAGE, TechnicianDetailsProps } from "../../database/model";
import { Pressable, View } from "react-native";
import TechnicianItemDetails from "./TechnicianItemDetails";
import { useLogStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";

export default function TechnicianItem({ item, navigation }: { item: TechnicianDetailsProps, navigation: any }) {
    const logStyles = useLogStyles();
    const { authItems } = useContext(AuthContext);
    const handleTechnicianPress = () => {
        navigation.navigate(GOTO_S_MANAGE_TECHNICIAN_PAGE, {
            technicianId: item.id
        });
    };

    const getComplaintAssigned = () => {
        navigation.navigate(GOTO_S_ASSIGNED_COMPLAINT_PAGE, {
            technicianId: item.id
        });
    };

    return (
        <Pressable onPress={authItems.role === "admin" ? handleTechnicianPress : doNothing}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}>
            <TechnicianItemDetails item={item} />
            <View style={logStyles.itemOptions}>
                <MyIcon onPress={getComplaintAssigned} iconBgColor={Colors.lightRed} paddingInsideIcon={6}>
                    <Icon name="arrow-forward" size={20} color={Colors.dark} />
                </MyIcon>
            </View>
        </Pressable>
    )
}