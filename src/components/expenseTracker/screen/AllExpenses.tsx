import { useContext } from "react";
import ExpensesOutput from "./ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
    return <ExpensesOutput periodName="Total" expenses={expenseCtx.expenses} fallbackText="No registered expenses found!"/>
}

export default AllExpenses;