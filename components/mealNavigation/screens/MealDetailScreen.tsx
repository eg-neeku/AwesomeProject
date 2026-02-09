import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { MEALS } from "../dummyData";
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

const MealDetailScreen = ({ route }: any) => {
    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((mealItem) => mealItem.id === mealId);
    return (
        <ScrollView style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <MealItemDetails item={selectedMeal as MealProp} />
            <View style={styles.subContainer}>
                <Text style={styles.subtitle}>Ingredients: </Text>
                {selectedMeal?.ingredients.map((ingredient: any, index: number) => (
                    <Text style={styles.listItem} key={ingredient}>{index + 1}. {ingredient}</Text>
                ))}
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.subtitle}>Steps:</Text>
                {selectedMeal?.steps.map((step: any, index: number) => (
                    <Text style={styles.listItem} key={step}>{index + 1}. {step}</Text>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        borderBottomColor: "#e2b497",
        borderBottomWidth: 1,
        margin: 4,
        padding: 6,
    },
    subContainer: {
        marginHorizontal: 24,
        marginVertical: 4,
    },
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: "#e2b497",
    }
});

export default MealDetailScreen;