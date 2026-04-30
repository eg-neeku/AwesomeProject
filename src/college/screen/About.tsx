import { useContext } from "react";
import { Text, View } from "react-native";
import { AppContext } from "../database/AppContextProvider";
import Colors from "../../constants/colors";

export default function About() {
    const { isDarkMode } = useContext(AppContext);
    return (
        <View style={{ margin: 5, padding: 5 }}>
            <Text style={{ color: isDarkMode ? Colors.white : Colors.dark }}>Facilit FDVU is a program for managing, operating, maintaining and developing buildings and properties</Text>
        </View>
    )
}