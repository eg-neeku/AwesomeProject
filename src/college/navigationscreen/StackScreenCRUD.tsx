import { useContext} from "react";
import AfterLoginStack from "./AfterLoginStack";
import BeforeLoginStack from "./BeforeLoginStack";
import { AuthContext } from "../database/AuthContentProvider";

export default function StackScreenCRUD() {
    const { token } = useContext(AuthContext);

    const isLogin = !!token;
    return isLogin ? <AfterLoginStack /> : <BeforeLoginStack />
}