import { Text, View, StyleSheet, FlatList, ListRenderItemInfo, Pressable, Image } from "react-native";
import { CATEGORIES, MEALS } from "../dummyData";
import Meal from "../models/meal";
import MealItem from "./MealItem";
import { useEffect } from "react";

const renderMealsItem = (itemData: ListRenderItemInfo<Meal>) => {
    return <MealItem item={itemData.item} />
}

const MealsOverviewScreen = ({ route, navigation }: any) => {
    const categoryId = route.params.categoryId;
    useEffect(() => {
        const categoryTitle = CATEGORIES.find(mealItem => mealItem.id === categoryId)?.foodType;
        navigation.setOptions({
            title: categoryTitle
        });
    }, [categoryId, navigation]);

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(categoryId) >= 0;
    })

    return (
        <View style={styles.container}>
            <FlatList data={displayedMeals}
                keyExtractor={item => item.id}
                renderItem={renderMealsItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
})

export default MealsOverviewScreen;