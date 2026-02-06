import { useState } from "react";
import { FlatList, Text, View, StyleSheet, TextInput, Button, Pressable, Modal, Alert, Image } from "react-native";

type ItemType = { id: string, text: string };
type ItemProps = { item: ItemType, value: number }

const ItemList = () => {
    const [itemDetails, setItemDetails] = useState<ItemType[]>([]);
    const [item, setItem] = useState<ItemType>({ id: "", text: "" });
    const [modalVisible, setModalVisible] = useState(false);

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
            ...(itemDetails.length > 0 ? { marginTop: '20%', paddingTop: '20%' } : {}), // adding some styles based on condition
        },
        textInput: {
            width: '80%',
            margin: '2%',
            padding: '5%',
            borderColor: '#0000ff',
            borderWidth: 1,
            borderRadius: 10,
            textAlignVertical: 'top'
        },
        buttonSet: {
            gap: 3,
            justifyContent: 'center'
        },
        lists: {
            // backgroundColor: '#cccccc',
            marginBottom: '5%',
        },
        //for flatitems design
        items: {
            padding: 16,
            marginTop: '5%',
            flex:1
        },
        itemsValue: {
            fontFamily: 'cursive',
            fontWeight: 'bold',
            fontSize: 20
        },
        pressed: {
            opacity: 0.5,
            borderWidth: 1,
            borderColor: 'navy',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalView: {
            margin: '5%',
            backgroundColor: 'white',
            borderRadius: '5%',
            padding: '15%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0, height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        imageStyle:{
            width:'30%',
            height:100
        }
    });
    
    // const EditItem: React.FC<{ item: ItemType }> = ({ item }) => { // Method1: this can be the way to send the type fixing
    const EditItem = (props: { item: ItemType }) => {
        const { item } = props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ minHeight: 120 }}>
                            <TextInput
                                editable multiline
                                value={item.text}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.buttonSet}>
                            <Button title="Update" onPress={() => handleEditItems(item.id, item.text)} />
                            <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const Items = ({ item, value }: ItemProps) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: '6%' }}>
                <Text style={styles.itemsValue}>{value.toString()}. {item.text}</Text>
                <Pressable android_ripple={{ color: '#000000' }}
                    style={({ pressed }) => pressed && styles.pressed}
                    onPress={() => setModalVisible(!modalVisible)}
                ><Text>Edit</Text>
                </Pressable>
                <Pressable android_ripple={{ color: '#dddddd' }} style={({ pressed }) => pressed && styles.pressed} onPress={() => handleDeleteItems(item.id)}><Text>Delete</Text></Pressable>
                {/* <EditItem item={item} /> Here I need to extract this peice of element  */}
            </View>
        )
    }

    const addItemsDetails = () => {
        if (item.text.trim().length === 0) return;
        /* Different ways to add the elements in the array */
        // setItemDetails([...itemDetails, item]); //Method 1
        setItemDetails(prevItem => [...prevItem, { id: Math.random().toString().substring(0, 12), text: item.text.trim() }]); //Method 2
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
            <Image 
                source={require('../assets/images/logo.png')} 
                style={styles.imageStyle}
            />
            <View style={styles.taskContainer}>
                <TextInput
                    editable multiline
                    numberOfLines={4}
                    // maxLength={40}
                    scrollEnabled={true}
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