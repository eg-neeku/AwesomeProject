import AfterLoginStack from "./AfterLoginStack";
import BeforeLoginStack from "./BeforeLoginStack";

export default function StackScreenCRUD() {
    const isLogin = false;
    return isLogin ? <AfterLoginStack /> : <BeforeLoginStack />
}