import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ExpensePropDTO, IconButton } from "./expensecommon";
import Colors from "../../../constants/colors";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "./ExpenseForm";
import { deleteExpenses, storeExpense, updateExpenses } from "../backend/http";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

const ManageExpenses = ({ route, navigation }: any) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>("");
    const expenseCtx = useContext(ExpensesContext);
    const editedExpenseId = route.params?.expenseId; //here routing means useful for updating
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Response" : "Add Expense"
        });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async () => {
        // navigation.navigate("ExpensesOverview"); // this is used to navigate to the particular screen.
        setIsSubmitting(true);
        try {
            await deleteExpenses(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack(); // but this ensures that it go back to where this UI screen was invoked
        } catch (error) {
            setError("Could not delete expense - please try again later");
            setIsSubmitting(false);
        }
    }

    const cancelHandler = () => {
        // navigation.navigate("ExpensesOverview");
        navigation.goBack();
    }

    const confirmHandler = async (expenseData: ExpensePropDTO) => {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpenses(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({ ...expenseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Could not save data - please try again later!");
            setIsSubmitting(false);
        }
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

    if (error && !isSubmitting) return <ErrorOverlay message={error} />

    if (isSubmitting) return <LoadingOverlay />

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
