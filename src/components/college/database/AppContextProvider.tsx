import React, { createContext } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";

type AppContextProps = {
    isLandScape: boolean,
    isPotrait: boolean,
    deviceWidth: number,
    deviceHeight: number,
    isDarkMode: boolean
}

export const AppContext = createContext<AppContextProps>({
    isLandScape: false,
    isPotrait: true,
    deviceWidth: 0,
    deviceHeight: 0,
    isDarkMode: false
});

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    const { width, height } = useWindowDimensions();
    const isDarkMode = useColorScheme() === 'dark';

    const value: AppContextProps = {
        isLandScape: width > height,
        isPotrait: width < height,
        deviceWidth: width,
        deviceHeight: height,
        isDarkMode: isDarkMode
    }

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )
}