import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

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
    Dispatch<SetStateAction<"open" | "assigned" | "in_progress" | "resolved" | undefined>>
};

export default function MyDropDown({ focus, itemList, labelField, valueField, placeholder,
    searchPlaceholder, selectedValue }: MyDropDownProps) {
    const [value, setValue] = useState("");
    const [isFocus, setIsFocus] = useState(focus);
    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
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
                    color={isFocus ? 'blue' : 'black'}
                    name="Safety"
                    size={20}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    buildItemContainer: {
        padding: 16
    },
    assigningSection: {
        marginTop: 25,
        flex: 0.25
    }
});