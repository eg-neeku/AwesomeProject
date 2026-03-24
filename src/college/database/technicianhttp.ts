import axios from "axios";
import { DB_NAME, DB_URL, TechnicianDetailsDTO, TechnicianDetailsProps } from "./model";

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
    if(!technicianId) throw new Error("Complaint not found");
    const response = await axios.get(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`);
    return response.data;
}

export const updateTechnicianData = async (technicianId: string, newTechnician: TechnicianDetailsDTO) => {
    if(!technicianId) throw new Error("Complaint not found");
    return await axios.put(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`, newTechnician);
}

export const deleteTechnician = async (technicianId: string) => {
    if(!technicianId) throw new Error("Complaint not found");
    return await axios.delete(`${DB_URL}/${DB_NAME}/technician/${technicianId}.json`);
}