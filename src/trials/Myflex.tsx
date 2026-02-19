import { View, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/colors";

const BOX_BASE = {
    width: 100,
    height: 100,
    margin: 4,
}

export const Myflex = () => {
    const styles = StyleSheet.create({
        container: {
            padding: 100,
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",// (345, 345)=> 690 => 730 + 30
        },
        box1: {
            backgroundColor: Colors.accent500,
            ...BOX_BASE
        },
        box2: {
            backgroundColor: Colors.error500,
            ...BOX_BASE
        },
        box3: {
            backgroundColor: Colors.primary100,
            ...BOX_BASE
        },
        box4: {
            backgroundColor: Colors.primary600,
            ...BOX_BASE
        },
        box5: {
            backgroundColor: Colors.primary800,
            ...BOX_BASE
        },
        pressed: {
            opacity: 0.25,
            flex:1
        }
    });
    return (
        <View style={styles.container} >
            <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.box1] : styles.box1}></Pressable>
            <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.box2] : styles.box2}></Pressable>
            <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.box3] : styles.box3}></Pressable>
            <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.box4] : styles.box4}></Pressable>
            <Pressable style={({ pressed }) => pressed ? [styles.pressed, styles.box5] : styles.box5}></Pressable>
        </View>
    )
}