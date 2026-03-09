import axios from "axios";
import { TaskProps, TaskPropsDTO } from "./model";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
const DB_NAME = "COLLEGEAPP";

export const storeComplaintData = async (complaintData: TaskPropsDTO) => {
    await axios.post(`${DB_URL}/${DB_NAME}/complaint.json`, complaintData);
}

export const fetchComplaintData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: TaskProps[] = [];
    for (const key in response.data) {
        const complaintItem: TaskProps = {
            id: key,
            buildingId: response.data[key].buildingId,
            name: response.data[key].name,
            description: response.data[key].description,
            comment: response.data[key].comment,
            priority: response.data[key].priority,
            startDate: new Date(response.data[key].startDate)
        }
        complaintList.push(complaintItem);
    }
    return complaintList;
}

export const deleteComplaint = async (complaintId: string) => {
    return await axios.delete(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`);
}

export const fetchComplaintDataByBuilding = async (buildingId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: TaskProps[] = [];
    for (const key in response.data) {
        if (response.data[key].buildingId === buildingId) {
            const complaintItem: TaskProps = {
                id: key,
                buildingId: response.data[key].buildingId,
                name: response.data[key].name,
                description: response.data[key].description,
                comment: response.data[key].comment,
                priority: response.data[key].priority,
                startDate: new Date(response.data[key].startDate)
            }
            complaintList.push(complaintItem);
        }
    }
    return complaintList;
}