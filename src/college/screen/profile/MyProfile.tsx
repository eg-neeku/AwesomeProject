import { useContext, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { formStyles } from "../screenStyles";
import MyImagePicker from "../../UI/MyImagePicker";
import Colors from "../../../constants/colors";
import { RegisterDTOProps } from "../../database/model";
import { AuthContext } from "../../database/AuthContentProvider";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { saveProfileImage } from "../../database/registerhttp";
import EditMyProfile from "./EditMyProfile";
import ProfileInfo from "./ProfileInfo";
import { profileStyles } from "./profileStyles";

export default function MyProfile() {
    const { authItems, token, setAuth } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<RegisterDTOProps>(authItems);

    const handleLogout = async () => {
        setAuth({ authItems: {} as RegisterDTOProps, token: "" });
    };

    const saveProfilePicHandler = async (val: string) => {
        try {
            await saveProfileImage(authItems.emailId, val);
        } catch (error) {
            const errMsg = "Unable to add profile pic. Internet error";
            console.log(errMsg, error);
            Alert.alert("", errMsg, [{ text: "okay", style: "cancel" }]);
        }
        setProfile(prev => ({ ...prev, profilePic: val }));
    };

    const handleSaved = (updated: RegisterDTOProps) => {
        setProfile(updated);
        setAuth({ authItems: updated, token });
        setIsEditing(false);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[formStyles.forms, { margin: 5 }]}>
                <View style={{ alignItems: "flex-end" }}>
                    <MyIcon onPress={handleLogout} iconBgColor={Colors.normalRed}>
                        <Icon name="logout" size={20} color={Colors.dark} />
                    </MyIcon>
                </View>
                <MyImagePicker onImagePick={saveProfilePicHandler}
                    defaultImageURL={profile.profilePic ?? ""}
                    shape="circle" myImgTitle="Edit DP" />

                <View style={profileStyles.detailContainer}>
                    <View style={profileStyles.sectionHeader}>
                        <Text style={[formStyles.titleHead, { fontSize: 20 }]}>Profile Info</Text>
                        {!isEditing && (
                            <MyIcon onPress={() => setIsEditing(true)} iconBgColor={Colors.primary}>
                                <Icon name="pencil" size={18} color={Colors.white} />
                            </MyIcon>
                        )}
                    </View>

                    {isEditing ? (
                        <EditMyProfile
                            authItems={profile}
                            onCancel={() => setIsEditing(false)}
                            onSaved={handleSaved}
                        />
                    ) : (
                        <ProfileInfo profile={profile} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}