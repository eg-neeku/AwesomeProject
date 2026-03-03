import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, FlatList, Pressable } from "react-native";
import { BUS_DETAILS_KTU, BusProps } from "../common/common";
import InputWithSearch from "../UI/TextSearch";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function KTU() {
    const [searchBy, setSearchBy] = useState<BusProps>({ busName: "", timings: "" });
    const [busDetail, setBusDetail] = useState<BusProps[]>([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        async function details() {
            try {
                const data = await AsyncStorage.getItem("BUS_DETAILS_KTU");
                if (data !== null) {
                    const result = JSON.parse(data) as BusProps[];
                    setBusDetail(result);
                } else {
                    setBusDetail(BUS_DETAILS_KTU)
                }
            } catch (error) {
                setBusDetail(BUS_DETAILS_KTU)
            }
        }
        details();
    }, []);

    useEffect(() => {
        const busNow = searchBy.busName.toLocaleLowerCase();
        const timeNow = searchBy.timings;
        if (busNow === "" && timeNow === "") {
            setBusDetail(BUS_DETAILS_KTU);
            return;
        }
    }, [searchBy.busName]);

    const handleBusNamePress = () => {
        if (searchBy.busName.trim() === "") {
            return;
        }
        setBusDetail(busDetail.filter((bus) => bus.busName.toLocaleLowerCase().startsWith(searchBy.busName.toLocaleLowerCase())));
    }

    const handleTimingsPress = () => {
        // "/^\d{2}:\d{2}$/".match(searchBy.timings.trim()) for valid time
        let time1 = searchBy.timings;
        let time2 = time1.split(":");
        if (time1.trim() === "" || time2.length > 2 || isNaN(Number(time1))) {
            return;
        }
        if (time2.length == 2 && time2[0].length == 1) {
            time2[0] = "0" + time2[0];
            setBusDetail(busDetail.filter((bus) => bus.timings.startsWith(time2[0] + ":" + time2[1])));
        } else {
            time1 = time1.length === 1 ? "0" + time1 : time1;
            setBusDetail(busDetail.filter((bus) => bus.timings.startsWith(time1)));
        }
    }

    const BusItem = ({ busdata }: { busdata: BusProps }) => {
        return (
            <Pressable style={({ pressed }) => [styles.busItem, pressed && styles.pressed]}>
                <View style={styles.busItemDetails}>
                    <Text>{busdata.busName} - {busdata.timings}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText1}>(Please be 5min before the timings in the bus stand for safety)</Text>
                <Text style={styles.headerText2}>Bus Detail from K to Udupi</Text>
            </View>
            <View style={styles.main}>
                <InputWithSearch placeholder="Bus name:"
                    value={searchBy.busName}
                    onChangeText={(enteredBusName) => setSearchBy({ ...searchBy, busName: enteredBusName })}
                    onFocus={() => { setShow(false) }}
                    variant="secondary"
                    title="search"
                    isIcon
                    onPress={handleBusNamePress}
                    iconColor=""
                    iconSize={22}
                />
                <InputWithSearch placeholder="Bus timings(example: HR:MM[am/pm])"
                    value={searchBy.timings}
                    onChangeText={(enteredTimings) => setSearchBy({ ...searchBy, timings: enteredTimings })}
                    onFocus={() => { setShow(false) }}
                    variant="secondary"
                    maxLength={5}
                    isIcon
                    title="search"
                    onPress={handleTimingsPress}
                    iconColor=""
                    iconSize={22}
                />
                {show && <Text style={{ fontSize: 10, color: "#f00", textAlign: "center" }}>Please enter time in HH:MM format only(example: 07:29)</Text>}
                {busDetail.length !== 0 ? <FlatList
                    data={busDetail}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={(itemData) => { return <BusItem busdata={itemData.item} /> }}
                /> : <Text style={{ textAlign: "center" }}>No Bus found!</Text>}
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
    headerText1: {
        color: "#f00",
        textAlign: "center",
        fontSize: 12
    },
    headerText2: {
        textAlign: "center",
        fontSize: 18
    },
    main: {
        marginVertical: 15,
        padding: 10,
        flex: 1,
        gap: 5,
    },
    textinput: {
        flex: 1,
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