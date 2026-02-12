import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type ExpenseProp = {
    id: string,
    description: string,
    amount: number,
    date: Date
}

type ExpenseParamsProp = { expenses: ExpenseProp[], periodName: string }

const DUMMY_EXPENSES: ExpenseProp[] = [
    {
        id: 'e1',
        description: 'A pair of Shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2021-01-05')
    },
    {
        id: 'e3',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of Shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2021-01-05')
    },
    {
        id: 'e8',
        description: 'Some Bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e10',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
]

enum MONTHS { JAN = 1, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC };

export function getFormattedDate(date: Date) {
    console.log(``);
    return `${date.getDate()}-${date.getMonth() + 1}(${MONTHS[date.getMonth() + 1]})-${date.getFullYear()}`;
}

type IconButtonProps = { iconname: string, size: number, color: string, onPress?: () => void }

export const IconButton = ({ iconname, size, color, onPress }: IconButtonProps) => {
    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 24,
            padding: 6,
            marginHorizontal:8,
            marginVertical:2
        }
    });
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.75 }}>
            <View style={styles.buttonContainer}>
                <Icon name={iconname} size={size} color={color} />
            </View>
        </Pressable>
    )
}

export type { ExpenseParamsProp, ExpenseProp, }
export { DUMMY_EXPENSES }