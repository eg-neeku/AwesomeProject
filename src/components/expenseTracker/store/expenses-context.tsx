import React, { createContext, useReducer } from "react";
import { DUMMY_EXPENSES, ExpensePropDTO, ExpenseProp } from "../screen/expensecommon";

type ExpensesContextProp = {
    expenses: ExpenseProp[],
    setExpenses: (expenses: ExpenseProp[]) => void,
    addExpense: ({ description, amount, date, id }: ExpenseProp) => void,
    deleteExpense: (id: ExpenseProp['id']) => void,
    updateExpense: (id: ExpenseProp['id'], { description, amount, date }: ExpensePropDTO) => void
}

export const ExpensesContext = createContext<ExpensesContextProp>({
    expenses: [],
    // here you enter parameters or not it still works, because fn() are loosely than stricter
    setExpenses: () => { },
    addExpense: () => { },
    deleteExpense: () => { },
    updateExpense: () => { },
})

type ActionProp =
    | { type: 'ADD', payload: ExpenseProp }
    | { type: 'SET', payload: ExpenseProp[] }
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
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'SET': // this like get all data
            // return action.payload; // here the datas will be displayed in chronological order, that is recently added append at end. 
            // but if we want it at top, then do this.
            return action.payload.reverse() ;
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

const ExpensesContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);
    const addExpense = (expenseData: ExpenseProp) => {
        dispatch({ type: 'ADD', payload: expenseData });
    }
    const setExpenses = (expenses: ExpenseProp[]) => {
        dispatch({ type: 'SET', payload: expenses });
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
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return (
        <ExpensesContext.Provider value={values}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;