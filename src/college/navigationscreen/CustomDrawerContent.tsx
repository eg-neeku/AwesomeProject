import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { AuthContentProps } from "../database/model";
import Colors from "../../constants/colors";

export default function CustomDrawerContent({ props, authItems }: { props: DrawerContentComponentProps, authItems: AuthContentProps["authItems"] }) {
    return (
        <DrawerContentScrollView {...props} style={styles.container}>
            <View style={styles.container}>
                <View style={styles.introUserBox}>
                    <Text style={styles.welcomeText}>Welcome,</Text><Text style={styles.introUserText}> {authItems.firstName} {authItems.lastName}</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
            <View style={styles.footer}>
                <Image
                    source={require("../../../assets/images/goal.png")}
                    style={styles.logo}
                />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
    introUserBox: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        paddingBottom: 10
    },
    welcomeText: {
        fontSize: 25,
        fontFamily: "cursive"
    },
    introUserText: {
        fontSize: 25,
        color: Colors.golden,
        fontFamily: "serif"
    },
    logo: {
        width: 200,
        height: 100,
        opacity: 0.9
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 45
    }
})