import { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Button, ScrollView } from "react-native";

type ItemType = { text: string };
type ItemProps = { item: ItemType, value: number }

const ItemList = () => {
    const [itemDetails, setItemsDetails] = useState<ItemType[]>([]);
    const [item, setItem] = useState<ItemType>({ text: "" });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5%',
            padding: '2%'
        },
        taskContainer: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            ...(itemDetails.length > 0 ? { marginTop: '20%' } : {}), // adding some styles based on condition
        },
        textInput: {
            width: '80%',
            margin: '2%',
            padding: '5%',
            borderColor: '#0000ff',
            borderWidth: 1,
            borderRadius: 10
        },
        buttonSet: {
            gap: 3,
            justifyContent: 'center'
        },
        lists: {
            // backgroundColor: '#cccccc',
            marginBottom: '5%',
        },
        items: {
            padding: '1%',
            marginTop: '5%',
        },
        itemsValue: {
            fontFamily: 'cursive',
            fontWeight: 'bold',
            fontSize: 20
        }
    });

    const Items = ({ item, value }: ItemProps) => {
        return (
            <Text style={styles.itemsValue}>
                {value.toString()}. {item.text}
                <Text style={{ backgroundColor: 'navy', color: 'white',marginLeft:'5%' }} onPress={() => handleEditItems(item.text)}>Edit</Text>
            </Text>
        )
    }

    const addItemsDetails = () => {
        if (item.text.trim().length === 0) return;
        /* Different ways to add the elements in the array */
        // setItemsDetails([...itemDetails, item]); //Method 1
        // setItemsDetails(prevItem => [...prevItem, item]); //Method 2
        setItemsDetails(itemDetails.concat(item));
        setItem({ text: "" });
    }

    const handleEditItems = (text: string) => {
        console.log(itemDetails.indexOf({ text }));
    }

    const clearItemDetails = () => {
        setItemsDetails([]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <TextInput
                    editable multiline
                    placeholder="Enter the task details"
                    value={item?.text ?? ""}
                    onChangeText={(text: string) => setItem(prev => ({ ...prev, text }))}
                    style={styles.textInput}
                />
                <View style={styles.buttonSet}>
                    <Button title='Add' onPress={addItemsDetails} />
                    <Button title='Clear' onPress={clearItemDetails} />
                </View>
            </View>
            <View style={styles.items}>
                {itemDetails.length == 0 ?
                    <Text style={styles.itemsValue}>No Items Available </Text>
                    :
                    <FlatList style={styles.lists}
                        data={itemDetails}
                        renderItem={({ item, index }) => { return <Items item={item} value={index + 1} /> }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
        </View>
    )
}



export default ItemList;