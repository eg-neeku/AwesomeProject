import { useContext } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../dummyData";
import MealItem from "./MealItem";

export default function Favourites() {
    const favoriteMealsCtx = useContext(FavoritesContext);

    const favoriteMeals = MEALS.filter(meal => favoriteMealsCtx.ids.includes(meal.id));

    return (
        <View style={styles.rootContainer}>
            {favoriteMeals.length !== 0 ?
                <FlatList data={favoriteMeals}
                    renderItem={(itemdata) => { return <MealItem item={itemdata.item} /> }}
                    keyExtractor={(item) => item.id}
                /> :
                <Text style={styles.text}>You have no favourites meals left.</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#351401'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#e2b497"
    }
});