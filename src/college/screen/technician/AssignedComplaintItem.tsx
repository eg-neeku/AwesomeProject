import { useNavigation } from "@react-navigation/native";
import { ComplaintDetailsProps, GOTO_S_COMPLAINT_IN_DETAIL_PAGE } from "../../database/model";
import { Pressable } from "react-native";
import { logStyles } from "../screenStyles";
import ComplaintItemDetails from "../complaint/ComplaintItemDetails";

export default function AssingedComplaintItem({ item, onRefresh }: { item: ComplaintDetailsProps, onRefresh?: () => void }) {
    const navigation: any = useNavigation();

    const handleComplaintPress = () => {
        navigation.navigate(GOTO_S_COMPLAINT_IN_DETAIL_PAGE, {
            item: item
        });
    };

    return (
        <Pressable
            onPress={handleComplaintPress}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}
        >
            <ComplaintItemDetails item={item} onUpdateSuccess={onRefresh} />
        </Pressable>
    );
}