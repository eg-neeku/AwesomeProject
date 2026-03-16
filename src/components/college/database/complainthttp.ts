import axios from "axios";
import { ComplaintDetailsProps, ComplaintPropsDTO } from "./model";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
const DB_NAME = "COLLEGEAPP";

export const storeComplaintData = async (complaintData: ComplaintPropsDTO) => {
    await axios.post(`${DB_URL}/${DB_NAME}/complaint.json`, complaintData);
}

export const fetchComplaintData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        const complaintItem: ComplaintDetailsProps = {
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

export const fetchComplaintDataById = async (complaintId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`);
    return response.data;
}

export const deleteComplaint = async (complaintId: string) => {
    return await axios.delete(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`);
}

export const fetchComplaintDataByBuilding = async (buildingId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let complaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        if (response.data[key].buildingId === buildingId) {
            const complaintItem: ComplaintDetailsProps = {
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

export const assignComplaintToTechnician = async (complaintId: string, technicianId: string, status: string) => {
    await axios.patch(`${DB_URL}/${DB_NAME}/complaint/${complaintId}.json`, { technicianId: technicianId, status: status });
}

export const getAssignedComplaintToTechnician = async (technicianId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/complaint.json`);
    let assignedComplaintList: ComplaintDetailsProps[] = [];
    for (const key in response.data) {
        if (response.data[key].technicianId === technicianId) {
            const complaintItem: ComplaintDetailsProps = {
                id: key,
                buildingId: response.data[key].buildingId,
                name: response.data[key].name,
                description: response.data[key].description,
                comment: response.data[key].comment,
                priority: response.data[key].priority,
                startDate: new Date(response.data[key].startDate),
                status: response.data[key].status
            }
            assignedComplaintList.push(complaintItem);
        }
    }
    return assignedComplaintList;
}