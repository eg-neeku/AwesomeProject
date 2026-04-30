import { Text } from "react-native";

export default function ErrorMessage({message, formStyles}:{message:string, formStyles:any}){
    return(
        <Text style={formStyles.fieldError}>{message}</Text>
    )
}