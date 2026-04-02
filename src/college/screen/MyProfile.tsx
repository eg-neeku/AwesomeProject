import { useContext } from "react";
import { AuthContext } from "../database/AuthContentProvider";
import { Text, View } from "react-native";

export default function MyProfile() {
    const authCtx = useContext(AuthContext);
    return (
        <View>
            <Text>{`Welcome ${authCtx.firstname} ${authCtx.lastname}`}</Text>
            <Text>Here is your profile detail:</Text>
            <Text>First Name: {authCtx.firstname}</Text>
            <Text>Last Name: {authCtx.lastname}</Text>
            <Text>Email Address: {authCtx.emailId}</Text>
        </View>
    )
}