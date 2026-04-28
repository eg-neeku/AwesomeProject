import { useContext } from "react";
import { StyleSheet } from "react-native";
import { AppContext } from "../database/AppContextProvider";
import Colors from "../../constants/colors";

export function useLogStyles() {
    const { isDarkMode } = useContext(AppContext);
    return StyleSheet.create({
        container: {
            marginVertical: 15,
            marginHorizontal: 15,
            flex: 1,
        },
        searchInput: { flex: 1, fontSize: 16, color: "#222", backgroundColor: Colors.white },
        beforePressed: {
            backgroundColor: isDarkMode ? Colors.dark : Colors.white,
            padding: 5,
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 8,
            ...(isDarkMode && {
                borderWidth: 1,
                borderColor: Colors.aqua
            })
        },
        afterPressed: {
            opacity: 0.35,
            backgroundColor: isDarkMode ? Colors.gray : Colors.yellow
        },
        itemOptions: {
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 2,
            justifyContent: "flex-end"
        }
    });
}

export function useItemDetailStyles() {
    const deviceCtx = useContext(AppContext);

    return StyleSheet.create({
        itemContainer: {
            padding: 8,
            flex: 1,
            margin: 8,
            minWidth: deviceCtx.isPotrait ? deviceCtx.deviceHeight / 5 : deviceCtx.deviceWidth / 1.55
        },
        description: {
            color: deviceCtx.isDarkMode ? Colors.white : Colors.dark,
            flexWrap: "wrap"
        },
    });
}

export function useFormStyles() {
    const { isDarkMode } = useContext(AppContext);

    return StyleSheet.create({
        forms: {
            flex: 1,
            margin: 16,
            padding: 16,
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: isDarkMode ? Colors.mediumDark : Colors.white,
            elevation: 3,              // Android shadow
            shadowColor: isDarkMode ? Colors.dark : Colors.gray,       // iOS shadow
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
        },
        titleHead: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 25,
            textAlign: "center",
            color: isDarkMode ? Colors.aqua : Colors.dark
        },
        textMessage: {
            marginTop: 15,
            color: isDarkMode ? Colors.white : Colors.dark
        },
        buttonsContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5
        },
        errortext: {
            color: Colors.lightRed,
            margin: 8,
            fontSize: 12,
            textAlign: "center"
        },
        input: {
            backgroundColor: Colors.gray,
            padding: 8,
            borderRadius: 8,
            fontSize: 18,
        },
        inputMulitline: {
            minHeight: 100,
            textAlignVertical: "top"
        },
        errortextinput: {
            borderColor: Colors.lightRed,
            backgroundColor: Colors.lightRed,
            borderWidth: 1
        },
        fieldError: {
            color: Colors.lightRed,
            fontSize: 12,
            marginTop: 3,
            marginHorizontal: 4,
            textAlign: "center"
        },
        simpleText: {
            marginVertical: 5,
            paddingVertical: 5,
            color: isDarkMode ? Colors.white : Colors.dark
        }
    });
}