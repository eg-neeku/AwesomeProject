import { useContext } from "react";
import { AuthContext } from "../../database/AuthContentProvider";
import { BuildingDetailsProp, doNothing, GOTO_S_COMPLAINT_FORM_PAGE, GOTO_S_MANAGE_BUILDING_PAGE } from "../../database/model";
import { Pressable, View } from "react-native";
import { logStyles } from "../screenStyles";
import BuildingItemDetails from "./BuildingItemDetails";
import MyIcon from "../../UI/MyIcon";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../../../constants/colors";

export default function BuildingItem({ item, navigation }: { item: BuildingDetailsProp, navigation: any }) {
    const { authItems } = useContext(AuthContext);
    const handleBuildingPress = () => {
        navigation.navigate(GOTO_S_MANAGE_BUILDING_PAGE, {
            buildingId: item.id
        });
    };

    const handleComplaintPress = () => {
        navigation.navigate(GOTO_S_COMPLAINT_FORM_PAGE, {
            buildingId: item.id,
            buildingName: item.name
        });
    };

    return (
        <Pressable onPress={authItems.role !== "techni" ? handleBuildingPress : doNothing}
            style={({ pressed }) => [logStyles.beforePressed, pressed && logStyles.afterPressed]}>
            <BuildingItemDetails item={item} />
            {authItems.role !== "techni" && <View style={logStyles.itemOptions}>
                <MyIcon onPress={handleComplaintPress} iconBgColor={Colors.lightRed} paddingInsideIcon={6}>
                    <Icon name="pencil-sharp" size={20} color={Colors.dark} />
                </MyIcon>
            </View>
            }
        </Pressable>
    )
}