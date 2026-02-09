import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

type MealProp = {
    id?: string, categoryIds?: string[]
    title?: string, affordability?: string,
    complexity?: string, imageUrl?: string,
    duration?: number, ingredients?: string[],
    steps?: string[],
    isGlutenFree?: boolean, isVegan?: boolean,
    isVegetarian?: boolean, isLactosFree?: boolean
}

const MealItem = ({ item }: { item: MealProp }) => {
    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => pressed ? [{ flex: 1, opacity: 0.25 }] : null}
            >
                <View>
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />
                    <Text style={styles.title}>{item.title}</Text>
                </View>
                <View style={styles.details}>
                    <Text>{item.duration}min</Text>
                    <Text>{item.complexity?.toLocaleUpperCase()}</Text>
                    <Text>{item.affordability?.toUpperCase()}</Text>
                </View>
            </Pressable>
        </View >
    )
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }
});

export default MealItem;