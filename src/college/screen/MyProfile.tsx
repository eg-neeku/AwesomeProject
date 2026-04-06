import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { formStyles } from "./screenStyles";
import MyImagePicker from "../UI/MyImagePicker";
import Colors from "../../constants/colors";
import { getLoginDetail, getLoginDetailDTO } from "../database/registerhttp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_EMAIL_ID, RegisterDTOProps } from "../database/model";

export default function MyProfile() {
    const [profile, setProfile] = useState<RegisterDTOProps>({ firstName: "", lastName: "", emailId: "", });
    useEffect(() => {
        async function getProfileByEmailId() {
            const emaidId = await AsyncStorage.getItem(ASYNC_STORAGE_EMAIL_ID);
            await getLoginDetail(emaidId ?? "");
        }
        getProfileByEmailId();
    }, []);

    useEffect(() => {
        async function getProfileByEmailId() {
            const emaidId = await AsyncStorage.getItem(ASYNC_STORAGE_EMAIL_ID);
            const profile = await getLoginDetailDTO(emaidId ?? "");
            if (profile) setProfile(profile);
        }
        getProfileByEmailId();
    }, []);

    return (
        <View style={formStyles.forms}>
            <Text style={formStyles.titleHead}>{profile.firstName} {profile.lastName}</Text>
            <MyImagePicker onImagePick={() => { }} shape="circle" myImgTitle="Edit DP" />
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