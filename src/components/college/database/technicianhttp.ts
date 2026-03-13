import axios from "axios";
import { TechnicianDetailsDTO, TechnicianDetailsProps } from "./model";

const DB_URL = "https://react-native-course-5d92a-default-rtdb.firebaseio.com";
const DB_NAME = "COLLEGEAPP";

export const storeTechnicianData = async (TechnicianData: TechnicianDetailsDTO) => {
    await axios.post(`${DB_URL}/${DB_NAME}/technician.json`, TechnicianData);
}

export const fetchTechnicianData = async () => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/technician.json`);
    let technicianList: TechnicianDetailsProps[] = [];
    for (const key in response.data) {
        const technicianItem: TechnicianDetailsProps = {
            id: key,
            name: response.data[key].name,
            emailId: response.data[key].emailId,
            phno: response.data[key].phno
        }
        technicianList.push(technicianItem);
    }
    return technicianList;
}

export const fetchTechnicianDataById = async (technicianId: string) => {
    const response = await axios.get(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`);
    console.log(response);
    return response.data;
}

export const updateTechnicianData = async (technicianId: string, newTechnician: TechnicianDetailsDTO) => {
    return await axios.put(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`, newTechnician);
}

export const deleteTechnician = async (technicianId: string) => {
    return await axios.delete(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`);
}