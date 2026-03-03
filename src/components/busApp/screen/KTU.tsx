import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, FlatList, Pressable, TextInput } from "react-native";
import { MyButton } from "../UI/MyButton";
import { BUS_DETAILS, BusProps } from "../common/common";
import TextSearch from "../UI/TextSearch";


export default function KTU() {
    const [searchBy, setSearchBy] = useState<BusProps>({ busName: "", timings: "" });
    const [busDetail, setBusDetail] = useState<BusProps[]>(BUS_DETAILS);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const busNow = searchBy.busName.toLocaleLowerCase();
        const timeNow = searchBy.timings;
        if (busNow === "" && timeNow === "") {
            setBusDetail(BUS_DETAILS);
            return;
        }
        const hasBus = BUS_DETAILS.some(bus => bus.busName.toLowerCase().startsWith(busNow));
        if (!hasBus) {
            setBusDetail(BUS_DETAILS);
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
        let time = searchBy.timings;
        if (time.trim() === "") {
            return;
        }
        time = time.length === 1 ? "0" + time : time;
        setBusDetail(busDetail.filter((bus) => bus.timings.startsWith(time)));
        console.log("What?");
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
                <Text style={styles.headerText2}>Bus Detail from Udupi to K</Text>
            </View>
            <View style={styles.main}>
                {/* <View style={styles.subMain}>
                    <TextInput style={styles.textinput}
                        placeholder="Search Bus name:"
                        value={searchBy.busName}
                        onChangeText={(enteredBusName) => setSearchBy({ ...searchBy, busName: enteredBusName })}
                        onFocus={() => { setShow(false) }}
                        />
                        <MyButton isIcon={true} variant="secondary" title="search" iconColor="" iconSize={24} onPress={handleBusNamePress} />
                        </View> */}
                <TextSearch placeholder="Search Bus name:"
                    value={searchBy.busName}
                    onChangeText={(enteredBusName) => setSearchBy({ ...searchBy, busName: enteredBusName })}
                    onFocus={() => { setShow(false) }}
                    variant="secondary"
                    title="search"
                    isIcon
                    onPress={handleBusNamePress}
                />
                {/* <View style={styles.subMain}>
                    <TextInput style={styles.textinput}
                    placeholder="Search Bus timings(Format: HR:MM[am/pm])"
                    value={searchBy.timings}
                    onChangeText={(enteredTimings) => setSearchBy({ ...searchBy, timings: enteredTimings })}
                    onFocus={() => { setShow(false) }}
                    maxLength={5}
                    />
                    <MyButton isIcon={true} variant="secondary" title="search" iconColor="" iconSize={24} onPress={handleTimingsPress} />
                    </View> */}
                <TextSearch placeholder="Search Bus timings(Format: HR:MM[am/pm])"
                    value={searchBy.timings}
                    onChangeText={(enteredTimings) => setSearchBy({ ...searchBy, timings: enteredTimings })}
                    onFocus={() => { setShow(false) }}
                    variant="secondary"
                    maxLength={5}
                    isIcon
                    title="search"
                    onPress={handleTimingsPress}
                />
                {show && <Text style={{ fontSize: 10, color: "#f00", textAlign: "center" }}>Please enter time in HH:MM format only(example: 07:29)</Text>}
                {busDetail.length !== 0 ? <FlatList
                    data={busDetail}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={(itemData) => { return <BusItem busdata={itemData.item} /> }}
                /> : <Text>No Bus found</Text>}
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
    subMain: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
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