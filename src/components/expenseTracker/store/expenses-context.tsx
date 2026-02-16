import React, { createContext, useReducer } from "react";
import { DUMMY_EXPENSES, ExpensePropDTO, ExpenseProp } from "../screen/expensecommon";

type ExpensesContextProp = {
    expenses: ExpenseProp[],
    addExpense: ({ description, amount, date }: ExpensePropDTO) => void
    deleteExpense: (id: ExpenseProp['id']) => void
    updateExpense: (id: ExpenseProp['id'], { description, amount, date }: ExpensePropDTO) => void
}

export const ExpensesContext = createContext<ExpensesContextProp>({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
})

type ActionProp = { type: 'ADD', payload: ExpensePropDTO }
    | {
        type: 'UPDATE', payload: {
            id: ExpenseProp['id']
            data: Partial<ExpensePropDTO>
        }
    }
    | { type: 'DELETE', payload: ExpenseProp['id'] }

const expensesReducer = (state: ExpenseProp[], action: ActionProp): ExpenseProp[] => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id)
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    const addExpense = (expenseData: ExpensePropDTO) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }
    const deleteExpense = (id: string) => {
        dispatch({ type: 'DELETE', payload: id });
    }
    const updateExpense = (id: string, expenseData: ExpensePropDTO) => {
        dispatch({
            type: 'UPDATE', payload: {
                id: id, data: expenseData
            }
        });
    }

    const values = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={values}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;