import React, { createContext, useState } from "react";

type FavoritesContextProp = {
    ids: string[],
    addFavorite: (id: string) => void,
    removeFavorite: (id: string) => void,
}

const FavoritesContext = createContext<FavoritesContextProp>({
    ids: [],
    addFavorite: (id) => { },
    removeFavorite: (id) => { },
});

const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

    function addFavorite(id: string) {
        setFavoriteMealIds(currentFavIds => [...currentFavIds, id]);
    }

    function removeFavorite(id: string) {
        setFavoriteMealIds(currentFavIds => currentFavIds.filter((mealId) => mealId !== id));
    }

    const values: FavoritesContextProp = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }

    return <FavoritesContext.Provider value={values}>{children}</FavoritesContext.Provider>
}

export { FavoritesContext, FavoritesContextProvider }