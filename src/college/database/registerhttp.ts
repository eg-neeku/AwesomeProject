import axios from "axios";
import { DB_NAME, DB_URL, RegisterDTOProps, RegisterProps } from "./model";

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

export const getLoginDetailDTO = async (emailId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });

    const mainDetail: RegisterDTOProps = { emailId: "", firstName: "", lastName: "" };
    for (const key in response.data) {
        mainDetail.emailId = response.data[key].emailId;
        mainDetail.firstName = response.data[key].firstName;
        mainDetail.lastName = response.data[key].lastName;
        break;
    }
    return Object.values(mainDetail).every(value => value === "") ? null : mainDetail;
}