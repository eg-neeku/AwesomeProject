import { ListRenderItemInfo, Pressable, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DUMMY_EXPENSES, ExpenseParamsProp, ExpenseProp, getFormattedDate } from "./expensecommon";
import Colors from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const renderExpenseItem = (itemData: ListRenderItemInfo<ExpenseProp>, navigation: any) => {
    const styles = StyleSheet.create({
        expenseitem: {
            padding: 12,
            marginVertical: 8,
            backgroundColor: Colors.primary500,
            flexDirection: "row",
            justifyContent: 'space-between',
            borderRadius: 6,
            elevation: 3,
            shadowColor: Colors.gray500,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 4
        },
        textBase: {
            color: Colors.primary50
        },
        description: {
            fontSize: 16,
            marginBottom: 4,
            fontWeight: "bold"
        },
        amountContainer: {
            paddingHorizontal: 12,
            paddingVertical: 4,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
            minWidth: 80
        },
        amount: {
            color: Colors.primary500,
            fontWeight: "bold"
        },
        pressed: {
            opacity: 0.75
        }
    });

    const expensePressHandler = () => {
        navigation.navigate("ManageExpense", {
            expenseId: itemData.item.id
        });
    }

    return (
        <Pressable style={({ pressed }) => pressed && styles.pressed} android_ripple={{ color: "#ccc" }}
            onPress={expensePressHandler}>
            <View style={styles.expenseitem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{itemData.item.description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(itemData.item.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{itemData.item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const ExpensesList = ({ expenses }: { expenses: ExpenseProp[] }) => {
    const navigation: any = useNavigation();

    return <FlatList
        data={expenses}
        renderItem={(itemData) => renderExpenseItem(itemData, navigation)}
        keyExtractor={(item) => item.id}
    />
}

const ExpensesSummary = ({ expenses, periodName }: ExpenseParamsProp) => {
    const styles = StyleSheet.create({
        container: {
            padding: 8,
            backgroundColor: Colors.primary50,
            borderRadius: 6,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        period: {
            fontSize: 12,
            color: Colors.primary400
        },
        sum: {
            fontSize: 16,
            fontWeight: 'bold',
            color: Colors.primary500
        }
    });
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const ExpensesOutput = ({ expenses = DUMMY_EXPENSES, periodName, fallbackText }: ExpenseParamsProp) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: Colors.primary700
        },
        infotext: {
            color: "#fff",
            textAlign: "center",
            fontSize: 16,
            marginTop: 32
        }
    });

    let screen = <Text style={styles.infotext}>{fallbackText}</Text>
    if (expenses.length > 0) screen = <ExpensesList expenses={expenses} />

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={periodName} fallbackText={fallbackText} />
            {screen}
        </View>
    )
}

export default ExpensesOutput;