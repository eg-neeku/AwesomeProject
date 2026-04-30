import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { useContext } from "react";
import { AppContext } from "../../database/AppContextProvider";

export function useProfileStyles() {
    const { isDarkMode } = useContext(AppContext);
    return StyleSheet.create({
        detailContainer: {
            backgroundColor: isDarkMode ? Colors.dark : Colors.lightGray,
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
        },
        textMessage: { color: isDarkMode ? Colors.white : Colors.dark }
    });
}