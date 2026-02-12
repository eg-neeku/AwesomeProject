import { DUMMY_EXPENSES } from "./expensecommon";
import ExpensesOutput from "./ExpensesOutput";

const RecentExpenses = () => {
    return <ExpensesOutput periodName="Last 7 days" expenses={DUMMY_EXPENSES} />;
}

export default RecentExpenses;