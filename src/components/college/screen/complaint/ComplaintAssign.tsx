import { Text, View } from "react-native";

export default function ComplaintAssign({ route }: any) {
    const complaintId = route.params?.complaintId;
    const technicianList = route.params?.technicianList; //TechnicianDetailsProps[]
    const status = route.params?.status;
    return (
        <View>
            <Text>{complaintId} = {status}  = {technicianList[0]?.name}</Text>
        </View>
    )
}