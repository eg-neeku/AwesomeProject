import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable, Alert } from "react-native"
import PrimaryButton from "./PrimaryButton";
import Colors from "../../constants/colors";

const GameScreen = () => {
    const styles = StyleSheet.create({
        screen: {
            flex: 1,
            padding: '5%'
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: Colors.accent500,
            textAlign: 'center',
            borderWidth: 2,
            borderColor: Colors.accent500,
            padding: '4%'
        }
    });
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Opponents Guess</Text>
            <Text>GUESS</Text>
            <View>
                <Text>Higher or Lower</Text>
                <PrimaryButton>+</PrimaryButton>
                <PrimaryButton>-</PrimaryButton>
            </View>
            <View>LOG ROUNDS</View>
        </View>
    )
}

export default GameScreen;