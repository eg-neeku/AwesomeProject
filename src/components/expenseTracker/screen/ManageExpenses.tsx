import React, { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ExpensePropDTO, IconButton } from "./expensecommon";
import Colors from "../../../constants/colors";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "./ExpenseForm";

const ManageExpenses = ({ route, navigation }: any) => {
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId; //here routing means useful for updating
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense=> expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Response" : "Add Expense"
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = () => {
        // navigation.navigate("ExpensesOverview"); // this is used to navigate to the particular screen.
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack(); // but this ensures that it go back to where this UI screen was invoked
    }

    const cancelHandler = () => {
        // navigation.navigate("ExpensesOverview");
        navigation.goBack();
    }

    const confirmHandler = (expenseData: ExpensePropDTO) => {
        // navigation.navigate("ExpensesOverview");
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: Colors.primary800
        },
        deleteContainer: {
            marginTop: 16,
            paddingTop: 8,
            borderTopColor: Colors.primary200,
            alignItems: "center"
        },
    });

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} 
            onConfirm={confirmHandler} submitButtonLabel={isEditing ? "Update" : "Add"}
            selectedExpense={selectedExpense} />

            {isEditing && <View style={styles.deleteContainer}>
                <IconButton iconname="trash" size={36} color={Colors.error500}
                    onPress={deleteExpenseHandler}
                />
            </View>
            }
        </View>
    )
}

export default ManageExpenses;
