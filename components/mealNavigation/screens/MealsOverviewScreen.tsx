import { Text, View, StyleSheet, FlatList, ListRenderItemInfo, Pressable, Image } from "react-native";
import { MEALS } from "../dummyData";
import Meal from "../models/meal";
import MealItem from "./MealItem";

const renderMealsItem = (itemData: ListRenderItemInfo<Meal>) => {
    return <MealItem item={itemData.item} />
}

const MealsOverviewScreen = ({ route }: any) => {
    const mealsCategoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(mealsCategoryId) >= 0;
    })

    return (
        <View style={styles.container}>
            <Text>Meals OverView Screen - {mealsCategoryId}</Text>
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