import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "./expensecommon";
import ExpensesOutput from "./ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../backend/http";
import LoadingOverlay from "./LoadingOverlay";
import ErrorOverlay from "./ErrorOverlay";

const RecentExpenses = () => {
    const expenseCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<string | null>("");
    // this is used to get the all expenses stored in the database
    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!')
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    if (error && !isFetching) return <ErrorOverlay message={error} />

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput periodName="Last 7 days" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days" />;
}

export default RecentExpenses;