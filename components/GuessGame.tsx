import { Text, View, StyleSheet, TextInput, Pressable } from "react-native"

const PrimaryButton = ({ children }: any) => {
    const styles = StyleSheet.create({
        buttonOuterContainer: {
            borderRadius: 28,
            margin: '2%',
            overflow: 'hidden',
        },
        buttonInnerContainer: {
            backgroundColor: '#72063c',
            paddingVertical: '6%',
            paddingHorizontal: '12%',
            elevation: 2
        },
        buttonText: {
            color: 'white',
            textAlign: 'center'
        },
        pressed: {
            opacity: 0.75
        }
    });

    const pressHandler = () => {
        // console.log("Pressed");
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} onPress={pressHandler} android_ripple={{ color: '#98e836' }}>
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

const GameStartScreen = () => {
    const styles = StyleSheet.create({
        inputContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%',
            marginHorizontal: '10%',
            padding: '6%',
            backgroundColor: '#4e0328',
            borderRadius: '6%',
            elevation: 8, //box shadow in css(only on android)
            shadowColor: '#949292',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.75,
            shadowRadius: 5
        },
        welcomeText: {
            fontSize: 32,
            textAlign: 'center',
            fontFamily: 'cursive',
            fontWeight: 'bold',
            color: '#ddb52f'
        },
        numberInput: {
            height: '35%',
            width: '35%',
            textAlign: 'center',
            fontSize: 32,
            borderBottomColor: '#ddb52f',
            borderBottomWidth: 2,
            color: '#ddb52f',
            marginVertical: '2%',
            fontWeight: 'bold'
        },
        buttonContainer: {
            flexDirection: "row",
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonSubContainer: {
            flex: 1
        }
    });
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.welcomeText}>Welcome to Number Guessing</Text>
            <TextInput style={styles.numberInput}
                maxLength={2} keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <View style={styles.buttonSubContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonSubContainer}>
                    <PrimaryButton>Confirm</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

const GameOver = () => {

}

const GuessGame = () => {
    const styles = StyleSheet.create({
    });
    return (
        <View>
            <GameStartScreen />
        </View>
    )
}

export default GuessGame;