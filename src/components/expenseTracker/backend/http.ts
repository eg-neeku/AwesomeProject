import axios from "axios";
import { ExpenseProp, ExpensePropDTO } from "../screen/expensecommon";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData: ExpensePropDTO) {
    /* this url is afirebase specific and not the part/rule of react-native,
        here we can add as many segments which will breakdown into nodes/folders and place the json file into that nodes
    */
    const response = await axios.post(`${DB_URL}/expenses.json`, expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(`${DB_URL}/expenses.json`);
    const expenses: ExpenseProp[] = [];

    for (const key in response.data) {
        const expenseItem: ExpenseProp = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseItem);
    }
    return expenses;
}

export async function updateExpenses(id: ExpenseProp["id"], expenseData: ExpensePropDTO) {
    return await axios.put(`${DB_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpenses(id: ExpenseProp["id"]) {
    return await axios.delete(`${DB_URL}/expenses/${id}.json`);
}