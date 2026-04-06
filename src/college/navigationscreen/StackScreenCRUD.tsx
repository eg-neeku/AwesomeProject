import { useEffect, useState } from "react";
import AfterLoginStack from "./AfterLoginStack";
import BeforeLoginStack from "./BeforeLoginStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_APP_TOKEN } from "../database/model";

export default function StackScreenCRUD() {
    const [token, setToken] = useState<string | null>("");
    useEffect(() => {
        async function getAppToken() {
            const temp = await AsyncStorage.getItem(ASYNC_STORAGE_APP_TOKEN);
            setToken(temp);
        }
        getAppToken();
    }, [token]);
    
    const isLogin = !!token;
    return isLogin ? <AfterLoginStack /> : <BeforeLoginStack />
}