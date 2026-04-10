import axios from "axios";
import { DB_NAME, DB_URL, LoginProps, RegisterDTOProps, RegisterProps } from "./model";

const getLoginDetail = async (emailId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/register.json`, {
        params: {
            orderBy: '"emailId"',
            equalTo: `"${emailId}"`,
        }
    });
    return response;
};

export const storeRegisteredData = async (registeredData: RegisterProps) => {
    const response = await getLoginDetail(registeredData.emailId);
    if (Object.keys(response.data).length === 0) {
        await axios.post(`${DB_URL}/${DB_NAME}/register.json`, registeredData)
    } else {
        throw new Error("Email Already exists");
    }
};

export const checkLoginCredentials = async (emailId: string) => {
    const response = await getLoginDetail(emailId);
    const users = response.data;
    const userKey = Object.keys(users)[0];
    const mainDetail: RegisterProps = { ...users[userKey], id: userKey } as RegisterProps;
    console.log("Technician Output is: ", mainDetail);
    return userKey ? mainDetail : null;
};

export const getLoginDetailDTO = async (emailId: string) => {
    const response = await getLoginDetail(emailId);
    const key = Object.keys(response.data)[0];
    const mainDetail: RegisterDTOProps = { ...response.data[key], id: key } as RegisterDTOProps;
    console.log("Technician Output is: ", mainDetail);
    return !response.data ? null : mainDetail;
};

export const saveProfileImage = async (emailId: string, imgUrl: string) => {
    const response = await getLoginDetail(emailId);
    const key = Object.keys(response.data)[0];
    await axios.patch(`${DB_URL}/${DB_NAME}/register/${key}.json`, { profilePic: imgUrl });
};

export const updatePassword = async (loginDetail: LoginProps) => {
    const response = await getLoginDetail(loginDetail.emailId);
    const key = Object.keys(response.data)[0];
    await axios.patch(`${DB_URL}/${DB_NAME}/register/${key}.json`, { password: loginDetail.password });
}