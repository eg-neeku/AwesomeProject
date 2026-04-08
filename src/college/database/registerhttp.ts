import axios from "axios";
import { DB_NAME, DB_URL, RegisterDTOProps, RegisterProps } from "./model";

export const storeRegisteredData = async (registeredData: RegisterProps) => {
    await axios.post(`${DB_URL}/${DB_NAME}/register.json`, registeredData)
};

export const getLoginDetail = async (emailId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });
    const users = response.data;
    const userKey = Object.keys(users)[0];
    const mainDetail: RegisterProps = { ...users[userKey], id: userKey } as RegisterProps;
    console.log("Technician Output is: ", mainDetail);
    return userKey ? mainDetail : null;
};

export const getLoginDetailDTO = async (emailId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });
    const key = Object.keys(response.data)[0];
    const mainDetail: RegisterDTOProps = { ...response.data[key], id: key } as RegisterDTOProps;
    console.log("Technician Output is: ", mainDetail);
    return !response.data ? null : mainDetail;
};

export const saveProfileImage = async (emailId: string, imgUrl: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });
    const key = Object.keys(response.data)[0];
    await axios.patch(`${DB_URL}/${DB_NAME}/register/${key}.json`, { profilePic: imgUrl });
}