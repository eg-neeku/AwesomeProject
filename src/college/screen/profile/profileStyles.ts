import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

export const profileStyles = StyleSheet.create({
    detailContainer: {
        backgroundColor: Colors.lightGray,
        margin: 4,
        padding: 8
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailSection: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 2
    }
});