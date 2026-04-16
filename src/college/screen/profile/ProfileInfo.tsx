import { Text, View } from "react-native";
import { AuthContentProps } from "../../database/model";
import { profileStyles } from "./profileStyles";

export default function ProfileInfo({ profile }: { profile: AuthContentProps["authItems"] }) {
    return (
        <View>
            <View style={profileStyles.detailSection}>
                <Text>Bio: </Text>
                <Text>Hey there, I'm {profile.firstName} {profile.lastName}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text>Email Address: </Text>
                <Text>{profile.emailId}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text>Gender: </Text>
                <Text>{profile.gender === "M" ? "Male" : "Female"}</Text>
            </View>
            <View style={profileStyles.detailSection}>
                <Text>Phone number: </Text>
                <Text>{profile.phoneNumber}</Text>
            </View>
        </View>
    )
}

