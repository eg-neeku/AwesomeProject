import { useContext } from "react";
import { getDateMinusDays } from "./expensecommon";
import ExpensesOutput from "./ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const RecentExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput periodName="Last 7 days" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days"/>;
}

export default RecentExpenses;