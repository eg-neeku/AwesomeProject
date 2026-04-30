import { Text, View } from "react-native";
import { AuthContentProps } from "../../database/model";
import { useProfileStyles } from "./profileStyles";

export default function ProfileInfo({ profile }: { profile: AuthContentProps["authItems"] }) {
    const profileStyles = useProfileStyles();
    return (
        <View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Bio: </Text>
                <Text style={profileStyles.textMessage}>Hey there, I'm {profile.firstName} {profile.lastName}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Email Address: </Text>
                <Text style={profileStyles.textMessage}>{profile.emailId}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Gender: </Text>
                <Text style={profileStyles.textMessage}>{profile.gender === "M" ? "Male" : "Female"}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text style={profileStyles.textMessage}>Phone number: </Text>
                <Text style={profileStyles.textMessage}>{profile.phoneNumber}</Text>
            </View>
        </View>
    )
}

