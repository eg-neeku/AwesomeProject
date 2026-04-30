import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, FlatList, Pressable, TextInput } from "react-native";
import { RegisterDTOProps } from "../../database/model";
import ErrorOverlay from "../../UI/ErrorOverlay";
import { InputWithSearch } from "../../UI/Input";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLogStyles } from "../screenStyles";
import Colors from "../../../constants/colors";
import UsersItems from "./UsersItem";
import { fetchUserData } from "../../database/registerhttp";

export default function UsersList() {
    const [refreshing, setRefreshing] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [demo, setDemo] = useState([] as RegisterDTOProps[]);
    const [democopy, setDemoCopy] = useState([] as RegisterDTOProps[]);
    const logStyles = useLogStyles();

    const activateRefreshUser = async () => {
        setRefreshing(true);
        try {
            const data = await fetchUserData();
            setDemo(data);
            setDemoCopy(data);
        } catch (error) {
            console.log("Error fetching user data: ", error);
        } finally {
            setRefreshing(false);
        }
    };

    // this is going to run whenever this screen becomes visible(useful to reflect the changes when moving from once screen to another or vice-versa)
    useFocusEffect(
        useCallback(() => {
            activateRefreshUser();
        }, [])
    );

    const handleUserSearch = () => {
        const query = userSearch.trim().toLowerCase();
        if (!query) {
            setDemo(democopy);
            return;
        }
        setDemo(
            democopy.filter((userItem) =>
                (userItem.firstName.toLocaleLowerCase().includes(query)) ||
                (userItem.lastName.toLocaleLowerCase().includes(query)) ||
                (userItem.emailId.toLocaleLowerCase().includes(query)) ||
                (`${userItem.phoneNumber}`.toLocaleLowerCase().includes(query)) ||
                (userItem.gender.toLocaleLowerCase().includes(query))
            )
        )
    };

    return (
        <View style={logStyles.container}>
            <InputWithSearch>
                <TextInput
                    placeholder="Search by resident info...."
                    placeholderTextColor={Colors.gray}
                    value={userSearch}
                    onChangeText={(text) => {
                        setUserSearch(text);
                        if (!text) setDemo(democopy);
                    }}
                    style={logStyles.searchInput}
                    returnKeyType="search"
                    onSubmitEditing={handleUserSearch} // <-- trigger on enter/search
                />
                {userSearch.length > 0 && (
                    <Pressable
                        onPress={() => {
                            setUserSearch("");
                            setDemo(democopy); // reset list
                        }}
                        style={({ pressed }) => [{ paddingHorizontal: 8 }, pressed && { opacity: 0.6 }]}
                    >
                        <MIcon name="close-circle" size={20} color={Colors.gray} />
                    </Pressable>
                )}
            </InputWithSearch>
            {demo.length > 0 ?
                <FlatList data={demo}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={(itemData) => { return <UsersItems item={itemData.item} /> }}
                    refreshing={refreshing}
                    onRefresh={activateRefreshUser}
                /> :
                <ErrorOverlay message={userSearch.trim() ? "No user data found" : "No user data found. Check your internet connection and try again later"} />
            }
        </View>
    )
}