import { useContext} from "react";
import AfterLoginStack from "./AfterLoginStack";
import BeforeLoginStack from "./BeforeLoginStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_APP_TOKEN } from "../database/model";

export default function StackScreenCRUD() {
    const { token } = useContext(AuthContext);

    const isLogin = !!token;
    return isLogin ? <AfterLoginStack /> : <BeforeLoginStack />
}