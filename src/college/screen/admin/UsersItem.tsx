import { Pressable, Text, View } from "react-native";
import { useProfileStyles } from "../profile/profileStyles";
import { doNothing, RegisterDTOProps } from "../../database/model";
import { useLogStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import { useContext } from "react";
import { AppContext } from "../../database/AppContextProvider";

export default function UsersItems({ item }: { item: RegisterDTOProps }) {
    const profileStyles = useProfileStyles();
    const logStyles = useLogStyles();
    const { isDarkMode } = useContext(AppContext);

    return (<Pressable onPress={doNothing}
        style={({ pressed }) => [{ marginVertical: 5, borderRadius: 5, borderTopRightRadius: 45, borderBottomLeftRadius: 45 },
        isDarkMode && { borderWidth: 1, borderColor: Colors.aqua }, pressed && logStyles.afterPressed]}>
        <View style={logStyles.container}>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Full Name: </Text>
                <Text style={profileStyles.textMessage}> {item.firstName} {item.lastName}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Email Address: </Text>
                <Text style={profileStyles.textMessage}>{item.emailId}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Gender: </Text>
                <Text style={profileStyles.textMessage}>{item.gender === "M" ? "Male" : "Female"}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Phone number: </Text>
                <Text style={profileStyles.textMessage}>{item.phoneNumber}</Text>
            </View>
        </View>
    </Pressable>
    )
}