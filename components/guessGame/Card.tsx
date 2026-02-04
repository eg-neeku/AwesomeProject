import { StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";
import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
    const styles = StyleSheet.create({
        inputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            marginHorizontal: '10%',
            padding: '6%',
            backgroundColor: Colors.primary600,
            borderRadius: '6%',
            elevation: 8, //box shadow in css(only on android)
            shadowColor: '#949292',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.75,
            shadowRadius: 5,
            flex:1
        },
    });

    return (
        <View style={styles.inputContainer}>{children}</View>
    )
}

export default Card;