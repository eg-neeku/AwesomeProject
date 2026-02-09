import { Image, StyleSheet, Text, View } from "react-native"

type MealProp = {
    id: string, categoryIds?: string[]
    title?: string, affordability?: string,
    complexity?: string, imageUrl?: string,
    duration?: number, ingredients?: string[],
    steps?: string[],
    isGlutenFree?: boolean, isVegan?: boolean,
    isVegetarian?: boolean, isLactosFree?: boolean
}

const MealItemDetails = ({ item }: { item: MealProp }) => {
    return (
        <View style={{backgroundColor: '#fff'}}>
            <View>
                <Image style={styles.image} source={{ uri: item.imageUrl }} />
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.details}>
                <Text>{item.duration}min</Text>
                <Text>{item.complexity?.toLocaleUpperCase()}</Text>
                <Text>{item.affordability?.toUpperCase()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default MealItemDetails