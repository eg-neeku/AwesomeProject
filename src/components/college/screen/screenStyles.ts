import { useContext } from "react";
import { StyleSheet } from "react-native";
import { AppContext } from "../database/AppContextProvider";
import Colors from "../../../constants/colors";

export const logStyles = StyleSheet.create({
    container: {
        marginVertical: 15,
        marginHorizontal: 15,
        flex: 1,
    },
    searchInput: { flex: 1, fontSize: 16, color: "#222", backgroundColor: "#fff" },
    beforePressed: {
        backgroundColor: "#fff",
        padding: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8
    },
    afterPressed: {
        opacity: 0.35,
        backgroundColor: "#ff0"
    },
    itemOptions: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 2,
        justifyContent: "flex-end"
    }
});

export function useItemDetailStyles() {
    const deviceCtx = useContext(AppContext);

    return StyleSheet.create({
        itemContainer: {
            padding: 16,
            flex: 1,
            minWidth: deviceCtx.isPotrait ? deviceCtx.deviceHeight / 5 : deviceCtx.deviceWidth / 1.55
        },
        description: {
            color: "#000",
            flexWrap: "wrap"
        },
    });
}

export const formStyles = StyleSheet.create({
    forms: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        margin: 16,
        elevation: 3,              // Android shadow
        shadowColor: "#000",       // iOS shadow
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },
    titleHead: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    errortext: {
        color: Colors.error500,
        margin: 8,
        fontSize: 12,
        textAlign: "center"
    },
    input: {
        backgroundColor: "#ccc",
        padding: 8,
        borderRadius: 8,
        fontSize: 18,
    },
    inputMulitline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    errortextinput: {
        borderColor: Colors.error500,
        backgroundColor: Colors.error500,
        borderWidth: 1
    }
})