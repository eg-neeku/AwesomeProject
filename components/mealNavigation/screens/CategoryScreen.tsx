import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../dummyData.js";

type CategoryItemsProps = { id: string; foodType: string; color: string; }

const CategoryItemTitle = ({ items, navigation }: { items: CategoryItemsProps, navigation: any}) => {
    const styles = StyleSheet.create({
        gridItem: {
            flex: 1,
            margin: 16,
            height: 150,
            borderRadius: 8,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            overflow: Platform.OS === "android" ? 'hidden' : 'visible',
        },
        buttonItem: {
            flex: 1
        },
        innerGridItem: {
            flex: 1,
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            fontWeight: 'bold',
            fontSize: 18
        }
    });

    const pressHandler = () => {
        navigation.navigate('MealsOverview', {
            categoryId: items.id
        })
    }

    return (
        <View style={[styles.gridItem, { backgroundColor: items.color }]}>
            <Pressable android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => pressed ? [styles.buttonItem, { opacity: 0.25 }] : styles.buttonItem}
                onPress={pressHandler}
            >
                <View style={styles.innerGridItem}>
                    <Text style={styles.title}>{items.foodType}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const CategoryScreen = ({ navigation }: any) => {
    return (
        <>
            <FlatList data={CATEGORIES}
                renderItem={(data) => { return <CategoryItemTitle items={data.item} navigation={navigation} /> }}
                keyExtractor={(data) => data.id}
                numColumns={2}
            />
        </>
    )
}

export default CategoryScreen;