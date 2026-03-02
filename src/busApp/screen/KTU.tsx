import { useState } from "react";
import { View, Text, StyleSheet, Platform, FlatList, Pressable, TextInput } from "react-native";

type BusProps = {
    busName: string,
    timings: string
}

const BUS_DETAILS: BusProps[] = [
    {
        busName: "LULU",
        timings: "7:05am"
    },
    {
        busName: "Kadiyali",
        timings: "7:40am"
    },
    {
        busName: "Sri Ganesh",
        timings: "8:20am"
    },
    {
        busName: "Sathyanath",
        timings: "8:25am"
    }
]

export default function KTU() {
    const [timing, setTiming] = useState("");
    const [busDetail, setBusDetails] = useState<BusProps[]>([]);

    const handlePress = () => { }

    const BusItem = ({ busdata }: { busdata: BusProps }) => {
        return (
            <Pressable style={({ pressed }) => [styles.busItem, pressed && styles.pressed]}
                onPress={handlePress} >
                <View style={styles.busItemDetails}>
                    <Text>{busdata.busName} - {busdata.timings}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>(Please be 5min before the timings in the bus stand for safety) Bus Detail from Udupi to K</Text>
            </View>
            <View style={styles.main}>
                <TextInput style={styles.textinput} placeholder="Enter the bus timings"
                    value={timing} onChangeText={setTiming} />
                <FlatList
                    data={busDetail}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={(itemData) => { return <BusItem busdata={itemData.item} /> }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    header: {
        marginTop: 15,
        backgroundColor: "#ff0",
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    headerText: {
        textAlign: "center",
        fontSize: 15
    },
    main: {
        marginVertical: 15,
        padding: 10,
        flex: 1
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 8,
        height: 50,
        elevation: 4,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
    busItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "#ccc",
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
    busItemDetails: {
        padding: 10
    },
    pressed: {
        opacity: 0.35
    }
});