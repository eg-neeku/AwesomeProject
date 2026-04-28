import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/colors";

type ListProps = {
    label: string,
    value: string
};

type MyDropDownProps = {
    focus: boolean,
    itemList: ListProps[],
    labelField: string,
    valueField: string,
    placeholder: string,
    searchPlaceholder: string,
    selectedValue: Dispatch<SetStateAction<string>> |
    Dispatch<SetStateAction<"open" | "assigned" | "in_progress" | "resolved" | undefined>>,
    isDarkMode: boolean
};

export default function MyDropDown({ focus, itemList, labelField, valueField, placeholder,
    searchPlaceholder, selectedValue, isDarkMode }: MyDropDownProps) {
    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(focus);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDarkMode ? Colors.dark : Colors.white,
            padding: 16,
        },
        dropdown: {
            height: 50,
            borderColor: isDarkMode ? Colors.aqua : Colors.gray,
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginVertical: 8
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: isDarkMode ? Colors.danger : Colors.white,
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
            color: isDarkMode ? Colors.white : Colors.dark,
        },
        selectedTextStyle: {
            fontSize: 16,
            color: isDarkMode ? Colors.white : Colors.dark,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
            color: isDarkMode ? Colors.white : Colors.dark,
        },
        buildItemContainer: {
            padding: 16
        },
        assigningSection: {
            marginTop: 25,
            flex: 0.25
        }
    });

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: Colors.aqua }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={{ backgroundColor: isDarkMode ? Colors.dark : Colors.white }}
            itemContainerStyle={{ backgroundColor: isDarkMode ? Colors.dark : Colors.white }}
            itemTextStyle={{ color: isDarkMode ? Colors.white : Colors.dark }}
            activeColor={isDarkMode ? Colors.gray500 : Colors.lightGray}
            searchPlaceholderTextColor={isDarkMode ? Colors.white : Colors.gray}
            data={itemList}
            search
            maxHeight={300}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                selectedValue(item.value);
                setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={isFocus ? Colors.aqua : isDarkMode ? Colors.aqua : Colors.dark}
                    name="Safety"
                    size={20}
                />
            )}
        />
    )
}