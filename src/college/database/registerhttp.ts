import axios from "axios";
import { DB_NAME, DB_URL, RegisterProps } from "./model";

export const storeRegisteredData = async (registeredData: RegisterProps) => {
    await axios.post(`${DB_URL}/${DB_NAME}/register.json`, registeredData)
}

export const getLoginDetail = async (emailId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });
    const users = response.data;
    const userKey = Object.keys(users)[0];
    return userKey ? users[userKey] : null;
}