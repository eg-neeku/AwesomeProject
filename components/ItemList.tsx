import { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Button, ScrollView, Pressable } from "react-native";

type ItemType = { id: string, text: string };
type ItemProps = { item: ItemType, value: number }

const ItemList = () => {
    const [itemDetails, setItemDetails] = useState<ItemType[]>([]);
    const [item, setItem] = useState<ItemType>({ id: "", text: "" });

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
        },
        pressed:{
            opacity:1
        }
    });

    const Items = ({ item, value }: ItemProps) => {
        return (
            <View style={styles.items}>
                <Text style={styles.itemsValue}>{value.toString()}. {item.text}</Text>
                <Pressable android_ripple={{color:'#dddddd'}} style={({pressed})=> pressed && styles.pressed} onPress={() => handleEditItems(item.id, item.text)}>Edit</Pressable>
                <Pressable android_ripple={{color:'#dddddd'}} style={({pressed})=> pressed && styles.pressed}  onPress={() => handleDeleteItems(item.id)}>Delete</Pressable>
            </View>
        )
    }

    const addItemsDetails = () => {
        if (item.text.trim().length === 0) return;
        /* Different ways to add the elements in the array */
        // setItemDetails([...itemDetails, item]); //Method 1
        setItemDetails(prevItem => [...prevItem, { id: Math.random().toString().substring(0, 12), text: item.text }]); //Method 2
        // setItemDetails(itemDetails.concat(item)); //Method 3
        setItem({ id: "", text: "" });
    }

    const handleEditItems = (id: string, newText: string) => {
        setItemDetails(prev =>
            prev.map(it =>
                it.id === id ? { ...it, text: newText } : it
            )
        );
    }

    const handleDeleteItems = (id: string) => {
        setItemDetails(itemDetails.filter(item => item.id !== id));
    }

    const clearItemDetails = () => {
        setItemDetails([]);
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
                        renderItem={(itemData) => { return <Items item={itemData.item} value={itemData.index + 1} /> }}
                        keyExtractor={item => item.id}
                    />
                }
            </View>
        </View>
    )
}



export default ItemList;