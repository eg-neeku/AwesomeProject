import React, { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Modal,
  Alert,
  Image,
} from 'react-native';

type ItemType = { id: string; text: string };
type ItemProps = { item: ItemType; value: number };

const ItemList = () => {
  const [itemDetails, setItemDetails] = useState<ItemType[]>([]);
  const [item, setItem] = useState<ItemType>({ id: '', text: '' });

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [editingText, setEditingText] = useState('');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: '5%',
      padding: '2%',
    },
    taskContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000000',
      ...(itemDetails.length > 0 ? { marginTop: '20%', paddingTop: '20%' } : {}),
    },
    textInput: {
      width: '80%',
      margin: '2%',
      padding: '5%',
      borderColor: '#0000ff',
      borderWidth: 1,
      borderRadius: 10, // ✅ numbers only
      textAlignVertical: 'top',
    },
    buttonSet: {
      gap: 6,
      justifyContent: 'center',
    },
    lists: {
      marginBottom: '5%',
    },
    items: {
      padding: 16,
      marginTop: '5%',
      flex: 1,
      width: '100%',
    },
    itemsValue: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
      fontSize: 18,
    },
    pressed: {
      opacity: 0.5,
      borderWidth: 1,
      borderColor: 'navy',
    },
    centeredView: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)', // dim background for modal
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalView: {
      width: '100%',
      maxWidth: 480,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      width: '100%',
      marginBottom: 8,
      fontWeight: '600',
      fontSize: 16,
    },
    modalInput: {
      width: '100%',
      minHeight: 100,
      borderColor: '#999',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      textAlignVertical: 'top',
    },
    modalButtonsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
      alignSelf: 'flex-end',
    },
    imageStyle: {
      width: '30%',
      height: 100,
      resizeMode: 'contain',
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 8,
      paddingRight: 8,
    },
    actionText: {
      color: '#1f6feb',
      fontWeight: '600',
    },
    actionSeparator: {
      color: '#aaa',
    },
  });

  // ---- CRUD ----
  const addItemsDetails = () => {
    if (item.text.trim().length === 0) return;
    setItemDetails(prev => [
      ...prev,
      { id: Math.random().toString(36).slice(2, 10), text: item.text.trim() },
    ]);
    setItem({ id: '', text: '' });
  };

  const handleSaveEdit = () => {
    if (!selectedItem) return;
    const nextText = editingText.trim();
    if (nextText.length === 0) {
      Alert.alert('Validation', 'Text cannot be empty.');
      return;
    }
    setItemDetails(prev =>
      prev.map(it => (it.id === selectedItem.id ? { ...it, text: nextText } : it)),
    );
    closeModal();
  };

  const handleDeleteItems = (id: string) => {
    setItemDetails(prev => prev.filter(it => it.id !== id));
  };

  const clearItemDetails = () => {
    setItemDetails([]);
  };

  // ---- Modal helpers ----
  const openModalForItem = (it: ItemType) => {
    setSelectedItem(it);
    setEditingText(it.text);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
    setEditingText('');
  };

  // ---- Subcomponents ----
  const Items = ({ item, value }: ItemProps) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.itemsValue}>
          {value}. {item.text}
        </Text>

        <Pressable
          android_ripple={{ color: '#00000011' }}
          style={({ pressed }) => (pressed ? styles.pressed : undefined)}
          onPress={() => openModalForItem(item)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </Pressable>

        <Text style={styles.actionSeparator}>|</Text>

        <Pressable
          android_ripple={{ color: '#00000011' }}
          style={({ pressed }) => (pressed ? styles.pressed : undefined)}
          onPress={() => handleDeleteItems(item.id)}
        >
          <Text style={[styles.actionText, { color: '#d12' }]}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.imageStyle} />

      <View style={styles.taskContainer}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          scrollEnabled
          placeholder="Enter the task details"
          value={item.text}
          onChangeText={(text: string) => setItem(prev => ({ ...prev, text }))}
          style={styles.textInput}
        />

        <View style={styles.buttonSet}>
          <Button title="Add" onPress={addItemsDetails} />
          <Button title="Clear" onPress={clearItemDetails} />
        </View>
      </View>

      <View style={styles.items}>
        {itemDetails.length === 0 ? (
          <Text style={styles.itemsValue}>No Items Available</Text>
        ) : (
          <FlatList
            style={styles.lists}
            data={itemDetails}
            renderItem={(itemData) => (
              <Items item={itemData.item} value={itemData.index + 1} />
            )}
            keyExtractor={(it) => it.id}
          />
        )}
      </View>

      {/* ---------- Modal at root (must always be rendered) ---------- */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          // Android back button
          closeModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Edit item</Text>
            <TextInput
              value={editingText}
              onChangeText={setEditingText}
              style={styles.modalInput}
              multiline
              autoFocus
              placeholder="Update the text"
            />
            <View style={styles.modalButtonsRow}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Save" onPress={handleSaveEdit} />
            </View>
          </View>
        </View>
      </Modal>
      {/* ------------------------------------------------------------- */}
    </View>
  );
};

export default ItemList;