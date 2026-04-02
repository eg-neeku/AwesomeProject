import { useContext } from "react";
import AfterLoginStack from "./AfterLoginStack";
import BeforeLoginStack from "./BeforeLoginStack";
import { AuthContext } from "../database/AuthContentProvider";

export default function StackScreenCRUD() {
    const authCtx = useContext(AuthContext);
    const isLogin = !!authCtx.token;
    return isLogin ? <AfterLoginStack /> : <BeforeLoginStack />
}