import ExpensesOutput from "./ExpensesOutput";
import { DUMMY_EXPENSES } from "./expensecommon";

const AllExpenses = () => {
    return <ExpensesOutput periodName="Total" expenses={DUMMY_EXPENSES} />
}

export default AllExpenses;