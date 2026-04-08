import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { formStyles } from "./screenStyles";
import MyImagePicker from "../UI/MyImagePicker";
import Colors from "../../constants/colors";
import { RegisterDTOProps } from "../database/model";
import { AuthContext } from "../database/AuthContentProvider";
import MyIcon from "../UI/MyIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { saveProfileImage } from "../database/registerhttp";

export default function MyProfile() {
    const { authItems, setAuth } = useContext(AuthContext);
    const [profile, setProfile] = useState<RegisterDTOProps>(authItems);

    useEffect(() => {
        if (authItems.emailId) {
            setProfile(authItems);
        }
    }, [authItems]);

    const handleLogout = async () => {
        setAuth({ authItems: {} as RegisterDTOProps, token: "" });
    }

    const saveProfilePicHandler = async (val: string) => {
        try {
            await saveProfileImage(authItems.emailId, val);
            console.log(profile);
        } catch (error) {
            const errMsg = "Unable to add profile pic. Internet error";
            console.log(errMsg, error);
            Alert.alert("", errMsg, [{ text: "okay", style: "cancel" }]);
        }
        setProfile(prev => ({ ...prev, profilePic: val }));
    }

    return (
        <View style={formStyles.forms}>
            <View style={{ alignItems: "flex-end" }}>
                <MyIcon onPress={handleLogout} iconBgColor={Colors.normalRed}>
                    <Icon name="logout" size={20} color={Colors.dark} />
                </MyIcon>
            </View>
            <Text style={formStyles.titleHead}>{profile.firstName} {profile.lastName}</Text>
            <MyImagePicker onImagePick={saveProfilePicHandler}
                defaultImageURL={profile.profilePic ?? ""}
                shape="circle" myImgTitle="Edit DP" />
            <View style={styles.detailContainer}>
                <Text style={[formStyles.titleHead, { fontSize: 20 }]}>Profile Info</Text>
                <View style={styles.detailSection}>
                    <Text>Bio: </Text>
                    <Text>Hey there, I'm {profile.firstName} {profile.lastName}</Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>Email Address: </Text>
                    <Text>{profile.emailId}</Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>Gender: </Text>
                    <Text>{profile.gender === "M" ? "Male" : "Female"}</Text>
                </View>
                <View style={styles.detailSection}>
                    <Text>Phone number: </Text>
                    <Text>{profile.phoneNumber}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailContainer: {
        backgroundColor: Colors.lightGray,
        margin: 4,
        padding: 8
    },
    detailSection: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2
    }
});