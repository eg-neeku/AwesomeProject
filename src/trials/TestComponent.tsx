import { StyleSheet, View } from "react-native";
import { MyButton } from "../busApp/UI/MyButton";
import { Myflex } from "./Myflex";

const TestComponent = () => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center"
        }
    });
    return (
        <View style={styles.container}>
            <Myflex />
        </View >
    )
}

export default TestComponent;

{/*
<View style={styles.container}>
    <MyButton title="My Text" variant="primary" />
    <MyButton title="My Text" variant="secondary" />
    <MyButton title="My Text" variant="success" />
    <MyButton title="My Text" variant="danger" />
    <MyButton title="My Text" variant="warning" />
    <MyButton title="My Text" variant="dark" />
    <MyButton title="My Text" />
</View>
*/}