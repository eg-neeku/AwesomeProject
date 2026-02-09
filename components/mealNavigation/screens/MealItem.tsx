import { useNavigation } from "@react-navigation/native";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MealItemDetails from "./MealItemDetails";

type MealProp = {
    id: string, categoryIds?: string[]
    title?: string, affordability?: string,
    complexity?: string, imageUrl?: string,
    duration?: number, ingredients?: string[],
    steps?: string[],
    isGlutenFree?: boolean, isVegan?: boolean,
    isVegetarian?: boolean, isLactosFree?: boolean
}


const MealItem = ({ item }: { item: MealProp }) => {
    const navigation: any = useNavigation();

    const handlePress = () => {
        navigation.navigate('MealDetail', { mealId: item.id });
    }
    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => pressed ? [{ flex: 1, opacity: 0.25 }] : null}
                onPress={handlePress}
            >
                <MealItemDetails item={item} />
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
    }
});

export default MealItem;